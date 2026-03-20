interface CheckmarkProps {
  classes?: string;
}

export const Checkmark = ({ classes }: CheckmarkProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 48 48"
      id="Checkmark-Circle-Outline--Streamline-Ionic-Outline"
      className={classes}
    >
      <desc>
        Checkmark Circle Outline Streamline Icon: https://streamlinehq.com
      </desc>
      <path
        stroke="currentColor"
        strokeMiterlimit="10"
        d="M45.7108 24c0 -11.9861 -9.7247 -21.7107 -21.7109 -21.7107S2.2892 12.0139 2.2892 24s9.7246 21.7107 21.7107 21.7107S45.7108 35.9861 45.7108 24Z"
        strokeWidth="3"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M34.8553 14.9541 19.6578 33.0465l-6.5132 -7.237"
        strokeWidth="3"
      ></path>
    </svg>
  );
};
