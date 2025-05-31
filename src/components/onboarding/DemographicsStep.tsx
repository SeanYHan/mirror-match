import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

interface DemographicsStepProps {
  formData: any;
  updateFormData: (key: string, value: any) => void;
}

const DemographicsStep: React.FC<DemographicsStepProps> = ({ formData, updateFormData }) => {
  const ethnicities = [
    'Asian', 'Black/African', 'Hispanic/Latino', 'Middle Eastern', 'White/Caucasian', 'Mixed', 'Other', 'Prefer not to say'
  ];
  
  const orientations = [
    'Straight', 'Gay', 'Lesbian', 'Bisexual', 'Pansexual', 'Asexual', 'Other', 'Prefer not to say'
  ];

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
      
      <h2 className="text-2xl font-bold text-neutral-900 mb-3 text-center">About You</h2>
      <p className="text-neutral-600 mb-8 text-center">
        This information helps us tailor your experience. All fields are optional.
      </p>
      
      <div className="space-y-6 max-w-md mx-auto">
        <div>
          <label htmlFor="age" className="input-label">
            Age
          </label>
          <div className="flex items-center">
            <input
              type="range"
              id="age"
              min="18"
              max="80"
              value={formData.age}
              onChange={(e) => updateFormData('age', parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="ml-3 text-neutral-700 min-w-[30px]">{formData.age}</span>
          </div>
        </div>
        
        <div>
          <label htmlFor="ethnicity" className="input-label">
            Ethnicity
          </label>
          <select
            id="ethnicity"
            className="form-input"
            value={formData.ethnicity}
            onChange={(e) => updateFormData('ethnicity', e.target.value)}
          >
            <option value="">Select ethnicity (optional)</option>
            {ethnicities.map((ethnicity) => (
              <option key={ethnicity} value={ethnicity}>
                {ethnicity}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="orientation" className="input-label">
            Sexual Orientation
          </label>
          <select
            id="orientation"
            className="form-input"
            value={formData.orientation}
            onChange={(e) => updateFormData('orientation', e.target.value)}
          >
            <option value="">Select orientation (optional)</option>
            {orientations.map((orientation) => (
              <option key={orientation} value={orientation}>
                {orientation}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DemographicsStep;