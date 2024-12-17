import { Card } from "@/components/ui/card";

interface SummaryCardProps {
  totalCalories: number;
  averageCalories: number;
}

export default function SummaryCard({ totalCalories, averageCalories }: SummaryCardProps) {
  return (
    <Card className="p-4 text-center">
      <h2 className="text-lg font-bold mb-2">Weekly Summary</h2>
      <p>Total Calories: {totalCalories}</p>
      <p>Average Calories: {averageCalories}</p>
    </Card>
  );
}
