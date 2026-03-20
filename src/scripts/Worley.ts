import {
  DIMENSIONS,
  index,
  makeRNG,
  prngNext,
  type NoiseProps,
  type RNG,
} from "./NoiseUtil";

export class WorleyNoise {
  seedPoints: number[][];

  constructor(numSeeds: number, seed: string);
  constructor(numSeeds: number, rng: RNG);
  constructor(numSeeds: number, seedOrRng: string | RNG) {
    const rng = typeof seedOrRng === "string" ? makeRNG(seedOrRng) : seedOrRng;
    this.seedPoints = [];
    for (let i = 0; i < numSeeds; i++) {
      this.seedPoints[i] = [
        prngNext(rng, 0, DIMENSIONS),
        prngNext(rng, 0, DIMENSIONS),
      ];
    }
  }

  noise(sampleX: number, sampleY: number): number {
    let minDist = Number.MAX_VALUE;

    for (let i = 0; i < this.seedPoints.length; i++) {
      const dx = sampleX - this.seedPoints[i][0];
      const dy = sampleY - this.seedPoints[i][1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      minDist = Math.min(dist, minDist);
    }

    return minDist;
  }

  noiseMap({ offset, scale }: NoiseProps): number[] {
    const map: number[] = [];
    for (let x = 0; x < DIMENSIONS; x++) {
      for (let y = 0; y < DIMENSIONS; y++) {
        const sampleX = (x + offset[0]) / scale;
        const sampleY = (y + offset[1]) / scale;
        map[index(x, y)] = this.noise(sampleX, sampleY);
      }
    }
    return map;
  }
}
