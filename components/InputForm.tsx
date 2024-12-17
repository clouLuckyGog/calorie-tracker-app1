"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface InputFormProps {
  onAddEntry: (entry: { food: string; calories: number; time: Date }) => void;
}

export default function InputForm({ onAddEntry }: InputFormProps) {
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (food && calories) {
      onAddEntry({ food, calories: parseInt(calories), time: new Date() });
      setFood("");
      setCalories("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-bold">Add Food Entry</h2>
      <Input
        placeholder="Food Name"
        value={food}
        onChange={(e) => setFood(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Calories"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
      />
      <Button type="submit" className="w-full">
        Add Entry
      </Button>
    </form>
  );
}
