'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import JobCard from '@/components/JobCard';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchJobs(); }, [category]);

  const fetchJobs = async () => {
    try {
      const url = category
        ? `${process.env.NEXT_PUBLIC_API_URL}/jobs?category=${category}`
        : `${process.env.NEXT_PUBLIC_API_URL}/jobs`;
      const response = await fetch(url);
      setJobs(await response.json());
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Plumbing', 'Electrical', 'Painting', 'Joinery'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Service Requests</h1>
            <p className="text-gray-700">Browse and manage service requests</p>
          </div>
          <Link href="/jobs/new"
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md">
            + Post New Job
          </Link>
        </div>

        <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <label className="block text-sm font-semibold text-gray-800 mb-2">Filter by Category</label>
          <select value={category}
            onChange={(e) => setCategory(e.target.value === 'All' ? '' : e.target.value)}
            className="border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-900 bg-white focus:border-blue-500 focus:outline-none">
            {categories.map((cat) => (
              <option key={cat} value={cat === 'All' ? '' : cat}>{cat}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-center text-gray-700 text-lg">Loading...</p>
        ) : jobs.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-700 text-lg">No jobs found. Post the first one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => <JobCard key={job._id} job={job} />)}
          </div>
        )}
      </div>
    </div>
  );
}