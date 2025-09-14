import { getUserFromRequest } from "@/lib/requireAuth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";



export async function GET(req){

    const caller = await getUserFromRequest(req);
    console.log("Caller:", caller);
    if(!caller || caller.role !== "admin"){
        return new Response(JSON.stringify({error:"Forbidden"}),{status:403});

    }


    await connectDB();
    const pending = await User.find({status:"pending"});
    return new Response(JSON.stringify({pending}),{status:200});    

}