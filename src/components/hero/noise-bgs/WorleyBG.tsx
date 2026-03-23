import { useMemo, useState } from "react";
import type { NoiseProps } from "../../../scripts/NoiseUtil";
import { Canvas } from "./Canvas";
import { WorleyNoise } from "../../../scripts/Worley";
import type { RGB } from "../../../scripts/ColorMap";

type WorleyBGProps = {
  noiseData: NoiseProps;
  seed: string;
  color: RGB;
};

export const WorleyBG = ({ noiseData, seed, color }: WorleyBGProps) => {
  const [worleySeeds] = useState(1);

  const noiseMap = useMemo(
    () => new WorleyNoise(worleySeeds, seed).noiseMap(noiseData),
    [worleySeeds, noiseData, color],
  );

  return <Canvas noiseMap={noiseMap} size={noiseData.size} color={color} />;
};
