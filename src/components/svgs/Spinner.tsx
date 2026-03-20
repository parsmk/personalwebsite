interface SpinnerProps {
  classes?: string;
}

export const Spinner = ({ classes }: SpinnerProps) => {
  return (
    <span
      className={`inline-block rounded-full border-2 border-current border-t-transparent animate-spin ${classes}`}
    />
  );
};
