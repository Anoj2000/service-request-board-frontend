# Service Request Board - Frontend

Frontend application for the Service Request Board built with Next.js 14 and Tailwind CSS.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Language:** JavaScript/React

## ✨ Features

- ✅ Browse service requests
- ✅ Filter jobs by category
- ✅ Create new service requests
- ✅ View detailed job information
- ✅ Update job status (Open/In Progress/Closed)
- ✅ Delete jobs
- ✅ Client-side form validation
- ✅ Responsive design

## 🛠️ Setup Instructions

### Prerequisites
- Node.js v18 or higher
- Backend API running (see [backend repo](https://github.com/YOUR_USERNAME/service-request-board-backend))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/service-request-board-frontend.git
cd service-request-board-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

For production, use your Railway backend URL:
```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
```

4. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Project Structure
frontend/
├── app/
│   ├── jobs/
│   │   ├── [id]/
│   │   │   └── page.jsx      # Job detail page
│   │   └── new/
│   │       └── page.jsx       # Create job form
│   ├── page.jsx               # Home page (job list)
│   └── layout.jsx             # Root layout
├── public/
├── .env.local                 # Environment variables (not in git)
├── .gitignore
├── next.config.js
├── tailwind.config.js
└── package.json

## 🌐 Deployment

Deployed on Vercel: [Your Vercel URL]

## 📝 Environment Variables

Required environment variables:

- `NEXT_PUBLIC_API_URL` - Backend API URL

## 🔗 Related Repositories

- **Backend API:** [service-request-board-backend](https://github.com/YOUR_USERNAME/service-request-board-backend)

## 👨‍💻 Author

[Your Name]

## 📅 Submission Date

May 18, 2026 - GlobalTNA Full-Stack Developer Intern Assessment