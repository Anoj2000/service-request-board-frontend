'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import JobForm from '@/components/JobForm';

export default function NewJob() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) router.push('/');
      else alert('Error creating job');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Post New Service Request</h1>
        <JobForm onSubmit={handleSubmit} onCancel={() => router.push('/')} loading={loading} />
      </div>
    </div>
  );
}