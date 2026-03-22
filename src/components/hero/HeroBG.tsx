import { useState, useTransition } from "react";
import { LoadingBG } from "./noise-bgs/LoadingBG";

export enum NoiseModes {
  WORLEY = "worley",
  PERLIN = "perlin",
}

export const HeroBG = () => {
  const [noiseMode, setNoiseMode] = useState<NoiseModes>(NoiseModes.PERLIN);
  const [fractal, setFractal] = useState<boolean>(false);

  const [bg, setBG] = useState<React.ReactNode>(<LoadingBG />);
  const [errs, setErrs] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (noiseMode) {
      case NoiseModes.PERLIN:
        return;
      case NoiseModes.WORLEY:
        return;
      default:
        return;
    }
  };

  return (
    <div className="sticky top-0 h-0 w-full overflow-visible">
      <div className="absolute inset-x-0 top-0 h-screen">{bg}</div>
    </div>
  );
};
