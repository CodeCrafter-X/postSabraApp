// src/app/unauthorized/page.js
import Link from 'next/link';


export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">Unauthorized Access</h1>
        <p className="mt-2">You don&apos;t have permission to access this page.</p>
        <Link href="/" className="text-blue-600 underline mt-4 inline-block">
          Return to Home
        </Link>
      </div>
    </div>
  );
}