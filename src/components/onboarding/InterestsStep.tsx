import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface InterestsStepProps {
  formData: any;
  updateFormData: (key: string, value: any) => void;
}

const InterestsStep: React.FC<InterestsStepProps> = ({ formData, updateFormData }) => {
  const interestCategories = {
    'Music': ['Rock', 'Pop', 'Hip-hop', 'Jazz', 'Classical', 'Electronic', 'Country'],
    'Movies': ['Action', 'Comedy', 'Drama', 'Sci-fi', 'Horror', 'Documentary', 'Anime'],
    'Activities': ['Hiking', 'Cooking', 'Reading', 'Gaming', 'Fitness', 'Travel', 'Art'],
    'Sports': ['Basketball', 'Soccer', 'Tennis', 'Swimming', 'Yoga', 'Running', 'Cycling']
  };
  
  const toggleInterest = (interest: string) => {
    const currentInterests = [...formData.interests];
    
    if (currentInterests.includes(interest)) {
      // Remove interest
      updateFormData('interests', currentInterests.filter(i => i !== interest));
    } else {
      // Add interest
      updateFormData('interests', [...currentInterests, interest]);
    }
  };

  return (
    <div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6"
      >
        <Heart className="h-8 w-8 text-primary-600" />
      </motion.div>
      
      <h2 className="text-2xl font-bold text-neutral-900 mb-3 text-center">Your Interests</h2>
      <p className="text-neutral-600 mb-8 text-center">
        Select the things you enjoy. This helps your avatar coach connect with you.
      </p>
      
      <div className="space-y-6">
        {Object.entries(interestCategories).map(([category, interests]) => (
          <div key={category}>
            <h3 className="text-lg font-medium text-neutral-800 mb-2">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {interests.map(interest => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    formData.interests.includes(interest)
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <p className="text-sm text-neutral-500">
          Selected: {formData.interests.length ? formData.interests.join(', ') : 'None yet'}
        </p>
      </div>
    </div>
  );
};

export default InterestsStep;