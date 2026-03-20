import seedrandom from "seedrandom";

export const DIMENSIONS = 64;

export type NoiseProps = {
  offset: [x: number, y: number];
  scale: number;
};

export type RNG = () => number;

export const makeRNG = (seed: string): RNG => seedrandom(seed);

export const prngNext = (rng: RNG, min: number, max: number): number =>
  Math.floor(rng() * (max - min) + min);

export const index = (x: number, y: number) => x * DIMENSIONS + y;
