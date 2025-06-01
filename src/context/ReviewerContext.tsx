import React, { createContext, useContext, useState } from 'react';

interface ReviewerContextType {
  isReviewerMode: boolean;
  toggleReviewerMode: () => void;
  isCoachMode: boolean;
  toggleCoachMode: () => void;
}

const ReviewerContext = createContext<ReviewerContextType | undefined>(undefined);

export const ReviewerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReviewerMode, setIsReviewerMode] = useState(false);
  const [isCoachMode, setIsCoachMode] = useState(false);

  const toggleReviewerMode = () => {
    setIsReviewerMode(prev => !prev);
    if (isCoachMode) setIsCoachMode(false);
  };

  const toggleCoachMode = () => {
    setIsCoachMode(prev => !prev);
    if (isReviewerMode) setIsReviewerMode(false);
  };

  return (
    <ReviewerContext.Provider value={{ isReviewerMode, toggleReviewerMode, isCoachMode, toggleCoachMode }}>
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