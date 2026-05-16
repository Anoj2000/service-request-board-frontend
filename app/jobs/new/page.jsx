'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function NewJob() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Plumbing',
    location: '',
    contactName: '',
    contactEmail: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Valid email is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // ADD TOKEN
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        router.push('/');
      } else {
        const data = await response.json();
        alert(data.error || 'Error creating job');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Post New Service Request</h1>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Title <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none"
              placeholder="e.g., Need a plumber for kitchen tap"
            />
            {errors.title && <p className="text-red-600 text-sm mt-1 font-medium">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Description <span className="text-red-600">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows="4"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none"
              placeholder="Describe the service you need in detail..."
            />
            {errors.description && <p className="text-red-600 text-sm mt-1 font-medium">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Category <span className="text-red-600">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white focus:border-blue-500 focus:outline-none"
            >
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="Painting">Painting</option>
              <option value="Joinery">Joinery</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Location <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none"
              placeholder="e.g., Glasgow"
            />
            {errors.location && <p className="text-red-600 text-sm mt-1 font-medium">{errors.location}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Contact Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={formData.contactName}
              onChange={(e) => setFormData({...formData, contactName: e.target.value})}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none"
              placeholder="Your name"
            />
            {errors.contactName && <p className="text-red-600 text-sm mt-1 font-medium">{errors.contactName}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Contact Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none"
              placeholder="your.email@example.com"
            />
            {errors.contactEmail && <p className="text-red-600 text-sm mt-1 font-medium">{errors.contactEmail}</p>}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md disabled:bg-gray-400"
            >
              {submitting ? 'Submitting...' : 'Submit Request'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="flex-1 bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}