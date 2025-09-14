import { getUserFromRequest } from "@/lib/requireAuth";

export async function GET(req) {
  try {
    const user = await getUserFromRequest(req);
    
    if (!user) {
      console.log('No user found in request');
      return new Response(
        JSON.stringify({ error: "Unauthorized - Please login" }), 
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': req.headers.get('origin') || '*',
            'Access-Control-Allow-Credentials': 'true'
          }
        }
      );
    }

    // Return safe user data without sensitive fields
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      category: user.category,
      status: user.status,
      createdAt: user.createdAt
    };

    return new Response(
      JSON.stringify({ user: userData }), 
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': req.headers.get('origin') || '*',
          'Access-Control-Allow-Credentials': 'true'
        }
      }
    );
  } catch (err) {
    console.error('Profile API error:', err);
    return new Response(
      JSON.stringify({ error: "Server error" }), 
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': req.headers.get('origin') || '*',
          'Access-Control-Allow-Credentials': 'true'
        }
      }
    );
  }
}