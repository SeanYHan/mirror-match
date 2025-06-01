import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Sample data for the charts
const ageData = [
  { name: "18-25", value: 32 },
  { name: "26-35", value: 45 },
  { name: "36-45", value: 18 },
  { name: "46+", value: 5 },
];

const orientationData = [
  { name: "Straight", value: 58 },
  { name: "Gay/Lesbian", value: 12 },
  { name: "Bi/Pan", value: 24 },
  { name: "Other", value: 6 },
];

const ethnicityData = [
  { name: "Asian", value: 18 },
  { name: "Black", value: 15 },
  { name: "Hispanic", value: 12 },
  { name: "White", value: 47 },
  { name: "Other", value: 8 },
];

const COLORS = [
  "#7C3AED",
  "#EC4899",
  "#14B8A6",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
];

const DemographicsChart: React.FC = () => {
  const [activeChart, setActiveChart] = useState<
    "age" | "orientation" | "ethnicity"
  >("age");

  const renderChart = () => {
    switch (activeChart) {
      case "age":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={ageData}
              margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
              <Bar dataKey="value" fill="#7C3AED">
                {ageData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case "orientation":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orientationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {orientationData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
            </PieChart>
          </ResponsiveContainer>
        );

      case "ethnicity":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={ethnicityData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
            >
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
              <Bar dataKey="value" fill="#7C3AED">
                {ethnicityData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        {[
          { id: "age", label: "Age Distribution" },
          { id: "orientation", label: "Orientation" },
          { id: "ethnicity", label: "Ethnicity" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveChart(tab.id as any)}
            className={`px-3 py-1.5 text-sm rounded-lg font-medium ${
              activeChart === tab.id
                ? "bg-primary-100 text-primary-700"
                : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {renderChart()}

      <p className="text-sm text-neutral-500 mt-4">
        Data shown represents aggregate demographics of Boston-area IntroSpark
        users.
      </p>
    </div>
  );
};

export default DemographicsChart;
