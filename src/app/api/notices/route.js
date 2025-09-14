import { getUserFromRequest } from "@/lib/requireAuth";
import connectDB from "@/lib/mongodb"; // Changed to default import
import Notice from "@/models/notice";

// src/app/api/notices/route.js
export async function GET(req) {
  try {
   
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const q = searchParams.get('q');
    
    let query = { status: "active" };
    
    if (category) query.category = category;
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } }
      ];
    }
    
    // Get documents as Mongoose documents (not lean) to keep virtuals
    const notices = await Notice.find(query)
      .populate('postedBy', 'username category email')
      .sort({ createdAt: -1 });
    
    // Convert to objects with virtuals included
    const noticesWithVirtuals = notices.map(notice => notice.toObject());
    
    return new Response(JSON.stringify({ notices: noticesWithVirtuals }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching notices:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

//create a notice
export async function POST(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user  || user.status !== "active") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const { title, content, category, attachments, important } = await req.json();

    await connectDB();

    const notice = await Notice.create({
      title,
      content,
      category,
      attachments,
      important,
      postedBy: user._id
    });

    return new Response(JSON.stringify({ notice }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error in POST /api/notices:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}