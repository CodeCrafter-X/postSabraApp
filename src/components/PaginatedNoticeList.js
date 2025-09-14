'use client';
import { useState } from 'react';
import NoticeList from './NoticeList';

export default function PaginatedNoticeList({ notices, perPage = 4 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(notices.length / perPage);

  const startIndex = (currentPage - 1) * perPage;
  const currentNotices = notices.slice(startIndex, startIndex + perPage);

  return (
    <div>
      <NoticeList notices={currentNotices} />
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={() => setCurrentPage(prev => prev - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-xl border border-gray-300 font-medium hover:bg-gray-100 transition ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            &lt;&lt; Previous
          </button>
          <span className="font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-xl border border-gray-300 font-medium hover:bg-gray-100 transition ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            Next &gt;&gt;
          </button>
        </div>
      )}
    </div>
  );
}
