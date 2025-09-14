import * as cookie from "cookie";


export async function POST() {
  try {
    const headers = new Headers();
    headers.append("Set-Cookie", cookie.serialize("token", "", {
      path: "/",
      maxAge: -1
    }));
    return new Response(JSON.stringify({ message: "Logged out" }), { status: 200, headers });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
