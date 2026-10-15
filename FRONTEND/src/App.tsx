import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnalysisProvider } from './context/AnalysisContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Analyze } from './pages/Analyze';
import { Results } from './pages/Results';
import { Dashboard } from './pages/Dashboard';
import { ResumeBuilder } from './pages/ResumeBuilder';
import { JobPosts } from './pages/JobPosts';
import { ChatAssistantWidget } from './components/ChatAssistantWidget';

// Auto scroll to top on route transition
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
};

export const App: React.FC = () => {
  return (
    <AnalysisProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#060813] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analyze" element={<Analyze />} />
              <Route path="/jobs" element={<JobPosts />} />
              <Route path="/results" element={<Results />} />
              <Route path="/builder" element={<ResumeBuilder />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
          {/* Global AI ATS Chat Assistant Widget */}
          <ChatAssistantWidget />
        </div>
      </Router>
    </AnalysisProvider>
  );
};

export default App;
