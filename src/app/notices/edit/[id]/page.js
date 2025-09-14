'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function EditNoticePage() {
  const router = useRouter();
  const { id } = useParams(); // ✅ Correct way to get route param in client
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    if (!id) return;

    const fetchNotice = async () => {
      try {
        const res = await fetch(`/api/notices/edit/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch notice');

        setNotice(data.notice || data);
        setFormData({
          title: data.notice?.title || data.title,
          content: data.notice?.content || data.content,
          category: data.notice?.category || data.category,
          important: data.notice?.important || false,
          attachments: data.notice?.attachments || [],
        });
      } catch (err) {
        toast.error(err.message);
        router.push('/notices');
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [id, router]);

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
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      let attachmentUrl = '';

      if (file) {
        const form = new FormData();
        form.append('file', file);
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: form });
        if (!uploadRes.ok) throw new Error('File upload failed');
        const uploadData = await uploadRes.json();
        attachmentUrl = uploadData.url;
      }

      const updatedData = {
        ...formData,
        attachments: attachmentUrl
          ? [{ name: file.name, url: attachmentUrl, size: file.size }]
          : formData.attachments,
      };

      const res = await fetch(`/api/notices/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error('Failed to update notice');

      setSuccess('Notice updated successfully!');
      setTimeout(() => router.push('/notices'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-green-50/30">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600"></div>
    </div>
  );

  if (!notice) return (
    <div className="min-h-screen flex items-center justify-center bg-green-50/30">
      <p className="text-red-600 font-semibold text-lg">Notice not found</p>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50/30 p-4">
      <div className="w-full max-w-2xl p-6 bg-white/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
        <h1 className="text-3xl font-extrabold text-green-700 mb-6 text-center">
          Edit Notice
        </h1>

        {error && <div className="mb-4 p-3 bg-red-100/80 text-red-700 rounded-lg text-center font-medium">{error}</div>}
        {success && <div className="mb-4 p-3 bg-green-100/80 text-green-700 rounded-lg text-center font-medium">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title*"
            className="w-full px-4 py-2 rounded-xl border border-white/40 bg-white/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="5"
            placeholder="Content*"
            className="w-full px-4 py-2 rounded-xl border border-white/40 bg-white/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl border border-white/40 bg-white/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Select category</option>
            <option value="Academic">Academic</option>
            <option value="Administrative">Administrative</option>
            <option value="Event">Event</option>
            <option value="Exam">Exam</option>
            <option value="Holiday">Holiday</option>
            <option value="Job">Job Opportunity</option>
            <option value="Scholarship">Scholarship</option>
            <option value="Strike">Strike</option>
            <option value="Other">Other</option>
          </select>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="important"
              checked={formData.important}
              onChange={handleChange}
              className="h-4 w-4 text-green-600 border-gray-300 rounded"
            />
            <label className="text-gray-800 text-sm">Mark as important</label>
          </div>

          <div>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:py-2 file:px-4 file:bg-green-50 file:text-green-700 file:rounded-lg hover:file:bg-green-100 cursor-pointer"
            />
            {file && <p className="text-sm mt-1 text-gray-700">Selected: {file.name} ({(file.size/1024).toFixed(2)} KB)</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white shadow-lg ${loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {loading ? 'Updating...' : 'Update Notice'}
          </button>
        </form>
      </div>
    </div>
  );
}
