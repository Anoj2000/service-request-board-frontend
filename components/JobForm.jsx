'use client';
import { useState } from 'react';

const CATEGORIES = ['Plumbing', 'Electrical', 'Painting', 'Joinery'];

const INITIAL_STATE = {
  title: '',
  description: '',
  category: 'Plumbing',
  location: '',
  contactName: '',
  contactEmail: '',
};

export default function JobForm({ onSubmit, onCancel, loading = false }) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});

  const set = (field) => (e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim())       newErrors.title       = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim())    newErrors.location    = 'Location is required';
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail))
      newErrors.contactEmail = 'Valid email is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(formData);
  };

  const field = (label, key, element) => (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        {label} <span className="text-red-600">*</span>
      </label>
      {element}
      {errors[key] && <p className="text-red-600 text-sm mt-1 font-medium">{errors[key]}</p>}
    </div>
  );

  const inputClass = "w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {field('Title', 'title',
        <input type="text" value={formData.title} onChange={set('title')}
          className={inputClass} placeholder="e.g., Need a plumber for kitchen tap" />
      )}

      {field('Description', 'description',
        <textarea value={formData.description} onChange={set('description')}
          rows="4" className={inputClass}
          placeholder="Describe the service you need in detail..." />
      )}

      {field('Category', 'category',
        <select value={formData.category} onChange={set('category')}
          className={`${inputClass} bg-white`}>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      )}

      {field('Location', 'location',
        <input type="text" value={formData.location} onChange={set('location')}
          className={inputClass} placeholder="e.g., Glasgow" />
      )}

      {field('Contact Name', 'contactName',
        <input type="text" value={formData.contactName} onChange={set('contactName')}
          className={inputClass} placeholder="Your name" />
      )}

      {field('Contact Email', 'contactEmail',
        <input type="email" value={formData.contactEmail} onChange={set('contactEmail')}
          className={inputClass} placeholder="your.email@example.com" />
      )}

      <div className="flex gap-4 pt-4">
        <button type="submit" disabled={loading}
          className="flex-1 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50">
          {loading ? 'Submitting…' : 'Submit Request'}
        </button>
        <button type="button" onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}