import { PerlinNoise } from "../noise/Perlin";

self.onmessage = (e) => {
  const { id, seed, noiseData } = e.data;
  self.postMessage({ id, result: new PerlinNoise(seed).noiseMap(noiseData) });
};
