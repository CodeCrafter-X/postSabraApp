// components/NoticeActions.js
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';

export default function NoticeActions({ notice, currentUser }) {
  const canEdit = currentUser && (
    currentUser.role === 'admin' || 
    (currentUser.role === 'poster' && notice.postedBy._id === currentUser._id)
  );

  const canDelete = currentUser && currentUser.role === 'admin';

  if (!canEdit && !canDelete) return null;

  return (
    <div className="absolute top-4 right-4 flex gap-2">
      {canEdit && (
        <Link
          href={`/notices/edit/${notice._id}`}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          title="Edit Notice"
        >
          <FiEdit2 className="w-4 h-4" />
        </Link>
      )}
      {canDelete && (
        <button
          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
          title="Delete Notice"
          onClick={() => {/* Delete handler will be passed from parent */}}
        >
          <FiTrash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}