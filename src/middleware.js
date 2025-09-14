
import { NextResponse } from "next/server";
import  { verifyToken } from "@/lib/jwt";

export async function middleware(request){
  const url = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";

  //public routes
  if(
    url ==="/" ||
    url.startsWith("/notices") ||
    url.startsWith("/login") ||
    url.startsWith("/register")
  ){
    return NextResponse.next();
  }


  //if no  token acces any other pages thwy will redirect to "/login " page
  if(!token){
     return NextResponse.redirect(new URL("/login", request.url));
  }


  // veryfy user and thier role using verifyToken methode inside /lib/jwt.js
  const userDecode = await verifyToken(token);


  //if no valid token then redirct to "/login " page
  if(!userDecode){
    return NextResponse.redirect(new URL("/login" , request.url));

  }

  //if somebody has token but not login as admin they try to get "/admin" or admin related page they will re-direct to "/nauthorized " page
  if(url.startsWith("/admin")){
    if(userDecode.role !== "admin"){
      return NextResponse.redirect(new URL("/unauthorized" , request.url))
    }
  }

  return NextResponse.next();

}


export const config ={
  matcher : [
    "/admin",
    "/admin/:path*",
    "/profile",
    "/post-notice",
  ]
}