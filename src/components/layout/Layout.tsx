import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const Layout: React.FC = () => {
  const location = useLocation();
  const { isOnboarded } = useApp();
  
  // Hide navbar and footer on onboarding page
  const showNavFooter = location.pathname !== '/onboarding' && (isOnboarded || location.pathname === '/');

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
        <Outlet />
      </motion.main>
      
      {showNavFooter && <Footer />}
    </div>
  );
};

export default Layout;