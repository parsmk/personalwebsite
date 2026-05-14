import seedrandom from "seedrandom";

export type NoiseProps = {
  offset: [x: number, y: number];
  scale: number;
  size: [x: number, y: number];
  seed: string;
};

export enum NoiseMode {
  WORLEY = "worley",
  PERLIN = "perlin",
}

export type RNG = () => number;

export const makeRNG = (seed: string): RNG => seedrandom(seed);

export const prngNext = (rng: RNG, min: number, max: number): number =>
  Math.floor(rng() * (max - min) + min);

export const index = (size: [number, number], x: number, y: number) =>
  y * size[0] + x;

export const generatePermutationTable = (rng: RNG): number[] => {
  const output: number[] = new Array(512);

  for (let i = 0; i < 256; i++) {
    output[i] = i;
  }

  for (let i = 255; i > 0; i--) {
    const j = prngNext(rng, 0, i);
    [output[j], output[i]] = [output[i], output[j]];
  }

  for (let i = 0; i < 256; i++) {
    output[i + 256] = output[i];
  }

  return output;
};

export const normalize = (map: number[], max: number, min: number) => {
  const range = max - min || 1;
  return map.map((v) => (v - min) / range);
};
