import React, { useState, useTransition, useEffect } from "react";
import { LoadingBG } from "./noise-bgs/LoadingBG";
import { WorleyBG } from "./noise-bgs/WorleyBG";
import { FieldCard } from "./noise-bgs/FieldCard";
import { NoiseFields } from "./noise-bgs/NoiseFields";
import type { NoiseProps } from "../../scripts/NoiseUtil";
import { PerlinBG } from "./noise-bgs/PerlinBG";
import { FractalBG } from "./noise-bgs/FractalBG";
import { Button } from "../ui-kit/Button";
import { InputField } from "../ui-kit/InputField";
import type { RGB } from "../../scripts/ColorMap";
import { RgbColorPicker } from "react-colorful";

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
  const [seed, setSeed] = useState<string>(crypto.randomUUID());
  const [worleySeeds, setWorleySeeds] = useState<number>(2);
  const [noiseMode, setNoiseMode] = useState<NoiseModes>(NoiseModes.PERLIN);
  const [fractal, setFractal] = useState<boolean>(true);
  const [noiseData, setNoiseData] = useState<NoiseProps>({
    ...INIT_NOISE,
    size: [window.innerWidth, window.innerHeight],
  });
  const [color, setColor] = useState<RGB>({ r: 4, g: 52, b: 44 });

  const [bg, setBG] = useState<React.ReactNode>(
    <FractalBG
      seed={seed}
      worleySeeds={worleySeeds}
      noiseMode={noiseMode}
      noiseData={noiseData}
      color={color}
    />,
  );
  const [errs, setErrs] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      if (fractal)
        return setBG(
          <FractalBG
            worleySeeds={worleySeeds}
            seed={seed}
            noiseData={noiseData}
            noiseMode={noiseMode}
            color={color}
          />,
        );

      switch (noiseMode) {
        case NoiseModes.WORLEY:
          return setBG(
            <WorleyBG seed={seed} noiseData={noiseData} color={color} />,
          );
        case NoiseModes.PERLIN:
          return setBG(
            <PerlinBG seed={seed} noiseData={noiseData} color={color} />,
          );
      }
    });
  }, [fractal, noiseMode, noiseData, seed, worleySeeds, color]);

  return (
    <div className="sticky top-0 h-0 w-full overflow-visible">
      <div className="absolute inset-x-0 top-0 h-screen">
        <FieldCard>
          <NoiseFields noiseData={noiseData} setNoiseData={setNoiseData} />
          <InputField
            value={seed}
            onChange={(e) => setSeed(e.currentTarget.value)}
            label={"Seed"}
            name={""}
          />
          <div>
            <p className="mb-2">Color</p>
            <RgbColorPicker
              className="mx-auto opacity-50 group-hover:opacity-75 transition"
              color={color}
              onChange={setColor}
            />
          </div>
        </FieldCard>
        {bg} {isPending && <LoadingBG />}
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
