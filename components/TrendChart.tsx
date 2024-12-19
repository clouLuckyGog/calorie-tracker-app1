import React from "react";

interface TrendChartProps {
  title: string;
  data: { date: string; calories: number }[];
}

export default function TrendChart({ title, data }: TrendChartProps) {
  const width = 400;
  const height = 200;

  const maxCalories = Math.max(...data.map((d) => d.calories), 0);
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - (d.calories / maxCalories) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <svg
        className="w-full h-auto"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <polyline
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          points={points}
        />
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * width;
          const y = height - (d.calories / maxCalories) * height;
          return <circle key={i} cx={x} cy={y} r="4" fill="#3b82f6" />;
        })}
      </svg>
    </div>
  );
}
