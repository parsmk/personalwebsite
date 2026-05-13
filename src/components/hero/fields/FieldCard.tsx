import type React from "react";

export enum FieldCardPos {
  LEFT = "left-3 top-1/2 -translate-y-1/2",
  RIGHT = "right-3 top-1/2 -translate-y-1/2",
  TOP = "top-3 left-1/2 -translate-x-1/2",
  BOTTOM = "bottom-3 left-1/2 -translate-x-1/2",
}

type FieldCardProps = {
  children: React.ReactNode;
  direction?: "row" | "col";
  pos?: FieldCardPos;
};

export const FieldCard = ({
  children,
  pos,
  direction = "col",
}: FieldCardProps) => {
  return (
    <div
      className={`
        flex flex-${direction} gap-3
        absolute ${pos} p-5 ${direction === "col" ? "max-w-[15%]" : "max-h-[10%]"}
        rounded-xl bg-white/40 outline outline-black/30
        transition-all group hover:bg-white/50 hover:outline-black/40
      `}
    >
      {children}
    </div>
  );
};
