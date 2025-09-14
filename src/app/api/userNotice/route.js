// app/api/userNotice/route.js
import { getUserFromRequest } from "@/lib/requireAuth";
import Notice from "@/models/notice";
import connectDB from "@/lib/mongodb";

export async function GET(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await connectDB();
    const notices = await Notice.find({ postedBy: user._id })
      .populate('postedBy', '_id username') // Explicitly populate needed fields
      .lean(); // Convert to plain JavaScript objects

    return new Response(JSON.stringify({ user, notices }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching user notices:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}