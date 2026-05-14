import type { MouseEventHandler } from "react";

type NoiseModePillsProps = {
  label: string;
  active?: boolean;
  onClick?: MouseEventHandler;
};

export const NoiseModePill = ({
  label,
  active,
  onClick,
}: NoiseModePillsProps) => {
  return (
    <div
      className={`
        cursor-pointer
        px-4 py-2 rounded-md text-center font-medium
        ${active ? "bg-primary text-accent" : "bg-none"} hover:bg-primary hover:text-accent transition-all duration-300
      `}
      onClick={onClick}
    >
      {label}
    </div>
  );
};
