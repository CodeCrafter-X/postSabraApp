'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiCheck, FiFileText, FiPaperclip, FiSend } from 'react-icons/fi';
import { NOTICE_CATEGORY_GROUPS } from '@/lib/noticeCategories';

export default function PostNoticePage() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    important: false,
    attachments: [],
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let attachmentUrl = '';
      
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
        if (!uploadRes.ok) throw new Error('File upload failed');
        const uploadData = await uploadRes.json();
        attachmentUrl = uploadData.url;
      }

      const noticeData = {
        ...formData,
        attachments: attachmentUrl ? [{
          name: file.name,
          url: attachmentUrl,
          size: file.size,
        }] : [],
      };

      const res = await fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noticeData),
      });

      if (!res.ok) throw new Error('Failed to post notice');

      setSuccess('Notice posted successfully!');
      setTimeout(() => router.push('/notices'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell dashboard-grid px-5 py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <Link href="/notices" className="mb-7 inline-flex items-center gap-2 text-sm font-bold text-[#087f5b] transition hover:text-[#07543f]"><FiArrowLeft /> Back to notice board</Link>
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <section className="rounded-[1.75rem] border border-[#dfe7e1] bg-white p-6 shadow-[0_12px_30px_rgba(23,35,31,0.05)] sm:p-9">
            <div className="border-b border-[#dfe7e1] pb-6"><p className="section-kicker">Poster workspace</p><h1 className="mt-2 text-4xl font-black tracking-[-0.04em] text-[#17231f]">Publish a notice</h1><p className="mt-2 text-[#687570]">Share a clear, useful update with the university community.</p></div>
            {error && <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}
            {success && <div className="mt-6 flex items-center gap-3 rounded-xl border border-[#b9e4c9] bg-[#e8f4ee] p-4 text-sm font-bold text-[#07543f]"><FiCheck /> {success}</div>}
            <form onSubmit={handleSubmit} className="mt-7 space-y-6">
              <div><label htmlFor="title" className="mb-2 block text-sm font-bold text-[#34463f]">Notice title <span className="text-[#087f5b]">*</span></label><input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full rounded-xl border border-[#cddbd1] bg-[#fbfcfb] px-4 py-3 text-[#17231f] outline-none transition placeholder:text-[#99a69f] focus:border-[#087f5b] focus:ring-4 focus:ring-[#e8f4ee]" placeholder="e.g. Semester examination schedule" required /></div>
              <div><label htmlFor="content" className="mb-2 block text-sm font-bold text-[#34463f]">Message <span className="text-[#087f5b]">*</span></label><textarea id="content" name="content" rows="7" value={formData.content} onChange={handleChange} className="w-full resize-y rounded-xl border border-[#cddbd1] bg-[#fbfcfb] px-4 py-3 leading-6 text-[#17231f] outline-none transition placeholder:text-[#99a69f] focus:border-[#087f5b] focus:ring-4 focus:ring-[#e8f4ee]" placeholder="Write the information students and staff need to know..." required /></div>
              <div className="grid gap-6 sm:grid-cols-2"><div><label htmlFor="category" className="mb-2 block text-sm font-bold text-[#34463f]">University channel <span className="text-[#087f5b]">*</span></label><select id="category" name="category" value={formData.category} onChange={handleChange} className="w-full rounded-xl border border-[#cddbd1] bg-[#fbfcfb] px-4 py-3 text-[#17231f] outline-none focus:border-[#087f5b] focus:ring-4 focus:ring-[#e8f4ee]" required><option value="">Select university channel</option>{NOTICE_CATEGORY_GROUPS.map((group) => <optgroup key={group.label} label={group.label}>{group.options.map((category) => <option key={category} value={category}>{category}</option>)}</optgroup>)}</select></div><label htmlFor="important" className="flex cursor-pointer items-center gap-3 self-end rounded-xl border border-[#dfe7e1] bg-[#f5f7f4] px-4 py-3 text-sm font-bold text-[#34463f]"><input type="checkbox" id="important" name="important" checked={formData.important} onChange={handleChange} className="h-4 w-4 accent-[#087f5b]" /> Mark as important</label></div>
              <div><label htmlFor="attachment" className="mb-2 block text-sm font-bold text-[#34463f]">Supporting document</label><label htmlFor="attachment" className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-[#9dceb3] bg-[#f7fbf8] p-4 transition hover:bg-[#e8f4ee]"><span className="rounded-lg bg-[#e8f4ee] p-3 text-xl text-[#087f5b]"><FiPaperclip /></span><span><span className="block text-sm font-bold text-[#17231f]">Choose a file to attach</span><span className="mt-1 block text-xs text-[#687570]">PDF, image, or document</span></span><input type="file" id="attachment" onChange={handleFileChange} className="sr-only" /></label>{file && <p className="mt-2 text-sm text-[#687570]">Selected: <span className="font-bold text-[#34463f]">{file.name}</span> ({(file.size / 1024).toFixed(2)} KB)</p>}</div>
              <div className="flex flex-col justify-between gap-4 border-t border-[#dfe7e1] pt-6 sm:flex-row sm:items-center"><p className="text-xs leading-5 text-[#687570]">Please review your message before publishing. Clear notices are easier to act on.</p><button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#087f5b] px-6 py-3 font-bold text-white transition hover:bg-[#07543f] disabled:cursor-not-allowed disabled:opacity-50"><FiSend /> {loading ? 'Publishing...' : 'Publish notice'}</button></div>
            </form>
          </section>
          <aside className="h-fit rounded-[1.75rem] bg-[#07543f] p-6 text-white shadow-[0_12px_30px_rgba(7,84,63,0.14)]"><FiFileText className="text-3xl text-[#b9e4c9]" /><h2 className="mt-5 text-xl font-black">A good notice is...</h2><ul className="mt-5 space-y-4 text-sm leading-6 text-[#d7eee0]"><li className="flex gap-3"><FiCheck className="mt-1 shrink-0 text-[#b9e4c9]" /> Specific about what is happening.</li><li className="flex gap-3"><FiCheck className="mt-1 shrink-0 text-[#b9e4c9]" /> Clear about dates, places, and action.</li><li className="flex gap-3"><FiCheck className="mt-1 shrink-0 text-[#b9e4c9]" /> Easy to scan on a phone.</li></ul></aside>
        </div>
      </div>
    </div>
  );
}
