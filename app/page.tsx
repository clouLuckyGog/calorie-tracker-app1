"use client";
import { useState, useEffect } from "react";
import TrendChart from "@/components/TrendChart";
import SummaryCard from "@/components/SummaryCard";
import Calendar from "@/components/Calendar";
import { SelectScrollable } from "@/components/SelectChart";
import ExpandableToolbar from "@/components/ToolBar";
import { supabase } from "@/lib/supabaseClient";

interface Entry {
  calories: number;
  time: Date;
  date: string;
}

interface User {
  user_id: string;
  username: string;
}

export default function Page() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [chartType, setChartType] = useState<"day" | "week" | "month">("day");

  useEffect(() => {
    if (user) {
      fetchCalories();
    }
  }, [user]);

  const fetchCalories = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("calorie_entries")
      .select("*")
      .eq("user_id", user.user_id);

    if (error) {
      console.error("Error fetching calories:", error.message);
      return;
    }

    setEntries(
      data.map((entry: any) => ({
        calories: entry.calories,
        time: new Date(entry.date),
        date: entry.date,
      }))
    );
  };

  const handleLogin = async (loginInfo: {
    username: string;
    password: string;
  }) => {
    const { data, error } = await supabase
      .from("users_m")
      .select("*")
      .eq("username", loginInfo.username)
      .eq("password", loginInfo.password)
      .single();

    if (error || !data) {
      console.error("Login failed: Invalid username or password");
      alert("Invalid username or password");
      return;
    }

    console.log("Login successful:", data);
    setUser({ user_id: data.user_id, username: data.username });
  };

  const handleSignUp = async (signUpInfo: {
    username: string;
    password: string;
  }) => {
    const { data, error } = await supabase.from("users_m").insert([
      {
        user_id: crypto.randomUUID(),
        username: signUpInfo.username,
        password: signUpInfo.password,
      },
    ]);

    if (error) {
      console.error("SignUp error:", error.message);
      return;
    }

    console.log("SignUp successful:", data);
    alert("Account created successfully! Please log in.");
  };

  const handleLogout = () => {
    setUser(null);
    setEntries([]);
  };

  const handleCaloriesEntry = async (entry: {
    calories: number;
    time: Date;
  }) => {
    if (!user) {
      alert("Please log in to add calorie entries.");
      return;
    }

    const { error } = await supabase.from("calorie_entries").insert([
      {
        user_id: user.user_id,
        date: entry.time.toISOString().split("T")[0],
        calories: entry.calories,
      },
    ]);

    if (error) {
      console.error("Error adding calorie entry:", error.message);
      return;
    }

    setEntries([
      ...entries,
      {
        calories: entry.calories,
        time: entry.time,
        date: entry.time.toLocaleDateString(),
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="text-center py-4 bg-blue-500 text-white">
        <h1 className="text-2xl font-bold">Calorie Tracker</h1>
      </header>

      <main className="container mx-auto p-6 grid gap-6 grid-cols-1">
        <Calendar />
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard
            title="今日摂取"
            value={`${entries.reduce((sum, e) => sum + e.calories, 0)}`}
            unit="kcal"
          />
          <SummaryCard title="今日増減量" value={`+200`} unit="kcal" />
          <SummaryCard title="週増減" value={`-500`} unit="kcal" />
          <SummaryCard title="月増減" value={`+1000`} unit="kcal" />
        </div>

        <div className="relative">
          <SelectScrollable onChange={setChartType} />
          {chartType && (
            <TrendChart
              data={
                chartType === "day"
                  ? entries.map((entry) => ({
                      date: entry.date,
                      calories: entry.calories,
                    }))
                  : chartType === "week"
                  ? entries.map((entry) => ({
                      date: entry.date,
                      calories: entry.calories,
                    }))
                  : entries.map((entry) => ({
                      date: entry.date,
                      calories: entry.calories,
                    }))
              }
              title={
                chartType === "day"
                  ? "今日"
                  : chartType === "week"
                  ? "今週"
                  : "今月"
              }
            />
          )}
        </div>
      </main>

      <ExpandableToolbar
        user={user}
        onLogin={handleLogin}
        onSignUp={handleSignUp}
        onLogout={handleLogout}
        onCaloriesEntry={handleCaloriesEntry}
      />
    </div>
  );
}
