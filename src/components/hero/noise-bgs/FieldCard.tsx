import type React from "react";

export const FieldCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`
        absolute w-[15%] top-1/2 -translate-y-1/2 p-5
        rounded-xl bg-white/40 outline outline-black/30
        transition-all group hover:bg-white/50 hover:outline-black/40
      `}
    >
      {children}
    </div>
  );
};
