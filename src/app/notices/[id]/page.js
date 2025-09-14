"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function NoticePage() {
  const { id } = useParams();
  const router = useRouter();

  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchNotice = async () => {
      try {
        const res = await fetch(`/api/notices/${id}`);
        if (!res.ok) throw new Error("Failed to fetch notice");
        const data = await res.json();
        setNotice(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [id]);

  if (loading) return <p className="text-gray-500 text-center">Loading notice...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;
  if (!notice) return <p className="text-gray-500 text-center">Notice not found</p>;

  return (
   <div className="bg-green-50 flex items-center justify-center py-20 px-15">

      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-md shadow-lg rounded-2xl border border-green-200 p-6 py-10 px-10">
        {/* Header */}
        <div className="mb-4 border-b border-green-300 pb-3 text-center">
          <h1 className="text-2xl font-bold text-green-900 mb-1">{notice.title}</h1>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-green-700">
            <span className="px-2 py-0.5 bg-green-100 rounded-full font-medium text-xs">
              {notice.category || "General"}
            </span>
            <span>
              Posted by <span className="font-semibold">{notice.postedBy?.username || "Unknown"}</span>
            </span>
            <span className="text-xs">{new Date(notice.createdAt).toLocaleString()}</span>
          </div>
        </div>

        {/* Content */}
        <p className="text-gray-800 whitespace-pre-line leading-relaxed text-base">
          {notice.content}
        </p>

        {/* Attachments */}
        {notice.attachments?.length > 0 && (
          <div className="mt-4">
            <h2 className="text-green-800 font-semibold mb-1 text-center text-sm">Attachments:</h2>
            <ul className="list-disc list-inside space-y-1 text-center text-sm">
              {notice.attachments.map((file, idx) => (
                <li key={idx}>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    {file.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => router.back()}
            className="px-5 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
