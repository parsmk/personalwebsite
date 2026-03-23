import { useMemo, useState } from "react";
import type { NoiseProps } from "../../../scripts/NoiseUtil";
import { Canvas } from "./Canvas";
import { WorleyNoise } from "../../../scripts/Worley";

type WorleyBGProps = {
  noiseData: NoiseProps;
  seed: string;
};

export const WorleyBG = ({ noiseData, seed }: WorleyBGProps) => {
  const [worleySeeds] = useState(1);

  const noiseMap = useMemo(
    () => new WorleyNoise(worleySeeds, seed).noiseMap(noiseData),
    [worleySeeds, noiseData],
  );

  return <Canvas noiseMap={noiseMap} size={noiseData.size} />;
};
