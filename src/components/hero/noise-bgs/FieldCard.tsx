import type React from "react";

export const FieldCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`
      absolute w-[12%] left-3 top-1/2 -translate-y-1/2 p-5
      rounded-xl bg-primary/20 outline outline-accent/30
      transition-all hover:bg-primary/30 hover:outline-accent/40
    `}
    >
      {children}
    </div>
  );
};
