import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for our context
type UserProfile = {
  name: string;
  language: string;
  age: number;
  ethnicity: string;
  orientation: string;
  interests: string[];
  avatar: string;
  isDatingCoach: boolean;
  skills: {
    communication: number;
    confidence: number;
    empathy: number;
    complimenting: number;
    listening: number;
  };
};

type AvatarCoach = {
  name: string;
  image: string;
  specialty: string;
};

type AppContextType = {
  user: UserProfile | null;
  setUser: (user: UserProfile) => void;
  avatar: AvatarCoach | null;
  setAvatar: (avatar: AvatarCoach) => void;
  chatHistory: Array<{ sender: 'user' | 'avatar'; message: string; timestamp: Date }>;
  addMessage: (sender: 'user' | 'avatar', message: string) => void;
  isOnboarded: boolean;
  completeOnboarding: () => void;
  toggleDatingCoach: () => void;
};

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [avatar, setAvatar] = useState<AvatarCoach | null>(null);
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'avatar'; message: string; timestamp: Date }>>([]);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAvatar = localStorage.getItem('avatar');
    const storedChatHistory = localStorage.getItem('chatHistory');
    const storedOnboardingStatus = localStorage.getItem('isOnboarded');
    
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedAvatar) setAvatar(JSON.parse(storedAvatar));
    if (storedChatHistory) setChatHistory(JSON.parse(storedChatHistory));
    if (storedOnboardingStatus) setIsOnboarded(JSON.parse(storedOnboardingStatus));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    if (avatar) localStorage.setItem('avatar', JSON.stringify(avatar));
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    localStorage.setItem('isOnboarded', JSON.stringify(isOnboarded));
  }, [user, avatar, chatHistory, isOnboarded]);

  // Function to add a new message to chat history
  const addMessage = (sender: 'user' | 'avatar', message: string) => {
    setChatHistory(prev => [...prev, { sender, message, timestamp: new Date() }]);
  };

  // Function to complete onboarding
  const completeOnboarding = () => {
    setIsOnboarded(true);
  };

  // Function to toggle dating coach status
  const toggleDatingCoach = () => {
    if (user) {
      setUser({
        ...user,
        isDatingCoach: !user.isDatingCoach
      });
    }
  };

  // Context value
  const value = {
    user,
    setUser,
    avatar,
    setAvatar,
    chatHistory,
    addMessage,
    isOnboarded,
    completeOnboarding,
    toggleDatingCoach
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};