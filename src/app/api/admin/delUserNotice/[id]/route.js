import connectDB from "@/lib/mongodb";
import { getUserFromRequest } from "@/lib/requireAuth";
import Notice from "@/models/notice";

export async function DELETE(req, { params }) {
  try {
    const user = await getUserFromRequest(req);
    if (!user || user.role !== "admin") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectDB();

    const result = await Notice.deleteMany({ postedBy: params.id });

    return new Response(
      JSON.stringify({
        success: true,
        deletedCount: result.deletedCount,
        message: "User notices deleted",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error deleting notice:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
