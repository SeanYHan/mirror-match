import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import SubmitFeedback from '../feedback/SubmitFeedback';

const Layout: React.FC = () => {
  const location = useLocation();
  const { isOnboarded, userMode } = useApp();
  
  // Hide navbar and footer only on onboarding page
  const showNavFooter = location.pathname !== '/onboarding';

  // Show reviewer content only in reviewer mode and not on feedback-complete page
  const showReviewerContent = userMode === 'reviewer' && location.pathname !== '/feedback-complete';

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
        {showReviewerContent ? <SubmitFeedback /> : <Outlet />}
      </motion.main>
      
      {showNavFooter && <Footer />}
    </div>
  );
};

export default Layout;