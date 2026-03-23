import React, { useState, useTransition, useEffect } from "react";
import { LoadingBG } from "./noise-bgs/LoadingBG";
import { WorleyBG } from "./noise-bgs/WorleyBG";
import { FieldCard } from "./noise-bgs/FieldCard";
import { NoiseFields } from "./noise-bgs/NoiseFields";
import type { NoiseProps } from "../../scripts/NoiseUtil";
import { PerlinBG } from "./noise-bgs/PerlinBG";
import { FractalBG } from "./noise-bgs/FractalBG";
import { Button } from "../ui-kit/Button";

export enum NoiseModes {
  WORLEY = "worley",
  PERLIN = "perlin",
}

const INIT_NOISE: NoiseProps = {
  offset: [0, 0],
  scale: 250,
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

  useEffect(() => {
    startTransition(() => {
      if (fractal)
        return setBG(<FractalBG noiseData={noiseData} noiseMode={noiseMode} />);

      switch (noiseMode) {
        case NoiseModes.WORLEY:
          return setBG(<WorleyBG noiseData={noiseData} />);
        case NoiseModes.PERLIN:
          return setBG(<PerlinBG noiseData={noiseData} />);
      }
    });
  }, [fractal, noiseMode, noiseData]);

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
        <div className="absolute flex gap-2 bottom-10 left-1/2 -translate-x-1/2 bg-white py-3 px-10 rounded-full">
          <Button
            variant="outline"
            active={noiseMode === NoiseModes.PERLIN}
            onClick={() => setNoiseMode(NoiseModes.PERLIN)}
          >
            Perlin
          </Button>
          <Button
            variant="outline"
            active={noiseMode === NoiseModes.WORLEY}
            onClick={() => setNoiseMode(NoiseModes.WORLEY)}
          >
            Worley
          </Button>
          <Button
            variant="outline"
            active={fractal}
            onClick={() => setFractal(!fractal)}
          >
            Fractal
          </Button>
        </div>
      </div>
    </div>
  );
};
