import Link from 'next/link';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function NoticeList({ notices, currentUser, onDelete }) {
  if (!notices || notices.length === 0) {
    return (
      <div className="bg-gray-50 p-10 rounded-xl text-center shadow-inner">
        <p className="text-gray-500 mb-4">No notices available</p>
        {currentUser && (currentUser.role === 'poster' || currentUser.role === 'admin') && (
          <Link
            href="/post-notice"
            className="inline-block px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            + Create New Notice
          </Link>
        )}
      </div>
    );
  }

  const canEdit = notice => {
    if (!currentUser) return false;
    const isOwner = notice.postedBy?._id?.toString() === currentUser._id?.toString();
    return isOwner && (currentUser.role === 'poster' || currentUser.role === 'admin');
  };

  const canDelete = notice => {
    if (!currentUser) return false;
    const isOwner = notice.postedBy?._id?.toString() === currentUser._id?.toString();
    return currentUser.role === 'admin' || (currentUser.role === 'poster' && isOwner);
  };

  return (
    <div className="space-y-6">
      {notices.map((notice, index) => (
        <div
          key={notice._id}
          className={`group relative p-6 rounded-xl shadow-md border ${
            notice.important
           ? 'border-l-4 border-red-500 bg-red-50'  // Important notice style
           : 'border-gray-200 bg-white'             // Regular notice style
          } transform transition-all duration-500 ease-in-out 
            hover:shadow-xl hover:-translate-y-1`}
          style={{
            animationDelay: `${index * 0.1}s`,
            transitionDelay: '50ms',
          }}
        >
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {canEdit(notice) && (
              <Link
                href={`/notices/edit/${notice._id}`}
                className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                title="Edit Notice"
              >
                <FiEdit2 className="w-4 h-4" />
              </Link>
            )}
            {canDelete(notice) && (
              <button
                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title="Delete Notice"
                onClick={() => onDelete(notice._id)}
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Notice Title */}
          <Link href={`/notices/${notice._id}`} className="block pr-10">
            <h3 className="text-lg font-bold text-green-700 mb-2 hover:underline">
              {notice.title}
            </h3>
          </Link>

          {/* Meta Info */}
          <p className="text-sm text-gray-500 mb-3">
            Posted by: {notice.postedBy?.username || 'Unknown'} • {notice.category} •{' '}
            {new Date(notice.createdAt).toLocaleDateString()}
          </p>

          {/* Content Preview */}
          <p className="text-gray-700 leading-relaxed">
            {notice.content.length > 150
              ? `${notice.content.substring(0, 150).trim()}...`
              : notice.content}
          </p>
        </div>
      ))}
    </div>
  );
}
