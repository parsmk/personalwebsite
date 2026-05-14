import type { MouseEventHandler } from "react";
import { Spinner } from "../svgs/Spinner";

export type ButtonVariants = "primary" | "secondary" | "outline";

type ButtonProps = {
  children?: React.ReactNode;
  active?: boolean;
  isPending?: boolean;
  variant?: ButtonVariants;
  type?: "submit" | "reset" | "button" | undefined;
  fullWidth?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({
  children,
  active,
  isPending,
  variant = "primary",
  type = "button",
  fullWidth,
  onClick,
}: ButtonProps) => {
  const variantClasses: Record<ButtonVariants, string> = {
    primary:
      "text-white outline-accent/50 bg-primary/75 transition duration-300",
    secondary:
      "text-white outline-accent/50 bg-secondary/75 transition duration-300",
    outline: "outline-accent/50 text-accent/50 transition duration-300",
  };

  const hoverClasses: Record<ButtonVariants, string> = {
    primary: "hover:outline-accent/60 hover:bg-primary",
    secondary: "hover:outline-accent/60 hover:bg-secondary",
    outline:
      "hover:outline-accent/80 hover:text-accent/85 hover:bg-secondary/30",
  };

  const activeClasses: Record<ButtonVariants, string> = {
    primary: "outline-accent/60 bg-primary",
    secondary: "outline-accent/60 bg-secondary",
    outline: "outline-accent/80 text-accent/85 bg-secondary/30",
  };

  const pendingCX = isPending ? "cursor-not-allowed" : "cursor-pointer";

  const activeCX = active ? `${activeClasses[variant]} cursor-events-none` : "";

  return (
    <button
      className={`
        flex h-[3rem] items-center justify-center p-3 rounded-xl ${fullWidth ? "w-full" : ""}
        outline-1 shrink-0 
        ${variantClasses[variant]} ${!isPending && !active ? hoverClasses[variant] : ""} ${pendingCX} ${activeCX}
      `}
      disabled={isPending}
      type={type}
      onClick={onClick}
    >
      {isPending ? <Spinner classes="size-5 text-accent" /> : children}
    </button>
  );
};
