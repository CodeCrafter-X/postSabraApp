'use client';
import { useEffect, useState } from 'react';
import UserProfile from '@/components/userProfile';
import NoticeList from '@/components/NoticeList';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function ProfilePage() {
  const [notices, setNotices] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/userNotice', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch data');
        setUser(data.user);
        setNotices(data.notices || []);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (noticeId) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;
    try {
      const res = await fetch(`/api/notices/${noticeId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed');
      toast.success('Notice deleted successfully');
      setNotices(notices.filter((n) => n._id !== noticeId));
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 animate-pulse">
        Loading...
      </div>
    );

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Failed to load profile
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-green-100 p-6">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Profile Section */}
        <section className="bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
          <h1 className="text-3xl font-extrabold mb-6 text-gray-800 flex items-center gap-3">
            <span className="inline-block w-2 h-8 bg-blue-500 rounded"></span>
            Your Profile
          </h1>
          <UserProfile user={user} />
        </section>

        {/* Notices Section */}
        <section className="bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
              <span className="inline-block w-2 h-8 bg-green-500 rounded"></span>
              Your Notices
            </h1>
            {(user.role === 'poster' || user.role === 'admin') && (
              <Link href="/post-notice">
                <button className="px-5 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition">
                  + Add Notice
                </button>
              </Link>
            )}
          </div>
          <NoticeList notices={notices} currentUser={user} onDelete={handleDelete} />
        </section>
      </div>
    </div>
  );
}
