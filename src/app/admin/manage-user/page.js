"use client";

import { useEffect, useState } from "react";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/users", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch users");
      setUsers(data.users || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete user");

      setUsers((prev) => prev.filter((u) => u._id !== id));
      alert("✅ " + data.message);
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Determine which page numbers to show (max 5 at a time)
  const pageNumberLimit = 5;
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(1);

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-green-100 p-6">
      <div className="max-w-6xl mx-auto backdrop-blur-md bg-white/80 p-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Manage Users
        </h1>

        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading users...</p>
        ) : error ? (
          <p className="text-center text-red-500 font-medium text-lg">❌ {error}</p>
        ) : users.length === 0 ? (
          <div className="text-center p-10 bg-gray-50 rounded-xl shadow">
            <p className="text-gray-600 text-xl">No users found 👥</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-xl shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-green-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm md:text-lg font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm md:text-lg font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm md:text-lg font-semibold text-gray-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-sm md:text-lg font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-sm md:text-lg font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100 text-lg">
                  {currentUsers.map((u, idx) => (
                    <tr
                      key={u._id}
                      className={`hover:bg-gray-50 transition ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">{u.username}</td>
                      <td className="px-6 py-4 text-gray-700">{u.email}</td>
                      <td className="px-6 py-4 text-gray-700">{u.role}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm md:text-base font-medium ${
                            u.status === "active"
                              ? "bg-green-100 text-green-700"
                              : u.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => deleteUser(u._id)}
                          className="px-5 py-2 bg-red-600 text-white text-base font-medium rounded-lg shadow hover:bg-red-700 transition cursor-pointer"
                        >
                          Delete
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
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg font-medium bg-white text-gray-700 border border-gray-300 hover:bg-green-100 hover:text-green-700 disabled:opacity-50"
              >
                &laquo; Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((num) => num >= minPageNumberLimit && num <= maxPageNumberLimit)
                .map((num) => (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      currentPage === num
                        ? "bg-green-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-green-100 hover:text-green-700"
                    }`}
                  >
                    {num}
                  </button>
                ))}

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg font-medium bg-white text-gray-700 border border-gray-300 hover:bg-green-100 hover:text-green-700 disabled:opacity-50"
              >
                Next &raquo;
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
