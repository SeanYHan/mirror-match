import React, { createContext, useContext, useState } from 'react';

interface ReviewerContextType {
  isReviewerMode: boolean;
  toggleReviewerMode: () => void;
}

const ReviewerContext = createContext<ReviewerContextType | undefined>(undefined);

export const ReviewerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReviewerMode, setIsReviewerMode] = useState(false);

  const toggleReviewerMode = () => {
    setIsReviewerMode(prev => !prev);
  };

  return (
    <ReviewerContext.Provider value={{ isReviewerMode, toggleReviewerMode }}>
      {children}
    </ReviewerContext.Provider>
  );
};

export const useReviewer = () => {
  const context = useContext(ReviewerContext);
  if (context === undefined) {
    throw new Error('useReviewer must be used within a ReviewerProvider');
  }
  return context;
}; 