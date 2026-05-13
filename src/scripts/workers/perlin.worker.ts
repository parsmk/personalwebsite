import { PerlinNoise } from "../noise/Perlin";

self.onmessage = (e) => {
  const { id, noiseData } = e.data;
  self.postMessage({
    id,
    result: new PerlinNoise(noiseData.seed).noiseMap(noiseData),
  });
};
