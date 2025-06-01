import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReviewer } from '../context/ReviewerContext';

const FeedbackCompletePage: React.FC = () => {
  const navigate = useNavigate();
  const { isReviewerMode, toggleReviewerMode } = useReviewer();

  const handleReturnHome = () => {
    if (isReviewerMode) {
      toggleReviewerMode();
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-8 text-center space-y-6">
          <motion.div 
            className="mx-auto w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              Thank You for Your Feedback!
            </h1>
            <p className="text-lg text-neutral-600 mb-8">
              Your feedback has been submitted successfully. Your insights will help someone improve their dating skills and build better relationships.
            </p>
          </motion.div>

          <motion.button
            onClick={handleReturnHome}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Return to Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default FeedbackCompletePage; 