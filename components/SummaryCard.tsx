interface SummaryCardProps {
  title: string;
  value: string | number;
  unit?: string;
  highlightColor?: string;
}

export default function SummaryCard({
  title,
  value,
  unit,
  highlightColor,
}: SummaryCardProps) {
  return (
    <div
      className={`relative p-4 rounded-lg shadow-md bg-white ${
        highlightColor ? `border-t-4 border-${highlightColor}` : ""
      }`}
    >
      <h2 className="text-lg font-semibold text-indigo-400">{title}</h2>
      <div className="text-xl font-bold text-gray-900 flex items-baseline">
        <span>{value}</span>
        {unit && <span className="ml-1 text-sm text-gray-500">{unit}</span>}
      </div>
    </div>
  );
}
