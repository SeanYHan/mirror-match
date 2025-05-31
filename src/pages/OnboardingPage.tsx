import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import LanguageStep from '../components/onboarding/LanguageStep';
import DemographicsStep from '../components/onboarding/DemographicsStep';
import InterestsStep from '../components/onboarding/InterestsStep';
import AvatarCreationStep from '../components/onboarding/AvatarCreationStep';
import WelcomeStep from '../components/onboarding/WelcomeStep';

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, completeOnboarding, setAvatar } = useApp();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    language: 'English',
    age: 25,
    ethnicity: '',
    orientation: '',
    interests: [] as string[],
    avatar: ''
  });
  
  const steps = [
    { title: 'Welcome', component: WelcomeStep },
    { title: 'Language', component: LanguageStep },
    { title: 'Demographics', component: DemographicsStep },
    { title: 'Interests', component: InterestsStep },
    { title: 'Avatar Creation', component: AvatarCreationStep }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding and create user
      const newUser = {
        ...formData,
        skills: {
          communication: Math.floor(Math.random() * 5) + 3,
          confidence: Math.floor(Math.random() * 5) + 3,
          empathy: Math.floor(Math.random() * 5) + 3,
          complimenting: Math.floor(Math.random() * 5) + 3,
          listening: Math.floor(Math.random() * 5) + 3
        }
      };
      
      // Create avatar based on user preferences
      const newAvatar = {
        name: formData.interests.includes('anime') ? 'Haru' : 'Alex',
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name || 'mirror'}`,
        specialty: formData.interests[0] || 'conversation'
      };
      
      setUser(newUser);
      setAvatar(newAvatar);
      completeOnboarding();
      navigate('/dashboard');
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };
  
  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center p-4">
      <motion.div 
        className="bg-white rounded-2xl shadow-xl max-w-3xl w-full overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Progress indicator */}
        <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-neutral-900">Create Your Profile</h2>
            <div className="flex items-center">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`w-3 h-3 rounded-full mx-1 ${
                    index < currentStep 
                      ? 'bg-primary-600' 
                      : index === currentStep 
                        ? 'bg-primary-400'
                        : 'bg-neutral-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Step content */}
        <div className="p-6 md:p-8">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentStepComponent 
              formData={formData} 
              updateFormData={updateFormData} 
            />
          </motion.div>
        </div>
        
        {/* Navigation buttons */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex justify-between">
          <button
            onClick={handleBack}
            className={`btn flex items-center ${
              currentStep === 0 ? 'invisible' : 'btn-outline'
            }`}
          >
            <ArrowLeft size={16} className="mr-2" /> Back
          </button>
          
          <button
            onClick={handleNext}
            className="btn btn-primary flex items-center"
          >
            {currentStep === steps.length - 1 ? (
              <>Complete <Check size={16} className="ml-2" /></>
            ) : (
              <>Next <ArrowRight size={16} className="ml-2" /></>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingPage;