import connectDB from "@/lib/mongodb";
import { getUserFromRequest } from "@/lib/requireAuth";
import Notice from "@/models/notice";

// get single notice
export async function GET(req, { params }) {
  try {
    const { id } = await params; // ✅ await params

    await connectDB();

    const notice = await Notice.findById(id).populate("postedBy", "username email");

    if (!notice || notice.status !== "active") {
      return new Response(
        JSON.stringify({ error: "Notice not found or inactive" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(notice), { status: 200 });
  } catch (error) {
    console.error("Error fetching notice:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}



//update notice poster only

export async function PUT(req, { params }) {
  try {
    const user = await getUserFromRequest(req);
    if (!user || (user.role !== "poster" && user.role !== "admin")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    await connectDB();
    const notice = await Notice.findById(params.id);
    
    if (!notice) {
      return new Response(JSON.stringify({ error: "Notice not found" }), { status: 404 });
    }

    // Only allow poster who created it or admin to update
    if (user.role === "poster" && notice.postedBy.toString() !== user._id.toString()) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
    }

    const { title, content, category, attachments, important } = await req.json();
    
    notice.title = title || notice.title;
    notice.content = content || notice.content;
    notice.category = category || notice.category;
    notice.attachments = attachments || notice.attachments;
    notice.important = important !== undefined ? important : notice.important;
    
    await notice.save();
    
    return new Response(JSON.stringify({ notice }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}




//delete notice by poster or admin
// app/api/notices/[id]/route.js
export async function DELETE(req, { params }) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await connectDB();
    const notice = await Notice.findById(params.id).populate('postedBy', '_id');

    if (!notice) {
      return new Response(JSON.stringify({ error: "Notice not found" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check permissions
    const isOwner = notice.postedBy._id.toString() === user._id.toString();
    const canDelete = user.role === 'admin' || (user.role === 'poster' && isOwner);

    if (!canDelete) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await Notice.findByIdAndDelete(params.id);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error deleting notice:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}