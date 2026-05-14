type NoiseModePillsProps = {
  label: string;
  active?: boolean;
};

export const NoiseModePill = ({ label, active }: NoiseModePillsProps) => {
  return (
    <div
      className={`
        px-4 py-2 rounded-md text-center font-medium
        ${active ? "bg-primary text-accent" : "bg-none"} hover:bg-primary hover:text-accent transition-all duration-300
      `}
    >
      {label}
    </div>
  );
};
