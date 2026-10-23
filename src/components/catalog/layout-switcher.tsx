"use client";

import { LayoutGrid, Grid3X3, Grid2X2 } from "lucide-react";

interface LayoutSwitcherProps {
  currentCols: number;
  onChange: (cols: number) => void;
}

export function LayoutSwitcher({ currentCols, onChange }: LayoutSwitcherProps) {
  return (
    <div className="flex items-center gap-1 bg-[#04241b] border border-[#064e3b] p-1 rounded-lg">
      <button
        onClick={() => onChange(2)}
        className={`p-1.5 rounded transition-colors ${
          currentCols === 2
            ? "bg-[#16a34a] text-white shadow-emerald"
            : "text-[#86efac]/70 hover:text-white"
        }`}
        title="2 Columns Grid"
        aria-label="2 Columns Layout"
      >
        <Grid2X2 className="w-4 h-4" />
      </button>

      <button
        onClick={() => onChange(3)}
        className={`p-1.5 rounded transition-colors ${
          currentCols === 3
            ? "bg-[#16a34a] text-white shadow-emerald"
            : "text-[#86efac]/70 hover:text-white"
        }`}
        title="3 Columns Grid"
        aria-label="3 Columns Layout"
      >
        <Grid3X3 className="w-4 h-4" />
      </button>

      <button
        onClick={() => onChange(4)}
        className={`p-1.5 rounded transition-colors ${
          currentCols === 4
            ? "bg-[#16a34a] text-white shadow-emerald"
            : "text-[#86efac]/70 hover:text-white"
        }`}
        title="4 Columns Grid"
        aria-label="4 Columns Layout"
      >
        <LayoutGrid className="w-4 h-4" />
      </button>
    </div>
  );
}
