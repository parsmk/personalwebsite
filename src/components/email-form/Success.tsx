import type { Dispatch, SetStateAction } from "react";
import Checkmark from "../svgs/Checkmark.astro";

export const Success = ({
  setSent,
}: {
  setSent: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="grow">
      <Checkmark classes="" />
      <button className="btn btn-primary" onClick={() => setSent(false)}>
        Send Another
      </button>
    </div>
  );
};
