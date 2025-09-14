'use client';
export const dynamic = 'force-dynamic';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import NoticeList from '@/components/NoticeList';
import TopImageCarousel from '@/components/TopImageCarousel';

export default function NoticesPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const noticesPerPage = 4;

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch('/api/notices', {
          cache: 'no-store',
          headers: { 'Content-Type': 'application/json' },
        });
        if (res.ok) {
          const data = await res.json();
          setNotices(data.notices || []);
        }
      } catch (error) {
        console.error('Error fetching notices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // 🔍 Filter notices
  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || notice.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // 📑 Pagination logic
  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = filteredNotices.slice(
    indexOfFirstNotice,
    indexOfLastNotice
  );
  const totalPages = Math.ceil(filteredNotices.length / noticesPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-green-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      
      <h1 className="text-4xl font-bold text-green-700 mb-10 text-center">
        All Notices
      </h1>
      <div className="pt-0 pb-30">
      <TopImageCarousel />
       </div>
        

      {/* 🔍 Search & Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search notices..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
        />

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
        >
          <option value="All">All Categories</option>
          <option value="Academic">Academic</option>
          <option value="Administrative">Administrative</option>
          <option value="Event">Event</option>
          <option value="Exam">Exam</option>
          <option value="Holiday">Holiday</option>
          <option value="Job">Job</option>
          <option value="Scholarship">Scholarship</option>
          <option value="Strike">Strike</option>
        </select>
      </div>

      {/* Notice List */}
      {filteredNotices.length > 0 ? (
        <NoticeList notices={currentNotices} />
      ) : (
        <p className="text-center text-gray-600 text-lg mt-10">
          📭 No notices found.
        </p>
      )}

      {/* Pagination */}
      {filteredNotices.length > 0 && (
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              currentPage === 1
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
            }`}
          >
            &lt;&lt; Previous
          </button>
          <span className="font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              currentPage === totalPages
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
            }`}
          >
            Next &gt;&gt;
          </button>
        </div>
      )}
    </div>
  );
}
