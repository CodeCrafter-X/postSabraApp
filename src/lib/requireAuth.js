import jwt from "jsonwebtoken";
import * as cookie from "cookie";
import connectDB from "./mongodb";
import User from "../models/User";

export async function getUserFromRequest(req) {
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = cookie.parse(cookieHeader);
  const token = cookies.token;

  if (!token) {
    console.log('No token found in cookies');
    return null;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    await connectDB();
    const user = await User.findById(payload.userId).select('-passwordHash');
    
    if (!user || user.status !== 'active') {
      console.log('User not found or inactive');
      return null;
    }

    return user;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}