interface EmailIconProps {
  classes?: string;
}

export const EmailIcon = ({ classes }: EmailIconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={`${classes} stroke-accent fill-white`}
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        strokeWidth="2"
        strokeLinecap="round"
      ></rect>
      <path
        d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};
