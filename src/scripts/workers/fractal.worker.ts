import { FractalNoise } from "../noise/Fractal";
import { PerlinNoise } from "../noise/Perlin";
import { WorleyNoise } from "../noise/Worley";

self.onmessage = (e) => {
  const { id, noiseMode, worleySeeds, noiseData, fractalData } = e.data;

  let noiseClass;
  if (noiseMode === "perlin") {
    noiseClass = new PerlinNoise(noiseData.seed);
  } else {
    noiseClass = new WorleyNoise(worleySeeds, noiseData.seed);
  }

  const fractal = new FractalNoise(
    noiseData.seed,
    fractalData,
    noiseClass.noise.bind(noiseClass),
  );

  const noiseMap = fractal.noiseMap(noiseData);

  self.postMessage({ id, noiseMode, result: noiseMap });
};
