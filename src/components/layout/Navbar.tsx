import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useReviewer } from '../../context/ReviewerContext';
import { Menu, X, Sparkles, User, BarChart2, MessageSquare, FileText, ClipboardCheck, LayoutDashboard, Heart } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useApp();
  const { isReviewerMode, toggleReviewerMode, isCoachMode, toggleCoachMode } = useReviewer();
  
  const handleNavClick = (path: string) => {
    if (isReviewerMode) {
      toggleReviewerMode();
    }
    if (isCoachMode) {
      toggleCoachMode();
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
    if (isReviewerMode || isCoachMode) return false;
    return location.pathname === path;
  };

  const renderModeToggle = (isMobile = false) => (
    <div className={`flex items-center ${isMobile ? 'mt-4' : 'h-10 border-l border-neutral-200 pl-4'}`}>
      <div className="flex items-center bg-neutral-100 rounded-full p-1">
        <button
          onClick={() => {
            if (isReviewerMode) toggleReviewerMode();
            if (isCoachMode) toggleCoachMode();
          }}
          className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
            !isReviewerMode && !isCoachMode
              ? 'bg-white text-neutral-900 shadow-sm' 
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          User
        </button>
        <button
          onClick={() => {
            if (!isReviewerMode) toggleReviewerMode();
            if (isCoachMode) toggleCoachMode();
          }}
          className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
            isReviewerMode && !isCoachMode
              ? 'bg-white text-neutral-900 shadow-sm' 
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          Reviewer
        </button>
        <button
          onClick={() => {
            if (isReviewerMode) toggleReviewerMode();
            if (!isCoachMode) toggleCoachMode();
          }}
          className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
            isCoachMode
              ? 'bg-white text-neutral-900 shadow-sm' 
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          Coach
        </button>
      </div>
    </div>
  );

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={() => {
              if (isReviewerMode) toggleReviewerMode();
              if (isCoachMode) toggleCoachMode();
            }}>
              {isCoachMode ? (
                <>
                  <div className="w-8 h-8 bg-[#2A5C8D] rounded-lg flex items-center justify-center">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  <span className="ml-2 text-xl font-semibold text-neutral-900">IntroSpark</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-8 w-8 text-primary-600" />
                  <span className="ml-2 text-xl font-semibold text-neutral-900">Mirror Match</span>
                </>
              )}
            </Link>
            
            {/* Mobile mode toggle */}
            <div className="md:hidden flex items-center ml-4">
              {renderModeToggle(true)}
            </div>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <>
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
                
                {/* Mode toggle */}
                {renderModeToggle()}
              </>
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