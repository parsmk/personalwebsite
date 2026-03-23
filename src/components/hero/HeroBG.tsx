import React, { useState, useTransition, useEffect, useRef } from "react";
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
  const [renderColor, setRenderColor] = useState<RGB>(color);
  const colorDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
            color={renderColor}
          />,
        );

      switch (noiseMode) {
        case NoiseModes.WORLEY:
          return setBG(
            <WorleyBG
              seed={seed}
              worleySeeds={worleySeeds}
              noiseData={noiseData}
              color={renderColor}
            />,
          );
        case NoiseModes.PERLIN:
          return setBG(
            <PerlinBG seed={seed} noiseData={noiseData} color={renderColor} />,
          );
      }
    });
  }, [fractal, noiseMode, noiseData, seed, worleySeeds, renderColor]);

  const handleColorChange = (c: RGB) => {
    setColor(c);
    if (colorDebounceRef.current) clearTimeout(colorDebounceRef.current);
    colorDebounceRef.current = setTimeout(() => setRenderColor(c), 100);
  };

  return (
    <div className="sticky top-0 h-0 w-full overflow-visible">
      <div className="absolute inset-x-0 top-0 h-screen">
        <FieldCard>
          <NoiseFields noiseData={noiseData} setNoiseData={setNoiseData} />
          <InputField
            value={seed}
            onChange={(e) => setSeed(e.currentTarget.value)}
            label={"Seed"}
            name={"seed"}
          />
          {noiseMode === NoiseModes.WORLEY && (
            <InputField
              name="worleySeedCount"
              label="Worley Seed count"
              value={worleySeeds.toFixed(0)}
              onChange={(e) => setWorleySeeds(Number(e.currentTarget.value))}
            />
          )}
          <div>
            <p className="mb-2">Color</p>
            <RgbColorPicker
              className="mx-auto opacity-50 group-hover:opacity-75 transition"
              color={color}
              onChange={handleColorChange}
            />
          </div>
        </FieldCard>
        {bg} {isPending && <LoadingBG />}
        <div className="absolute flex gap-2 bottom-10 left-1/2 -translate-x-1/2 bg-white/40 hover:bg-white/50 transition py-3 px-10 rounded-full">
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
