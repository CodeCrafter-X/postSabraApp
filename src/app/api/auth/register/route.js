import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

/**
 * POST: create an account request (status pending)
 * Body: { username, email, password, category }
 */

export async function POST(req){
    try {

        await connectDB();

    const {username, email, password, category, role, adminKey} = await req.json();

     // Basic validation
     if(!username || !email || !password ){
        return new Response(JSON.stringify({error:"username, email, password and category are required"}), {status:400});
     }

      // Prevent duplicate email
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return new Response(JSON.stringify({error:"Email already exists"}), {status:409});
      }

      const isAdminRegistration = role === "admin";
      if (isAdminRegistration && (!process.env.ADMIN_REGISTRATION_KEY || adminKey !== process.env.ADMIN_REGISTRATION_KEY)) {
        return new Response(JSON.stringify({error:"A valid admin registration key is required"}), {status:403});
      }

      
    // Hash password before saving (bcrypt, cost 10)
    const passwordHash = await bcrypt.hash(password , 10);

    // Create new user
    const user = await User.create({
        username,
        email,
        passwordHash,
        category,
        status: isAdminRegistration ? "active" : "pending",
        role: isAdminRegistration ? "admin" : "poster"
    })
    console.log("New user requested for creation:", user);
    return new Response(JSON.stringify({ message: "Request submitted. Wait for admin approval." }), { status: 201 });


        
    } catch (error) {
      return new Response(JSON.stringify({error: error.message}) , {status:500});   
    }


    
}