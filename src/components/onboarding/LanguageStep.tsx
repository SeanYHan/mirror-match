import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

interface LanguageStepProps {
  formData: any;
  updateFormData: (key: string, value: any) => void;
}

const LanguageStep: React.FC<LanguageStepProps> = ({ formData, updateFormData }) => {
  const languages = [
    'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Korean'
  ];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFormData('language', e.target.value);
  };

  return (
    <div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6"
      >
        <Globe className="h-8 w-8 text-primary-600" />
      </motion.div>
      
      <h2 className="text-2xl font-bold text-neutral-900 mb-3 text-center">Select Your Preferred Language</h2>
      <p className="text-neutral-600 mb-8 text-center">
        We'll use this to personalize your coaching experience.
      </p>
      
      <div className="max-w-md mx-auto">
        <label htmlFor="language" className="input-label">
          Preferred Language
        </label>
        <select
          id="language"
          className="form-input"
          value={formData.language}
          onChange={handleLanguageChange}
        >
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
        <p className="text-neutral-500 text-sm mt-2">
          Your avatar coach will communicate with you in this language.
        </p>
      </div>
    </div>
  );
};

export default LanguageStep;