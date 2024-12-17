"use client";
import { useState } from "react";
import Header from "@/components/Header";
import InputForm from "@/components/InputForm";
import TrendChart from "@/components/TrendChart";
import SummaryCard from "@/components/SummaryCard";

interface Entry {
  food: string;
  calories: number;
  time: Date;
  date: string;
}

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([]);

  const addEntry = (entry: { food: string; calories: number; time: Date }) => {
    setEntries([
      ...entries,
      { ...entry, date: entry.time.toLocaleDateString() },
    ]);
  };

  const totalCalories = entries.reduce((sum, entry) => sum + entry.calories, 0);
  const averageCalories = entries.length
    ? Math.round(totalCalories / entries.length)
    : 0;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-6 grid gap-6 grid-cols-1 md:grid-cols-2">
        <InputForm onAddEntry={addEntry} />
        <SummaryCard totalCalories={totalCalories} averageCalories={averageCalories} />
        <div className="md:col-span-2">
          <TrendChart data={entries.map((entry) => ({
            date: entry.date,
            calories: entry.calories,
          }))} />
        </div>
      </main>
    </div>
  );
}
