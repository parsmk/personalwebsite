import seedrandom from "seedrandom";

export type NoiseProps = {
  offset: [x: number, y: number];
  scale: number;
  size: [x: number, y: number];
};

export type RNG = () => number;

export const makeRNG = (seed: string): RNG => seedrandom(seed);

export const prngNext = (rng: RNG, min: number, max: number): number =>
  Math.floor(rng() * (max - min) + min);

export const index = (size: [number, number], x: number, y: number) =>
  y * size[0] + x;
