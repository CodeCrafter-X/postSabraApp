'use client';
import Link from 'next/link';
import Image from 'next/image';
import TopImageCarousel from '@/components/TopImageCarousel';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-12">
      
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">About Our Unit</h1>
         <div className="pt-0 pb-30">
          <TopImageCarousel />
         </div>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 leading-relaxed">
            We centralize and digitize campus announcements, ensuring students, faculty, and staff have instant access 
            to all academic and non-academic notices in a structured platform.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-12 border border-white/20">
          <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">Our Mission</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-green-800 mb-2">Digital Transformation</h3>
              <p className="text-gray-600">Modernizing campus communication through digital platforms</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-green-800 mb-2">Instant Access</h3>
              <p className="text-gray-600">Ensuring real-time access to important announcements</p>
            </div>
          </div>
        </div>

        {/* University Links */}
        <div className="bg-green-600/20 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-green-200/30">
          <h2 className="text-2xl font-semibold text-green-800 mb-6 text-center">Explore Sabaragamuwa University</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="https://www.sab.ac.lk" target="_blank" className="bg-white/90 rounded-xl p-4 text-center hover:bg-white transition shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-green-700">Main Website</span>
            </Link>
            
            <Link href="https://www.sab.ac.lk/overview" target="_blank" className="bg-white/90 rounded-xl p-4 text-center hover:bg-white transition shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-green-700">Academics</span>
            </Link>
            
            <Link href="https://www.sab.ac.lk/academic-establishment" target="_blank" className="bg-white/90 rounded-xl p-4 text-center hover:bg-white transition shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-green-700">Admissions</span>
            </Link>
            
            <Link href="https://www.sab.ac.lk/contact" target="_blank" className="bg-white/90 rounded-xl p-4 text-center hover:bg-white transition shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-green-700">Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}