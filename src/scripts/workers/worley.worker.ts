import { WorleyNoise } from "../noise/Worley";

self.onmessage = (e) => {
  const { id, worleySeeds, noiseData } = e.data;
  self.postMessage({
    id,
    result: new WorleyNoise(worleySeeds, noiseData.seed).noiseMap(noiseData),
  });
};
