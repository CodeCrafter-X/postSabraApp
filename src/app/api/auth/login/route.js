import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as cookie from "cookie";
 // ✅ correct import name

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    // Basic validation
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401 }
      );
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: "Invalid password" }), {
        status: 401,
      });
    }
     
    // Status check
    if (user.status === "pending") {
      return new Response(
        JSON.stringify({ error: "Your account is pending approval" }),
        { status: 403 }
      );
    }
    if (user.status === "rejected") {
      return new Response(
        JSON.stringify({ error: "Your account request was rejected" }),
        { status: 403 }
      );
    }

    

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set token in cookie
    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    );

    return new Response(
      JSON.stringify({ message: "Login successful", role: user.role }),
      { status: 200, headers }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
