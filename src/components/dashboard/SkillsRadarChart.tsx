import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';

interface SkillsRadarChartProps {
  skills: {
    communication: number;
    confidence: number;
    empathy: number;
    complimenting: number;
    listening: number;
  };
}

const SkillsRadarChart: React.FC<SkillsRadarChartProps> = ({ skills }) => {
  // Convert skills object to array format for chart
  const data = [
    { subject: 'Communication', value: skills.communication, fullMark: 10 },
    { subject: 'Confidence', value: skills.confidence, fullMark: 10 },
    { subject: 'Empathy', value: skills.empathy, fullMark: 10 },
    { subject: 'Complimenting', value: skills.complimenting, fullMark: 10 },
    { subject: 'Listening', value: skills.listening, fullMark: 10 }
  ];

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#525252' }} />
          <PolarRadiusAxis angle={30} domain={[0, 10]} />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="#7C3AED"
            fill="#7C3AED"
            fillOpacity={0.6}
          />
          <Tooltip formatter={(value) => [`${value}/10`, 'Skill Level']} />
        </RadarChart>
      </ResponsiveContainer>
      
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4">
        {data.map((skill) => (
          <div key={skill.subject} className="text-center">
            <p className="text-xs font-medium text-neutral-700">{skill.subject}</p>
            <div className="flex items-center justify-center mt-1">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-xs font-semibold text-primary-700">{skill.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-sm text-neutral-500 mt-4">
        The radar chart shows your current skill levels based on interactions.
      </p>
    </div>
  );
};

export default SkillsRadarChart;