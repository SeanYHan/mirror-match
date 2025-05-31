import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, User } from 'lucide-react';

interface AvatarCreationStepProps {
  formData: any;
  updateFormData: (key: string, value: any) => void;
}

const AvatarCreationStep: React.FC<AvatarCreationStepProps> = ({ formData, updateFormData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [avatarOptions, setAvatarOptions] = useState<string[]>([]);
  
  // Generate avatars when component mounts
  useEffect(() => {
    generateAvatars();
  }, []);
  
  const generateAvatars = () => {
    setIsGenerating(true);
    
    // Generate random seeds for the avatars
    const seeds = Array(4).fill(0).map(() => Math.random().toString(36).substring(2, 10));
    
    // Create avatar URLs
    const avatars = seeds.map(seed => 
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`
    );
    
    setAvatarOptions(avatars);
    
    // If no avatar is selected yet, select the first one
    if (!formData.avatar) {
      updateFormData('avatar', avatars[0]);
    }
    
    setTimeout(() => setIsGenerating(false), 800);
  };
  
  const selectAvatar = (avatar: string) => {
    updateFormData('avatar', avatar);
  };

  return (
    <div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6"
      >
        <User className="h-8 w-8 text-primary-600" />
      </motion.div>
      
      <h2 className="text-2xl font-bold text-neutral-900 mb-3 text-center">Create Your Avatar</h2>
      <p className="text-neutral-600 mb-8 text-center">
        This will be how you appear in the app. Choose one that represents you!
      </p>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {isGenerating ? (
            // Loading state
            Array(4).fill(0).map((_, i) => (
              <div 
                key={i} 
                className="aspect-square bg-neutral-100 rounded-lg animate-pulse flex items-center justify-center"
              >
                <User className="h-12 w-12 text-neutral-300" />
              </div>
            ))
          ) : (
            // Avatar options
            avatarOptions.map((avatar, index) => (
              <button
                key={index}
                onClick={() => selectAvatar(avatar)}
                className={`aspect-square rounded-lg p-2 transition-all ${
                  formData.avatar === avatar
                    ? 'bg-primary-100 ring-2 ring-primary-500 ring-offset-2'
                    : 'bg-neutral-50 hover:bg-neutral-100'
                }`}
              >
                <img src={avatar} alt={`Avatar option ${index + 1}`} className="w-full h-full" />
              </button>
            ))
          )}
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={generateAvatars}
            className="btn btn-outline flex items-center"
            disabled={isGenerating}
          >
            <RefreshCw size={16} className={`mr-2 ${isGenerating ? 'animate-spin' : ''}`} /> 
            Generate New Options
          </button>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-neutral-500">
          These avatars are generated based on your profile information.
        </p>
      </div>
    </div>
  );
};

export default AvatarCreationStep;