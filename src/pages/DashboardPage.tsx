import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import DemographicsChart from '../components/dashboard/DemographicsChart';
import SkillsRadarChart from '../components/dashboard/SkillsRadarChart';
import RecentActivity from '../components/dashboard/RecentActivity';
import { MessageSquare, FileText, User } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user, avatar } = useApp();
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-600 mb-4">Please complete onboarding first.</p>
          <Link to="/onboarding" className="btn btn-primary">
            Go to Onboarding
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Welcome back, {user.name}</h1>
            <p className="text-neutral-600 mt-1">Here's an overview of your dating skills and progress.</p>
          </div>
          
          {avatar && (
            <div className="flex items-center mt-4 md:mt-0">
              <img src={avatar.image} alt="Your avatar" className="w-12 h-12 rounded-full" />
              <div className="ml-3">
                <p className="text-sm font-medium text-neutral-900">Your Coach: {avatar.name}</p>
                <p className="text-xs text-neutral-500">Specializes in {avatar.specialty}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { 
              title: "Chat with Coach", 
              description: "Practice conversations and get feedback", 
              icon: <MessageSquare className="h-5 w-5" />, 
              link: "/chat", 
              color: "bg-primary-600 hover:bg-primary-700" 
            },
            { 
              title: "View Report", 
              description: "See your strengths and areas to improve", 
              icon: <FileText className="h-5 w-5" />, 
              link: "/report", 
              color: "bg-secondary-600 hover:bg-secondary-700" 
            },
            { 
              title: "Update Profile", 
              description: "Edit your interests and preferences", 
              icon: <User className="h-5 w-5" />, 
              link: "/profile", 
              color: "bg-accent-600 hover:bg-accent-700" 
            }
          ].map((action, index) => (
            <Link 
              key={index}
              to={action.link}
              className={`${action.color} text-white rounded-xl p-5 shadow-md transition-all hover:shadow-lg`}
            >
              <div className="flex items-start">
                <div className="bg-white/20 rounded-lg p-2 mr-4">
                  {action.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{action.title}</h3>
                  <p className="text-white/80 text-sm">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Data visualization section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card p-6"
          >
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Community Demographics</h2>
            <DemographicsChart />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card p-6"
          >
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Your Dating Skills</h2>
            <SkillsRadarChart skills={user.skills} />
          </motion.div>
        </div>
        
        {/* Recent activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card p-6"
        >
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Recent Activity</h2>
          <RecentActivity />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;