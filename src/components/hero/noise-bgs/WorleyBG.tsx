import { useMemo, useState } from "react";
import type { NoiseProps } from "../../../scripts/NoiseUtil";
import { Canvas } from "./Canvas";
import { WorleyNoise } from "../../../scripts/Worley";
import { WHITE, type RGB } from "../../../scripts/ColorMap";

type WorleyBGProps = {
  noiseData: NoiseProps;
  seed: string;
  worleySeeds: number;
  color: RGB;
};

export const WorleyBG = ({
  noiseData,
  seed,
  worleySeeds,
  color,
}: WorleyBGProps) => {
  const noiseMap = useMemo(
    () => new WorleyNoise(worleySeeds, seed).noiseMap(noiseData),
    [worleySeeds, noiseData, color],
  );

  return (
    <Canvas
      noiseMap={noiseMap}
      size={noiseData.size}
      colorMin={color}
      colorMax={WHITE}
    />
  );
};
