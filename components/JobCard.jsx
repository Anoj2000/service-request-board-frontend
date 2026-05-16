import Link from 'next/link';

const STATUS_STYLES = {
  'Open': 'bg-green-100 text-green-800 border-green-300',
  'In Progress': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  'Closed': 'bg-gray-100 text-gray-800 border-gray-300',
};

export default function JobCard({ job }) {
  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-300 h-full flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-xl font-bold text-gray-900 flex-1 mr-2">{job.title}</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold border-2 whitespace-nowrap ${STATUS_STYLES[job.status] ?? STATUS_STYLES['Closed']}`}>
            {job.status}
          </span>
        </div>

        <p className="text-gray-700 mb-4 line-clamp-2 flex-1">{job.description}</p>

        <div className="flex justify-between text-sm text-gray-600 font-medium mt-auto">
          <span className="bg-blue-50 px-3 py-1 rounded-full">📋 {job.category}</span>
          <span className="bg-purple-50 px-3 py-1 rounded-full">📍 {job.location}</span>
        </div>
      </div>
    </Link>
  );
}