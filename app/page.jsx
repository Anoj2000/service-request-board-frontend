'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchJobs();
  }, [category, searchTerm]);

  const fetchJobs = async () => {
    try {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/jobs?`;
      
      if (category) url += `category=${category}&`;
      if (searchTerm) url += `search=${searchTerm}&`;
      
      const response = await fetch(url);
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Plumbing', 'Electrical', 'Painting', 'Joinery'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* NAVBAR */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            ServiceBoard
          </Link>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-gray-700 font-medium">
                  Welcome, {user.name}
                </span>
                <button
                  onClick={logout}
                  className="bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-blue-600 font-semibold hover:text-blue-800"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Service Requests</h1>
              <p className="text-gray-700">Browse and manage service requests</p>
            </div>
            {user ? (
              <Link 
                href="/jobs/new"
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                + Post New Job
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                Login to Post Job
              </Link>
            )}
          </div>

          {/* FILTERS */}
          <div className="mb-6 bg-white p-6 rounded-lg shadow-md space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                🔍 Search Jobs
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or description..."
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Filter by Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value === 'All' ? '' : e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-900 bg-white focus:border-blue-500 focus:outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat === 'All' ? '' : cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {(searchTerm || category) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCategory('');
                }}
                className="text-blue-600 font-semibold hover:text-blue-800"
              >
                ✕ Clear all filters
              </button>
            )}
          </div>

          {/* JOBS LIST */}
          {loading ? (
            <p className="text-center text-gray-700 text-lg">Loading...</p>
          ) : jobs.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <p className="text-gray-700 text-lg mb-2">No jobs found</p>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div>
              <p className="text-gray-700 mb-4 font-semibold">
                Found {jobs.length} job{jobs.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map(job => (
                  <Link key={job._id} href={`/jobs/${job._id}`}>
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-300">
                      <div className="flex justify-between items-start mb-3">
                        <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          job.status === 'Open' ? 'bg-green-100 text-green-800 border-2 border-green-300' :
                          job.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300' :
                          'bg-gray-100 text-gray-800 border-2 border-gray-300'
                        }`}>
                          {job.status}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>
                      <div className="flex justify-between text-sm text-gray-600 font-medium">
                        <span className="bg-blue-50 px-3 py-1 rounded-full">📋 {job.category}</span>
                        <span className="bg-purple-50 px-3 py-1 rounded-full">📍 {job.location}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}