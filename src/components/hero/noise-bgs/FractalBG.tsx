import { useMemo, useState } from "react";
import { FractalNoise, type FractalProps } from "../../../scripts/Fractal";
import { WorleyNoise } from "../../../scripts/Worley";
import { Canvas } from "./Canvas";
import type { NoiseProps } from "../../../scripts/NoiseUtil";
import { NoiseModes } from "../HeroBG";
import { PerlinNoise } from "../../../scripts/Perlin";

const INIT_FRACTAL: FractalProps = {
  lacunarity: 2,
  persistence: 0.5,
  octaves: 4,
};

type FractalBGProps = {
  noiseData: NoiseProps;
  noiseMode: NoiseModes;
};

export const FractalBG = ({ noiseData, noiseMode }: FractalBGProps) => {
  const [worleySeeds, setWorleySeeds] = useState(5);
  const [seed, setSeed] = useState(crypto.randomUUID());
  const [fractalData, setFractalData] = useState<FractalProps>(INIT_FRACTAL);

  const noiseMap = useMemo(() => {
    let noiseClass;
    switch (noiseMode) {
      case NoiseModes.PERLIN:
        noiseClass = new PerlinNoise(seed);
        break;
      case NoiseModes.WORLEY:
        noiseClass = new WorleyNoise(worleySeeds);
        break;
    }

    return new FractalNoise(
      seed,
      fractalData,
      noiseClass.noise.bind(noiseClass),
    ).noiseMap(noiseData);
  }, [worleySeeds, noiseData]);

  return <Canvas noiseMap={noiseMap} size={noiseData.size} />;
};
