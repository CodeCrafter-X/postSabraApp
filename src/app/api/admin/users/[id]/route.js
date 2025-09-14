import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Notice from "@/models/notice"
import { getUserFromRequest } from "@/lib/requireAuth";

// PUT: Update user (admin only)
export async function PUT(req, { params }) {
  try {
    const admin = await getUserFromRequest(req);
    if (!admin || admin.role !== "admin") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
    }

    const { role, status } = await req.json();
    
    await connectDB();
    const user = await User.findById(params.id);
    
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // Prevent modifying other admins unless super admin
    if (user.role === "admin" && admin._id.toString() !== user._id.toString()) {
      return new Response(JSON.stringify({ error: "Cannot modify other admins" }), { status: 403 });
    }

    if (role) user.role = role;
    if (status) user.status = status;
    
    await user.save();
    
    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// DELETE: Delete user (admin only)


export async function DELETE(req, { params }) {
  try {
    const admin = await getUserFromRequest(req);
    if (!admin || admin.role !== "admin") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
    }

    await connectDB();
    const user = await User.findById(params.id);
    
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // Prevent deleting admins
    if (user.role === "admin") {
      return new Response(JSON.stringify({ error: "Cannot delete admin users" }), { status: 403 });
    }

    // Delete all notices created by this user
    await Notice.deleteMany({ postedBy: user._id });

    // Delete user
    await user.deleteOne();
    
    return new Response(
      JSON.stringify({ message: "User and their notices deleted" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
