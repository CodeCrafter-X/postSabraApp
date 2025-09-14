import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export const verifyToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    console.log("Decoded JWT:", payload);
    return payload;
  } catch (error) {
    console.error("Error verifying JWT:", error);
    return null;
  }
};
