import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { getUserFromRequest } from "@/lib/requireAuth";

// GET: List all users (admin only)
export async function GET(req) {
  try {
    const admin = await getUserFromRequest(req);
    if (!admin || admin.role !== "admin") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
    }

    await connectDB();
    const users = await User.find().select("-passwordHash");
    
    return new Response(JSON.stringify({ users }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// POST: Create new admin (super admin only - you might want to add this later)