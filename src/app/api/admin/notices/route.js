import connectDB from "@/lib/mongodb";
import { getUserFromRequest } from "@/lib/requireAuth";
import Notice from "@/models/notice"

export async function GET(req){

    try {
        const admin = await getUserFromRequest(req);
   if(!admin || admin.role !== "admin"){
      return new Response(JSON.stringify({ error: "Unauthorized Access" }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    
   }
   await connectDB;
   const notices = await Notice.find()
         .populate('postedBy', 'username category email')
         .sort({ createdAt: -1 });


    return new Response(JSON.stringify({notices}))
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    }
   
}

