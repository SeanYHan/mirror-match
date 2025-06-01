import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useReviewer } from '../../context/ReviewerContext';
import { Menu, X, Sparkles, User, BarChart2, MessageSquare, FileText, ClipboardCheck, LayoutDashboard } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useApp();
  const { isReviewerMode, toggleReviewerMode } = useReviewer();
  
  const handleNavClick = (path: string) => {
    if (isReviewerMode) {
      toggleReviewerMode();
    }
    navigate(path);
  };

  const navLinks = [
    // { path: '/', icon: Home, label: 'Home' },
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/chat', icon: MessageSquare, label: 'Chat' },
    { path: '/report', icon: BarChart2, label: 'Report' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];
  
  const isActive = (path: string) => {
    // Don't show any menu item as active when in reviewer mode
    if (isReviewerMode) return false;
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center" onClick={() => isReviewerMode && toggleReviewerMode()}>
              <Sparkles className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-semibold text-neutral-900">Mirror Match</span>
            </Link>
            
            {/* Reviewer mode toggle - desktop */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center bg-neutral-100 rounded-full p-1">
                <button
                  onClick={() => isReviewerMode && toggleReviewerMode()}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    !isReviewerMode 
                      ? 'bg-white text-neutral-900 shadow-sm' 
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  User
                </button>
                <button
                  onClick={() => !isReviewerMode && toggleReviewerMode()}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    isReviewerMode 
                      ? 'bg-white text-neutral-900 shadow-sm' 
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  Reviewer
                </button>
              </div>
            </div>
            
            {/* Mobile reviewer mode toggle */}
            <div className="md:hidden flex items-center">
              <div className="flex items-center bg-neutral-100 rounded-full p-1 w-fit">
                <button
                  onClick={() => isReviewerMode && toggleReviewerMode()}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    !isReviewerMode 
                      ? 'bg-white text-neutral-900 shadow-sm' 
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  User
                </button>
                <button
                  onClick={() => !isReviewerMode && toggleReviewerMode()}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    isReviewerMode 
                      ? 'bg-white text-neutral-900 shadow-sm' 
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  Reviewer
                </button>
              </div>
            </div>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-4">
                {navLinks.map(({ path, icon: Icon }) => (
                  <button
                    key={path}
                    onClick={() => handleNavClick(path)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive(path)
                        ? 'text-primary-700 bg-primary-50'
                        : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-1" />
                    <span className="ml-1">{path.replace('/', '').charAt(0).toUpperCase() + path.replace('/', '').slice(1)}</span>
                  </button>
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
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-3 px-4">
          <div className="flex flex-col space-y-2">
            {user ? (
              <>
                {navLinks.map(({ path, icon: Icon }) => (
                  <button
                    key={path}
                    onClick={() => {
                      handleNavClick(path);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      isActive(path)
                        ? 'text-primary-700 bg-primary-50'
                        : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    <span className="ml-2">{path.replace('/', '').charAt(0).toUpperCase() + path.replace('/', '').slice(1)}</span>
                  </button>
                ))}
              </>
            ) : (
              <Link 
                to="/onboarding" 
                className="btn btn-primary text-center"
                onClick={() => setIsMenuOpen(false)}
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