import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import DemographicsChart from '../components/dashboard/DemographicsChart';
import SkillsRadarChart from '../components/dashboard/SkillsRadarChart';
import RecentActivity from '../components/dashboard/RecentActivity';
import { MessageSquare, FileText, User, Users, Calendar, Settings, BarChart as ChartBar } from 'lucide-react';

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

  // Dating Coach Dashboard
  if (user.isDatingCoach) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900">Coach Dashboard</h1>
              <p className="text-neutral-600 mt-1">Manage your clients and schedule</p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { 
                title: "Active Clients", 
                value: "24", 
                icon: <Users className="h-5 w-5" />, 
                color: "bg-primary-600" 
              },
              { 
                title: "Sessions Today", 
                value: "5", 
                icon: <Calendar className="h-5 w-5" />, 
                color: "bg-secondary-600" 
              },
              { 
                title: "Avg. Rating", 
                value: "4.8", 
                icon: <ChartBar className="h-5 w-5" />, 
                color: "bg-accent-600" 
              },
              { 
                title: "Pending Reviews", 
                value: "12", 
                icon: <MessageSquare className="h-5 w-5" />, 
                color: "bg-success-600" 
              }
            ].map((stat, index) => (
              <div 
                key={index}
                className={`${stat.color} text-white rounded-xl p-5 shadow-md`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <div className="bg-white/20 rounded-lg p-2">
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upcoming Sessions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 card p-6"
            >
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Upcoming Sessions</h2>
              <div className="space-y-4">
                {[
                  {
                    name: "Sarah Johnson",
                    time: "10:00 AM",
                    type: "Initial Consultation",
                    status: "Confirmed"
                  },
                  {
                    name: "Mike Chen",
                    time: "11:30 AM",
                    type: "Follow-up",
                    status: "Pending"
                  },
                  {
                    name: "Emily Davis",
                    time: "2:00 PM",
                    type: "Progress Review",
                    status: "Confirmed"
                  }
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-neutral-900">{session.name}</h3>
                        <p className="text-sm text-neutral-500">{session.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-neutral-900">{session.time}</p>
                      <span className={`text-sm ${
                        session.status === 'Confirmed' 
                          ? 'text-success-600' 
                          : 'text-warning-600'
                      }`}>
                        {session.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Client Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card p-6"
            >
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Client Progress</h2>
              <div className="space-y-4">
                {[
                  { name: "Sarah Johnson", progress: 80 },
                  { name: "Mike Chen", progress: 65 },
                  { name: "Emily Davis", progress: 90 }
                ].map((client, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-neutral-700">{client.name}</span>
                      <span className="text-sm text-neutral-500">{client.progress}%</span>
                    </div>
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary-600 rounded-full"
                        style={{ width: `${client.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="card p-6 mt-8"
          >
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Recent Activity</h2>
            <RecentActivity />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Regular User Dashboard
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