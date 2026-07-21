import type { IconProps } from "./IconProps";

export const Spinner = ({ className, onClick }: IconProps) => {
  return (
    <span
      className={`inline-block rounded-full border-2 border-current border-t-transparent animate-spin ${className}`}
      onClick={onClick}
    />
  );
};
