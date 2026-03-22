import { Spinner } from "../svgs/Spinner";

export type ButtonVariants = "primary" | "secondary" | "outline";

type ButtonProps = {
  children?: React.ReactNode;
  isPending?: boolean;
  variant?: ButtonVariants;
  type?: "submit" | "reset" | "button" | undefined;
};

export const Button = ({
  children,
  isPending,
  variant = "primary",
  type = "submit",
}: ButtonProps) => {
  const variantClasses: Record<ButtonVariants, string> = {
    primary:
      "text-white outline-accent/50 bg-primary/75 transition duration-300",
    secondary:
      "text-white outline-accent/50 bg-secondary/75 transition duration-300",
    outline: "outline-accent/50 text-accent/50 transition duration-300",
  };
  const activeClasses: Record<ButtonVariants, string> = {
    primary: "hover:outline-accent/60 hover:bg-primary",
    secondary: "hover:outline-accent/60 hover:bg-secondary",
    outline:
      "hover:outline-accent/80 hover:text-accent/85 hover:bg-secondary/30",
  };

  return (
    <button
      className={`
        flex h-[3rem] w-[10rem] justify-center p-3 rounded-xl 
        outline-1 shrink-0 
        ${variantClasses[variant]} ${!isPending && activeClasses[variant]} ${isPending ? "cursor-not-allowed" : "cursor-pointer"}
      `}
      disabled={isPending}
      type={type}
    >
      {isPending ? <Spinner classes="size-5 text-accent" /> : children}
    </button>
  );
};
