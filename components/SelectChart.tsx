import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectProps {
  onChange: (value: "day" | "week" | "month") => void;
}

export function SelectScrollable({ onChange }: SelectProps) {
  return (
    <Select
      onValueChange={(value: "day" | "week" | "month") => onChange(value)}
    >
      <SelectTrigger className="w-1/4 absolute right-3 top-3 backdrop-blur-sm">
        <SelectValue placeholder="表示別" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="day">日</SelectItem>
          <SelectItem value="week">週</SelectItem>
          <SelectItem value="month">月</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
