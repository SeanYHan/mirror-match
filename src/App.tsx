import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import ReportPage from './pages/ReportPage';
import FeedbackCompletePage from './pages/FeedbackCompletePage';
import { AppProvider } from './context/AppContext';
import { ReviewerProvider } from './context/ReviewerContext';
import SubmitFeedback from './components/feedback/SubmitFeedback';

function App() {
  return (
    <AppProvider>
      <ReviewerProvider>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="onboarding" element={<OnboardingPage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="chat" element={<ChatPage />} />
              <Route path="report" element={<ReportPage />} />
              <Route path="feedback-complete" element={<FeedbackCompletePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </ReviewerProvider>
    </AppProvider>
  );
}

export default App;