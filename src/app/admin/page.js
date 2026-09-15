'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiCheck, FiClipboard, FiFileText, FiUsers, FiX } from 'react-icons/fi';

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
    <div className="page-shell dashboard-grid px-5 py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div><p className="section-kicker">Administration / Overview</p><h1 className="mt-2 text-4xl font-black tracking-[-0.04em] text-[#17231f]">Good morning, admin.</h1><p className="mt-2 text-[#687570]">Keep the university notice board accurate and up to date.</p></div>
          <div className="rounded-full border border-[#cfe2d5] bg-white px-4 py-2 text-sm font-semibold text-[#087f5b]"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#2c9a71]" />System operational</div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[[FiClipboard, 'Review queue', pendingRequests.length, 'Awaiting decision'], [FiUsers, 'User directory', '—', 'Manage accounts'], [FiFileText, 'Notice archive', '—', 'Published updates']].map(([Icon, label, value, sub]) => (
            <div key={label} className="rounded-2xl border border-[#dfe7e1] bg-white p-5 shadow-[0_8px_24px_rgba(23,35,31,0.04)]"><div className="flex items-start justify-between"><span className="rounded-xl bg-[#e8f4ee] p-3 text-xl text-[#087f5b]"><Icon /></span><span className="text-3xl font-black text-[#17231f]">{value}</span></div><p className="mt-5 font-bold text-[#17231f]">{label}</p><p className="mt-1 text-sm text-[#687570]">{sub}</p></div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr]">
          <aside className="rounded-2xl border border-[#dfe7e1] bg-[#07543f] p-3 text-white shadow-[0_12px_30px_rgba(7,84,63,0.14)]">
            <p className="px-3 pb-3 pt-2 text-xs font-bold uppercase tracking-[0.14em] text-[#b9e4c9]">Workspace</p>
            <div className="space-y-1">
              <Link href="/admin" className="flex items-center justify-between rounded-xl bg-white/12 px-3 py-3 text-sm font-bold"><span className="flex items-center gap-3"><FiClipboard /> Requests</span><span>{pendingRequests.length}</span></Link>
              <Link href="/admin/manage-user" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#d7eee0] transition hover:bg-white/10"><FiUsers /> Users</Link>
              <Link href="/admin/manage-notice" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#d7eee0] transition hover:bg-white/10"><FiFileText /> Notices</Link>
            </div>
          </aside>

          <section className="min-w-0 rounded-2xl border border-[#dfe7e1] bg-white p-5 shadow-[0_8px_24px_rgba(23,35,31,0.04)] sm:p-7">
            <div className="flex flex-col justify-between gap-3 border-b border-[#dfe7e1] pb-5 sm:flex-row sm:items-end"><div><p className="section-kicker">Needs your attention</p><h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#17231f]">Poster requests</h2></div><p className="text-sm text-[#687570]">{pendingRequests.length} pending</p></div>
            {error && <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}
            {loading ? <div className="py-16 text-center text-sm text-[#687570]">Loading review queue...</div> : pendingRequests.length === 0 ? <div className="my-6 rounded-xl bg-[#f5f7f4] px-5 py-14 text-center"><FiCheck className="mx-auto text-3xl text-[#087f5b]" /><p className="mt-3 font-bold text-[#17231f]">All caught up</p><p className="mt-1 text-sm text-[#687570]">There are no poster requests waiting for review.</p></div> : <>
              <div className="mt-5 overflow-x-auto"><table className="min-w-full text-left"><thead><tr className="border-b border-[#dfe7e1] text-xs uppercase tracking-[0.1em] text-[#687570]"><th className="px-3 py-3 font-bold">Applicant</th><th className="px-3 py-3 font-bold">Department</th><th className="px-3 py-3 text-right font-bold">Decision</th></tr></thead><tbody>{currentRequests.map((user) => <tr key={user._id} className="border-b border-[#edf1ed] last:border-0"><td className="px-3 py-4"><p className="font-bold text-[#17231f]">{user.username}</p><p className="mt-1 text-sm text-[#687570]">{user.email}</p></td><td className="px-3 py-4 text-sm text-[#34463f]">{user.category || 'General'}</td><td className="px-3 py-4"><div className="flex justify-end gap-2"><button onClick={() => handleApprove(user._id)} title="Approve request" className="inline-flex items-center gap-2 rounded-lg bg-[#087f5b] px-3 py-2 text-sm font-bold text-white transition hover:bg-[#07543f]"><FiCheck /> <span className="hidden sm:inline">Approve</span></button><button onClick={() => handleReject(user._id)} title="Reject request" className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-bold text-red-700 transition hover:bg-red-50"><FiX /> <span className="hidden sm:inline">Reject</span></button></div></td></tr>)}</tbody></table></div>
              <div className="mt-5 flex items-center justify-between border-t border-[#dfe7e1] pt-4"><p className="text-xs text-[#687570]">Page {currentPage} of {Math.max(totalPages, 1)}</p><div className="flex gap-2"><button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="rounded-lg border border-[#dfe7e1] px-3 py-2 text-sm font-bold text-[#34463f] disabled:cursor-not-allowed disabled:opacity-40">Previous</button><button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="rounded-lg border border-[#dfe7e1] px-3 py-2 text-sm font-bold text-[#34463f] disabled:cursor-not-allowed disabled:opacity-40">Next <FiArrowRight className="ml-1 inline" /></button></div></div>
            </>}
          </section>
        </div>
      </div>
    </div>
  );
}
