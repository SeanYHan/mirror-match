import React from "react";
import { Heart, Github } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-neutral-200 py-6 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-sm text-neutral-600">
              © {new Date().getFullYear()} IntroSpark. All rights reserved.
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              A Boston-focused dating app for personal growth.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-neutral-600 hover:text-primary-600 transition-colors"
            >
              <Heart size={20} />
            </a>
            <a
              href="#"
              className="text-neutral-600 hover:text-primary-600 transition-colors"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
