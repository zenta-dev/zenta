"use client";

import { useState, type HTMLAttributes } from "react";
import { Button, Popover, PopoverContent, PopoverTrigger } from "./ui";

type ColorPickerProps = {
  value: string;
  onChange: (color: string) => void;
} & HTMLAttributes<HTMLDivElement>;

const highlightColors = {
  yellow: "#FFEB3B",
  green: "#CDDC39",
  blue: "#2196F3",
  red: "#F44336",
  purple: "#9C27B0",
  gray: "#9E9E9E",
  pink: "#E91E63",
  orange: "#FF9800",
  teal: "#009688",
  cyan: "#00BCD4",
};

export const ColorPicker = ({
  value,
  onChange,
  ...props
}: ColorPickerProps) => {
  const [color, setColor] = useState(value);

  return (
    <Popover {...props}>
      <PopoverTrigger>
        <Button type="button" style={{ backgroundColor: color }}>
          <span
            className="block rounded-full"
            style={{ backgroundColor: color }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="grid grid-cols-3 gap-1">
        {Object.entries(highlightColors).map(([color, value]) => (
          <Button
            key={color}
            onClick={() => {
              onChange(value);
              setColor(value);
            }}
            variant={value === color ? "default" : "ghost"}
            type="button"
            className={`bg-neutral-800 hover:bg-neutral-700`}
            style={{ backgroundColor: value }}
          >
            <span className={`bg-${color}-300 text-neutral-900`}>
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </span>
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
