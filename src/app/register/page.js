'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    category: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Registration failed');

      router.push('/register/register-help');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-12 bg-white rounded-2xl shadow-2xl transform transition-transform duration-300 hover:-translate-y-1">
        <h1 className="text-3xl font-extrabold text-green-700 mb-6 text-center tracking-wide">
          Create Account
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Your full name"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 transition-all duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 transition-all duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 transition-all duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-gray-700">
              Department/Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 transition-all duration-200"
              required
            >
              <option value="">Select your department</option>
              <option value="Administration">Administration</option>
              <option value="Library">Library</option>
              <option value="Medical Center">Medical Center</option>
              <option value="Student Union">Student Union</option>
              <option value="Food Science and Technology">Food Science and Technology</option>
              <option value="Natural Resources">Natural Resources</option>
              <option value="Physical Sciences and Technologies">Physical Sciences and Technologies</option>
              <option value="Sports Sciences and Physical Education">Sports Sciences and Physical Education</option>
              <option value="Economics and Statistics">Economics and Statistics</option>
              <option value="English Language Teaching">English Language Teaching</option>
              <option value="Geography and Environmental Management">Geography and Environmental Management</option>
              <option value="Languages">Languages</option>
              <option value="Social Sciences">Social Sciences</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Accountancy & Finance">Accountancy & Finance</option>
              <option value="Business Management">Business Management</option>
              <option value="Marketing Management">Marketing Management</option>
              <option value="Tourism Management">Tourism Management</option>
              <option value="Medicine">Medicine</option>
              <option value="Anatomy">Anatomy</option>
              <option value="Biochemistry">Biochemistry</option>
              <option value="Community Medicine">Community Medicine</option>
              <option value="Forensic Medicine & Toxicology">Forensic Medicine & Toxicology</option>
              <option value="Microbiology">Microbiology</option>
              <option value="Obstetrics & Gynaecology">Obstetrics & Gynaecology</option>
              <option value="Paediatrics">Paediatrics</option>
              <option value="Parasitology">Parasitology</option>
              <option value="Pathology">Pathology</option>
              <option value="Pharmacology">Pharmacology</option>
              <option value="Primary Care & Family Medicine">Primary Care & Family Medicine</option>
              <option value="Psychiatry">Psychiatry</option>
              <option value="Surgery">Surgery</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-green-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
