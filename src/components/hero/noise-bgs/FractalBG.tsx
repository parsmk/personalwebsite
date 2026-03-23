import { useMemo, useState } from "react";
import { FractalNoise, type FractalProps } from "../../../scripts/Fractal";
import { WorleyNoise } from "../../../scripts/Worley";
import { Canvas } from "./Canvas";
import type { NoiseProps } from "../../../scripts/NoiseUtil";
import { NoiseModes } from "../HeroBG";
import { PerlinNoise } from "../../../scripts/Perlin";
import { WHITE, type RGB } from "../../../scripts/ColorMap";

const INIT_FRACTAL: FractalProps = {
  lacunarity: 3,
  persistence: 0.5,
  octaves: 4,
};

type FractalBGProps = {
  noiseData: NoiseProps;
  noiseMode: NoiseModes;
  seed: string;
  worleySeeds: number;
  color: RGB;
};

export const FractalBG = ({
  noiseData,
  seed,
  worleySeeds,
  noiseMode,
  color,
}: FractalBGProps) => {
  const [fractalData, setFractalData] = useState<FractalProps>(INIT_FRACTAL);

  const noiseMap = useMemo(() => {
    let noiseClass;
    switch (noiseMode) {
      case NoiseModes.PERLIN:
        noiseClass = new PerlinNoise(seed);
        break;
      case NoiseModes.WORLEY:
        noiseClass = new WorleyNoise(worleySeeds, seed);
        break;
    }

    return new FractalNoise(
      seed,
      fractalData,
      noiseClass.noise.bind(noiseClass),
    ).noiseMap(noiseData);
  }, [worleySeeds, noiseData, noiseMode, seed, fractalData, color]);

  return (
    <Canvas
      noiseMap={noiseMap}
      size={noiseData.size}
      colorMin={noiseMode === NoiseModes.WORLEY ? color : WHITE}
      colorMax={noiseMode === NoiseModes.WORLEY ? WHITE : color}
    />
  );
};
