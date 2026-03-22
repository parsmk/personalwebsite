import React, { useState, useTransition } from "react";
import { LoadingBG } from "./noise-bgs/LoadingBG";
import { WorleyBG } from "./noise-bgs/WorleyBG";
import { FieldCard } from "./noise-bgs/FieldCard";
import { NoiseFields } from "./noise-bgs/NoiseFields";
import type { NoiseProps } from "../../scripts/NoiseUtil";
import { PerlinBG } from "./noise-bgs/PerlinBG";
import { FractalBG } from "./noise-bgs/FractalBG";

export enum NoiseModes {
  WORLEY = "worley",
  PERLIN = "perlin",
}

const INIT_NOISE: NoiseProps = {
  offset: [0, 0],
  scale: 500,
  size: [0, 0],
};

export const HeroBG = () => {
  const [noiseMode, setNoiseMode] = useState<NoiseModes>(NoiseModes.PERLIN);
  const [fractal, setFractal] = useState<boolean>(true);
  const [noiseData, setNoiseData] = useState<NoiseProps>({
    ...INIT_NOISE,
    size: [window.innerWidth, window.innerHeight],
  });

  const [bg, setBG] = useState<React.ReactNode>(
    <FractalBG noiseMode={noiseMode} noiseData={noiseData} />,
  );
  const [errs, setErrs] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = () => {
    startTransition(() => {
      if (fractal)
        return setBG(<FractalBG noiseData={noiseData} noiseMode={noiseMode} />);

      switch (noiseMode) {
        case NoiseModes.WORLEY:
          setBG(<WorleyBG noiseData={noiseData} />);
        case NoiseModes.PERLIN:
          return setBG(<PerlinBG noiseData={noiseData} />);
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
