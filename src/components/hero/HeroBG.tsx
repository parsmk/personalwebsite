import React, { useState, useTransition } from "react";
import { LoadingBG } from "./noise-bgs/LoadingBG";
import { WorleyBG } from "./noise-bgs/WorleyBG";
import { FieldCard } from "./noise-bgs/FieldCard";
import { NoiseFields } from "./noise-bgs/NoiseFields";
import type { NoiseProps } from "../../scripts/NoiseUtil";
import { PerlinBG } from "./noise-bgs/PerlinBG";

export enum NoiseModes {
  WORLEY = "worley",
  PERLIN = "perlin",
}

const INIT_NOISE: NoiseProps = {
  offset: [0, 0],
  scale: 150,
  size: [0, 0],
};
export const HeroBG = () => {
  const [noiseMode, setNoiseMode] = useState<NoiseModes>(NoiseModes.PERLIN);
  const [fractal, setFractal] = useState<boolean>(false);
  const [noiseData, setNoiseData] = useState<NoiseProps>({
    ...INIT_NOISE,
    size: [window.innerWidth, window.innerHeight],
  });

  const [bg, setBG] = useState<React.ReactNode>(
    <PerlinBG noiseData={noiseData} />,
  );
  const [errs, setErrs] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = () => {
    startTransition(() => {
      let b: React.ReactNode;
      switch (noiseMode) {
        case NoiseModes.WORLEY:
          b = <WorleyBG noiseData={noiseData} />;
          break;
        case NoiseModes.PERLIN:
          b = <PerlinBG noiseData={noiseData} />;
          break;
      }
    });
  };

  return (
    <div className="sticky top-0 h-0 w-full overflow-visible">
      <div className="absolute inset-x-0 top-0 h-screen">
        {isPending ? (
          <LoadingBG />
        ) : (
          <>
            <FieldCard>
              <NoiseFields noiseData={noiseData} setNoiseData={setNoiseData} />
            </FieldCard>
            {bg}
          </>
        )}
      </div>
    </div>
  );
};
