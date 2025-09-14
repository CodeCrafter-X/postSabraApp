import connectDB from "@/lib/mongodb";
import { getUserFromRequest} from "@/lib/requireAuth";
import User from "@/models/User";



export async function POST(req, {params}){

   const caller = await getUserFromRequest(req);

   if(!caller || caller.role !== "admin"){
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
   }

   const { id } = params;
  
   await connectDB();


   // Find the user by ID and update their status
   const user = await User.findById(id);

   if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
   }

   user.status = "rejected";
   await user.save();

   return new Response(JSON.stringify({ message: "User rejected successfully" }), { status: 200 });
}
