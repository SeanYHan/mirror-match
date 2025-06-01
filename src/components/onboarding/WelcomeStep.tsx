import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface WelcomeStepProps {
  formData: any;
  updateFormData: (key: string, value: any) => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({
  formData,
  updateFormData,
}) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData("name", e.target.value);
  };

  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6"
      >
        <Heart className="h-8 w-8 text-primary-600" />
      </motion.div>

      <h1 className="text-2xl font-bold text-neutral-900 mb-3">
        Welcome to IntroSpark
      </h1>
      <p className="text-neutral-600 mb-8">
        Let's set up your profile to create a personalized dating coach just for
        you.
      </p>

      <div className="max-w-md mx-auto">
        <label htmlFor="name" className="input-label text-left">
          What's your name?
        </label>
        <input
          type="text"
          id="name"
          className="form-input"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleNameChange}
        />
        <p className="text-neutral-500 text-sm mt-2 text-left">
          This helps us personalize your experience.
        </p>
      </div>
    </div>
  );
};

export default WelcomeStep;
