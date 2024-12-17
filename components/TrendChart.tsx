import React from "react";
import { Card } from "@/components/ui/card";

interface TrendChartProps {
  data: { date: string; calories: number }[];
}

export default function TrendChart({ data }: TrendChartProps) {
  // 定义图表的尺寸
  const width = 400;
  const height = 200;
  const padding = 20;

  // 计算 x 和 y 坐标
  const maxCalories = Math.max(...data.map((d) => d.calories), 0);
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * (width - 2 * padding) + padding;
      const y = height - (d.calories / maxCalories) * (height - 2 * padding) - padding;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">Calorie Trends</h2>
      <div className="relative">
        <svg width={width} height={height} className="bg-gray-50 rounded">
          {/* 坐标轴 */}
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#ccc" />
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#ccc" />

          {/* 折线 */}
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            points={points}
          />

          {/* 数据点 */}
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * (width - 2 * padding) + padding;
            const y = height - (d.calories / maxCalories) * (height - 2 * padding) - padding;
            return (
              <circle key={i} cx={x} cy={y} r="4" fill="#3b82f6" />
            );
          })}
        </svg>

        {/* X 轴标签 */}
        <div className="absolute bottom-0 left-0 w-full flex justify-between px-4">
          {data.map((d, i) => (
            <span key={i} className="text-xs text-gray-600">
              {d.date}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
