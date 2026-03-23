import { useMemo, useState } from "react";
import type { NoiseProps } from "../../../scripts/NoiseUtil";
import { Canvas } from "./Canvas";
import { WorleyNoise } from "../../../scripts/Worley";
import { PerlinNoise } from "../../../scripts/Perlin";

type PerlinBGProps = {
  noiseData: NoiseProps;
  seed: string;
};

export const PerlinBG = ({ noiseData, seed }: PerlinBGProps) => {
  const noiseMap = useMemo(
    () => new PerlinNoise(seed).noiseMap(noiseData),
    [noiseData],
  );
  return <Canvas noiseMap={noiseMap} size={noiseData.size} />;
};
