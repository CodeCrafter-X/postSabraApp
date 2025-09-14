'use client';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get('query');
    const category = formData.get('category');
    
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category) params.set('category', category);
    
    router.push(`/notices?${params.toString()}`);
  };

  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="query" className="sr-only">Search</label>
          <input
            type="text"
            name="query"
            id="query"
            placeholder="Search notices..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-full md:w-48">
          <label htmlFor="category" className="sr-only">Category</label>
          <select
            name="category"
            id="category"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="Academic">Academic</option>
            <option value="Administrative">Administrative</option>
            <option value="Event">Event</option>
            <option value="Exam">Exam</option>
            <option value="Holiday">Holiday</option>
            <option value="Job">Job Opportunity</option>
            <option value="Scholarship">Scholarship</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>
    </div>
  );
}