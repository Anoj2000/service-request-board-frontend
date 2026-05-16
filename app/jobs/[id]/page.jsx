'use client';
import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function JobDetail({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`);
      const data = await response.json();
      setJob(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) fetchJob();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteJob = async () => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) router.push('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) return <p className="p-8 text-center text-gray-700 text-lg">Loading...</p>;
  if (!job) return <p className="p-8 text-center text-gray-700 text-lg">Job not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
          <span className={`px-4 py-2 rounded-full font-semibold ${
            job.status === 'Open' ? 'bg-green-100 text-green-800 border-2 border-green-300' :
            job.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300' :
            'bg-gray-100 text-gray-800 border-2 border-gray-300'
          }`}>
            {job.status}
          </span>
        </div>

        <div className="space-y-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-bold text-gray-900 mb-2">Description</h2>
            <p className="text-gray-700">{job.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="font-bold text-gray-900 mb-2">Category</h2>
              <p className="text-gray-700">📋 {job.category}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h2 className="font-bold text-gray-900 mb-2">Location</h2>
              <p className="text-gray-700">📍 {job.location}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h2 className="font-bold text-gray-900 mb-2">Contact Name</h2>
              <p className="text-gray-700">👤 {job.contactName}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h2 className="font-bold text-gray-900 mb-2">Contact Email</h2>
              <p className="text-gray-700">✉️ {job.contactEmail}</p>
            </div>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h2 className="font-bold text-gray-900 mb-2">Posted</h2>
            <p className="text-gray-700">🗓️ {new Date(job.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-semibold text-gray-800 mb-2">Update Status</label>
            <select
              value={job.status}
              onChange={(e) => updateStatus(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-900 bg-white focus:border-blue-500 focus:outline-none"
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Closed</option>
            </select>
          </div>
          <button
            onClick={deleteJob}
            className="bg-red-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-md"
          >
            Delete Job
          </button>
          <button
            onClick={() => router.push('/')}
            className="bg-gray-200 text-gray-800 font-semibold px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
}