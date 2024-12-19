"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface InputFormProps {
  onAddEntry: (entry: { calories: number; time: Date }) => void;
}

export default function InputForm({ onAddEntry }: InputFormProps) {
  const [setFood] = useState("");
  const [calories, setCalories] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (calories) {
      onAddEntry({ calories: parseInt(calories), time: new Date() });
      setCalories("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-bold">Add Food Entry</h2>
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
