import { useMemo, useState } from "react";
import type { NoiseProps } from "../../../scripts/NoiseUtil";
import { Canvas } from "./Canvas";
import { PerlinNoise } from "../../../scripts/Perlin";
import type { RGB } from "../../../scripts/ColorMap";

type PerlinBGProps = {
  noiseData: NoiseProps;
  seed: string;
  color: RGB;
};

export const PerlinBG = ({ noiseData, seed, color }: PerlinBGProps) => {
  const noiseMap = useMemo(
    () => new PerlinNoise(seed).noiseMap(noiseData),
    [noiseData, color],
  );
  return <Canvas noiseMap={noiseMap} size={noiseData.size} color={color} />;
};
