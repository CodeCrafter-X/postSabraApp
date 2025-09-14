'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 10;

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const res = await fetch('/api/admin/requests');
        if (!res.ok) throw new Error('Failed to fetch requests');
        const data = await res.json();
        setPendingRequests(data.pending || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingRequests();
  }, []);

  const handleApprove = async (userId) => {
    try {
      const res = await fetch(`/api/admin/approve/${userId}`, { method: 'POST' });
      if (!res.ok) throw new Error('Approval failed');
      setPendingRequests(pendingRequests.filter((user) => user._id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReject = async (userId) => {
    try {
      const res = await fetch(`/api/admin/reject/${userId}`, { method: 'POST' });
      if (!res.ok) throw new Error('Rejection failed');
      setPendingRequests(pendingRequests.filter((user) => user._id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };

  // Pagination logic
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = pendingRequests.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalPages = Math.ceil(pendingRequests.length / requestsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-green-100 p-6">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="backdrop-blur-md bg-white/70 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
              Admin Menu
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/admin"
                  className="block px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-green-100 hover:text-green-700 transition cursor-default"
                >
                  Pending Requests
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/manage-user"
                  className="block px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-green-100 hover:text-green-700 transition"
                >
                  Manage Users
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/manage-notice"
                  className="block px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-green-100 hover:text-green-700 transition"
                >
                  Manage Notices
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="backdrop-blur-md bg-white/80 p-8 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
              Pending Poster Requests
            </h2>

            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg text-center font-medium">
                {error}
              </div>
            )}

            {loading ? (
              <div className="text-center py-10">
                <p className="text-gray-500 animate-pulse">Loading requests...</p>
              </div>
            ) : pendingRequests.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-xl shadow">
                <p className="text-gray-600 text-lg">No pending requests 🎉</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto rounded-xl shadow">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-green-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm md:text-lg font-semibold text-gray-600 uppercase tracking-wider">
                          Username
                        </th>
                        <th className="px-6 py-3 text-left text-sm md:text-lg font-semibold text-gray-600 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-sm md:text-lg font-semibold text-gray-600 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 text-center text-sm md:text-lg font-semibold text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100 text-lg">
                      {currentRequests.map((user, idx) => (
                        <tr
                          key={user._id}
                          className={`hover:bg-gray-50 transition ${
                            idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                          }`}
                        >
                          <td className="px-6 py-4 font-medium text-gray-900">{user.username}</td>
                          <td className="px-6 py-4 text-gray-700">{user.email}</td>
                          <td className="px-6 py-4 text-gray-700">{user.category}</td>
                          <td className="px-6 py-4 text-center flex gap-3 justify-center">
                            <button
                              onClick={() => handleApprove(user._id)}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition cursor-pointer disabled:opacity-50"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(user._id)}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition cursor-pointer disabled:opacity-50"
                            >
                              Reject
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Navigation */}
                <div className="flex justify-center mt-6 space-x-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-lg font-medium transition ${
                      currentPage === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-green-100 hover:text-green-700 cursor-pointer'
                    }`}
                  >
                    &lt;&lt; Previous
                  </button>

                  {getPageNumbers().map((num) => (
                    <button
                      key={num}
                      onClick={() => setCurrentPage(num)}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        currentPage === num
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-green-100 hover:text-green-700'
                      } cursor-pointer`}
                    >
                      {num}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-lg font-medium transition ${
                      currentPage === totalPages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-green-100 hover:text-green-700 cursor-pointer'
                    }`}
                  >
                    Next &gt;&gt;
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
