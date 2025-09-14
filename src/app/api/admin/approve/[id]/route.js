import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { getUserFromRequest } from "@/lib/requireAuth"; 


export async function POST(req,{params}){
   const caller = await getUserFromRequest(req);
    if(!caller || caller.role !== "admin"){
        return new Response(JSON.stringify({error:"Forbidden"}),{status:403});
    }

    const userid =  params.id;
    console.log("Approving user with ID:", userid);
    await connectDB();
    const user = await User.findById(userid);
    if(!user){
        return new Response(JSON.stringify({error:"User not found"}),{status:404});
    }
    user.status = "active"; // Approve user
    await user.save();
    return new Response(JSON.stringify({message:"User approved"}),{status:200});
}