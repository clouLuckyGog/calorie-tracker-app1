import React from "react";

export default function Calendar() {
  const today = new Date();
  const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
  const weekDates = [];

  // 今日の曜日
  const currentDay = today.getDay();

  // 今週の曜日と日付を計算
  for (let i = 0; i < 7; i++) {
    const weekDate = new Date(today);
    weekDate.setDate(today.getDate() - currentDay + i);

    const formattedDate = `${String(weekDate.getDate()).padStart(2, "0")}`;
    weekDates.push({
      day: dayNames[weekDate.getDay()],
      date: formattedDate,
      isToday: today.toDateString() === weekDate.toDateString(), // 今日と一致するか
    });
  }

  return (
    <div
      className={`relative bg-white py-6 px-4 rounded-lg shadow-md ${
        weekDates.some((item) => item.isToday)
          ? "before:bg-indigo-400"
          : "before:bg-transparent"
      } before:absolute before:inset-0 before:rounded-lg before:z-[-1]`}
    >
      {/* 曜日 */}
      <div className="grid grid-cols-7 gap-4 sm:gap-6 md:gap-8 lg:gap-20 w-full md:max-w-md lg:max-w-lg">
        {weekDates.map((item, index) => (
          <span
            key={`day-${index}`}
            className="text-center font-bold text-xl md:text-base text-gray-400"
          >
            {item.day}
          </span>
        ))}
      </div>

      {/* 日付 */}
      <div className="grid grid-cols-7 gap-4 sm:gap-6 md:gap-8 lg:gap-20 w-full md:max-w-md lg:max-w-lg mt-4">
        {weekDates.map((item, index) => (
          <span
            key={`date-${index}`}
            className="text-center font-bold text-xl md:text-base text-indigo-400"
          >
            {item.date}
          </span>
        ))}
      </div>
    </div>
  );
}
