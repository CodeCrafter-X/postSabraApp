'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PaginatedNoticeList from '@/components/PaginatedNoticeList';
import TopImageCarousel from '@/components/TopImageCarousel';

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [importantNotices, setImportantNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use absolute URL for API request
        const baseUrl = window.location.origin;
        const res = await fetch(`${baseUrl}/api/notices`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch notices: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        console.log('Fetched notices:', data);
        
        setNotices(data.notices || []);
        setImportantNotices((data.notices || []).filter(notice => notice.important));
      } catch (err) {
        console.error('Error fetching notices:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-green-700 mb-10 text-center">
          University Notice Board
        </h1>
        <div className="pt-0 pb-30">
          <TopImageCarousel />
        </div>
        <div className="text-center py-8">Loading notices...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-green-700 mb-10 text-center">
          University Notice Board
        </h1>
        <div className="pt-0 pb-30">
          <TopImageCarousel />
        </div>
        <div className="text-center py-8 text-red-500">
          Error: {error}
          <div className="mt-4">
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-green-700 mb-10 text-center">
        University Notice Board
      </h1>
      <div className="pt-0 pb-30">
        <TopImageCarousel />
      </div>
      
      {/* Latest Notices */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-green-500 pb-2">
          Latest Announcements
        </h2>
        <PaginatedNoticeList notices={notices} perPage={4} />
      </section>

      {/* Important Notices */}
      {importantNotices.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-amber-500 pb-2">
            🔔 Important Notices
          </h2>
          <PaginatedNoticeList notices={importantNotices} perPage={4} />
        </section>
      )}

      {/* Categories */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-green-500 pb-2">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Academic', 'Administrative', 'Event', 'Exam', 'Holiday', 'Job', 'Scholarship','Strike'].map(
            category => (
              <Link
                key={category}
                href={`/notices?category=${category}`}
                className="p-6 bg-white rounded-xl shadow hover:shadow-lg border border-gray-200 
                text-center text-gray-700 font-medium hover:bg-green-50 transition-all"
              >
                {category}
              </Link>
            )
          )}
        </div>
      </section>

      {/* View All Notices Button at the Bottom */}
      <div className="text-center mt-8">
        <Link
          href="/notices"
          className="inline-block px-6 py-3 bg-green-600 text-white font-medium rounded-xl shadow-md hover:bg-green-700 transition-all"
        >
          View All Notices here
        </Link>
      </div>
    </div>
  );
}
