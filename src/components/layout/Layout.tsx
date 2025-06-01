import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { useReviewer } from '../../context/ReviewerContext';
import SubmitFeedback from '../feedback/SubmitFeedback';
import CoachMatchBridge from '../coach/CoachMatchBridge';

const Layout: React.FC = () => {
  const location = useLocation();
  const { isOnboarded } = useApp();
  const { isReviewerMode, isCoachMode } = useReviewer();
  
  // Hide navbar and footer only on onboarding page
  const showNavFooter = location.pathname !== '/onboarding';

  // Don't show reviewer mode content on feedback-complete page
  const showReviewerContent = isReviewerMode && location.pathname !== '/feedback-complete';

  // Show coach mode content when in coach mode
  const showCoachContent = isCoachMode;

  return (
    <div className="flex flex-col min-h-screen">
      {showNavFooter && <Navbar />}
      
      <motion.main 
        className="flex-grow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        key={location.pathname}
      >
        {showReviewerContent ? (
          <SubmitFeedback />
        ) : showCoachContent ? (
          <CoachMatchBridge />
        ) : (
          <Outlet />
        )}
      </motion.main>
      
      {showNavFooter && <Footer />}
    </div>
  );
};

export default Layout;