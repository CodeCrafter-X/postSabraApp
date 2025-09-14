export default function UserProfile({ user }) {
  if (!user) return <p className="text-gray-500">No user data available</p>;

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-500 text-white text-2xl font-bold shadow-md">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">{user.username}</h1>
          <p className="text-gray-500">User Profile</p>
        </div>
      </div>

      {/* Info */}
      <div className="grid gap-4">
        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm">
          <span className="font-semibold text-gray-700">Email:</span>
          <span className="text-gray-600">{user.email}</span>
        </div>

        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm">
          <span className="font-semibold text-gray-700">Role:</span>
          <span className="capitalize text-gray-600">{user.role}</span>
        </div>

        {user.category && (
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm">
            <span className="font-semibold text-gray-700">Department:</span>
            <span className="text-gray-600">{user.category}</span>
          </div>
        )}

        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm">
          <span className="font-semibold text-gray-700">Account Status:</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              user.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {user.status}
          </span>
        </div>

        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm">
          <span className="font-semibold text-gray-700">Member Since:</span>
          <span className="text-gray-600">
            {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
