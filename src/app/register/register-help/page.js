// src/app/register-help/page.js
'use client';

import Link from 'next/link';

export default function RegisterHelpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg p-12 bg-white rounded-2xl shadow-2xl transform transition-transform duration-300 hover:-translate-y-1 mt-20">
        <h1 className="text-4xl font-extrabold text-green-700 mb-8 text-center tracking-wide">
          Registration Submitted
        </h1>

        <p className="text-lg text-gray-700 mb-4 text-center leading-relaxed">
          Your registration request has been successfully sent to the admin.
        </p>
        <p className="text-lg text-gray-700 mb-8 text-center leading-relaxed">
          Please wait for admin approval. Once approved, you can log in using the login page.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link
            href="/login"
            className="w-full sm:w-auto py-3 px-8 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 text-center text-lg"
          >
            Go to Login
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto py-3 px-8 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-300 text-center text-lg"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
