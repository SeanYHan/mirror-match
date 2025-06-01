import React from 'react';

const CoachMatchBridge: React.FC = () => {
  return (
    <div className="w-full h-full">
      <iframe
        src="http://localhost:5000"
        className="w-full h-[calc(100vh-4rem)]"
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default CoachMatchBridge; 