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

type UserMode = 'user' | 'coach' | 'reviewer';

type AppContextType = {
  user: UserProfile | null;
  setUser: (user: UserProfile) => void;
  avatar: AvatarCoach | null;
  setAvatar: (avatar: AvatarCoach) => void;
  chatHistory: Array<{ sender: 'user' | 'avatar'; message: string; timestamp: Date }>;
  addMessage: (sender: 'user' | 'avatar', message: string) => void;
  isOnboarded: boolean;
  completeOnboarding: () => void;
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
};

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [avatar, setAvatar] = useState<AvatarCoach | null>(null);
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'avatar'; message: string; timestamp: Date }>>([]);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  const [userMode, setUserMode] = useState<UserMode>('user');

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAvatar = localStorage.getItem('avatar');
    const storedChatHistory = localStorage.getItem('chatHistory');
    const storedOnboardingStatus = localStorage.getItem('isOnboarded');
    const storedUserMode = localStorage.getItem('userMode');
    
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedAvatar) setAvatar(JSON.parse(storedAvatar));
    if (storedChatHistory) setChatHistory(JSON.parse(storedChatHistory));
    if (storedOnboardingStatus) setIsOnboarded(JSON.parse(storedOnboardingStatus));
    if (storedUserMode) setUserMode(storedUserMode as UserMode);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    if (avatar) localStorage.setItem('avatar', JSON.stringify(avatar));
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    localStorage.setItem('isOnboarded', JSON.stringify(isOnboarded));
    localStorage.setItem('userMode', userMode);
  }, [user, avatar, chatHistory, isOnboarded, userMode]);

  // Function to add a new message to chat history
  const addMessage = (sender: 'user' | 'avatar', message: string) => {
    setChatHistory(prev => [...prev, { sender, message, timestamp: new Date() }]);
  };

  // Function to complete onboarding
  const completeOnboarding = () => {
    setIsOnboarded(true);
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
    userMode,
    setUserMode
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