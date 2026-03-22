import { useMemo, useState } from "react";
import type { NoiseProps } from "../../../scripts/NoiseUtil";
import { Canvas } from "./Canvas";
import { WorleyNoise } from "../../../scripts/Worley";
import { PerlinNoise } from "../../../scripts/Perlin";

type PerlinBGProps = {
  noiseData: NoiseProps;
};

export const PerlinBG = ({ noiseData }: PerlinBGProps) => {
  const [s, setS] = useState(crypto.randomUUID());
  const noiseMap = useMemo(
    () => new PerlinNoise(s).noiseMap(noiseData),
    [noiseData],
  );
  return <Canvas noiseMap={noiseMap} size={noiseData.size} />;
};
