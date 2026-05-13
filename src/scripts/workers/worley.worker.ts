import { WorleyNoise } from "../noise/Worley";

self.onmessage = (e) => {
  const { id, worleySeeds, seed, noiseData } = e.data;
  self.postMessage({
    id,
    result: new WorleyNoise(worleySeeds, seed).noiseMap(noiseData),
  });
};
