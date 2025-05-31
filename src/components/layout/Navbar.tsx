import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Menu, X, Sparkles, User, BarChart2, MessageSquare, FileText } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useApp();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: <BarChart2 size={20} /> },
    { to: '/chat', label: 'Chat', icon: <MessageSquare size={20} /> },
    { to: '/report', label: 'Report', icon: <FileText size={20} /> },
    { to: '/profile', label: 'Profile', icon: <User size={20} /> },
  ];
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Sparkles className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-semibold text-neutral-900">Mirror Match</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive(link.to)
                        ? 'text-primary-700 bg-primary-50'
                        : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    {link.icon}
                    <span className="ml-1">{link.label}</span>
                  </Link>
                ))}
              </div>
            )}
            
            {!user && (
              <Link to="/onboarding" className="btn btn-primary">
                Get Started
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-600 hover:text-primary-600 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white pb-3 px-4">
          <div className="flex flex-col space-y-2">
            {user ? (
              navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    isActive(link.to)
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon}
                  <span className="ml-2">{link.label}</span>
                </Link>
              ))
            ) : (
              <Link 
                to="/onboarding" 
                className="btn btn-primary text-center"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;