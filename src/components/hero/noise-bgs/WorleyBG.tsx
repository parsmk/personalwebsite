import { useMemo, useState } from "react";
import type { NoiseProps } from "../../../scripts/NoiseUtil";
import { Canvas } from "./Canvas";
import { WorleyNoise } from "../../../scripts/Worley";

type WorleyBGProps = {
  noiseData: NoiseProps;
};

export const WorleyBG = ({ noiseData }: WorleyBGProps) => {
  const [worleySeeds] = useState(1);
  const [s, setS] = useState(crypto.randomUUID());

  const noiseMap = useMemo(
    () => new WorleyNoise(worleySeeds, s).noiseMap(noiseData),
    [worleySeeds, noiseData],
  );

  return <Canvas noiseMap={noiseMap} size={noiseData.size} />;
};
