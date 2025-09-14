'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-green-100 p-6">
      <div className="w-full max-w-2xl p-8 bg-white/30 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
          Add New Notice
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100/80 text-red-700 rounded-lg shadow text-center font-medium">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100/80 text-green-700 rounded-lg shadow text-center font-medium">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-800 mb-1">
              Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-white/40 bg-white/50 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter notice title"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-semibold text-gray-800 mb-1">
              Content*
            </label>
            <textarea
              id="content"
              name="content"
              rows="6"
              value={formData.content}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/50 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Write the notice content..."
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-gray-800 mb-1">
              Category*
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-white/40 bg-white/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
              <option value="Strike">Other</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="important"
              name="important"
              checked={formData.important}
              onChange={handleChange}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="important" className="ml-2 text-sm text-gray-800">
              Mark as important
            </label>
          </div>

          <div>
            <label htmlFor="attachment" className="block text-sm font-semibold text-gray-800 mb-1">
              Attachment
            </label>
            <input
              type="file"
              id="attachment"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
            />
            {file && (
              <p className="mt-1 text-sm text-gray-700">
                Selected file: {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold shadow-lg transition ${
              loading
                ? 'bg-green-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {loading ? 'Posting...' : 'Post Notice'}
          </button>
        </form>
      </div>
    </div>
  );
}
