# ATS Resume Ranking - Frontend Dashboard

The user-facing client for the AI-Powered ATS Resume Ranking, Chat Assistant, and Resume Builder platform. Built with React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, and Framer Motion.

## 🚀 Features

- **ATS Analysis Studio (`/analyze`):** Interactive resume uploader (PDF/Text) with multi-profile presets and real-time processing indicators.
- **Detailed Audit & Analytics (`/results`):** Radial score gauge, match breakdown, radar competencies, missing skill highlight cards, and suggestions.
- **Interactive Resume Builder (`/builder`):** Live side-by-side single-column ATS editor with 1-click missing skill injection from the ATS scan and clean PDF printing.
- **AI Chat Assistant Widget:** Floating drawer on every screen offering context-aware resume coaching, STAR method bullet rewrites, and interview preparation.
- **Analytics Dashboard (`/dashboard`):** Historical scan log, average scores, and comparison trends.

## 🛠️ Scripts

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ⚙️ Environment Variables

Copy `.env.example` to `.env`:
```env
VITE_API_URL=http://localhost:8000/api
```
