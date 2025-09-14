import connectDB from "@/lib/mongodb";
import { getUserFromRequest } from "@/lib/requireAuth";
import Notice from "@/models/notice";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const notice = await Notice.findById(params.id).populate("postedBy", "username email");
    if (!notice) {
      return new Response(JSON.stringify({ error: "Notice not found" }), { status: 404 });
    }

    const user = await getUserFromRequest(req);
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // Only poster who created it or admin can edit
    if ( notice.postedBy._id.toString() !== user._id.toString()) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
    }

    return new Response(JSON.stringify({ notice }), { status: 200 });
  } catch (error) {
    console.error("Error fetching notice for edit:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
