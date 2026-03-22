import {
  index,
  makeRNG,
  prngNext,
  type NoiseProps,
  type RNG,
} from "./NoiseUtil";

const constantVectors: [number, number][] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1],
];

const ease = (t: number) => ((6.0 * t - 15.0) * t + 10.0) * t * t * t;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const generatePermutationTable = (rng: RNG): number[] => {
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

export class PerlinNoise {
  private pTable: number[];

  constructor(seed: string) {
    this.pTable = generatePermutationTable(makeRNG(seed));
  }

  private indexPermutation(x: number, y: number): number {
    return this.pTable[(this.pTable[x & 255] + (y & 255)) & 511];
  }

  noise(sampleX: number, sampleY: number): number {
    const fx = Math.floor(sampleX);
    const fy = Math.floor(sampleY);

    const cellX = fx & 255;
    const cellY = fy & 255;

    const deltaX = sampleX - fx;
    const deltaY = sampleY - fy;

    const value00 = this.indexPermutation(cellX, cellY);
    const value01 = this.indexPermutation(cellX, cellY + 1);
    const value10 = this.indexPermutation(cellX + 1, cellY);
    const value11 = this.indexPermutation(cellX + 1, cellY + 1);

    const dot00 =
      deltaX * constantVectors[value00 & 7][0] +
      deltaY * constantVectors[value00 & 7][1];
    const dot01 =
      deltaX * constantVectors[value01 & 7][0] +
      (deltaY - 1) * constantVectors[value01 & 7][1];
    const dot10 =
      (deltaX - 1) * constantVectors[value10 & 7][0] +
      deltaY * constantVectors[value10 & 7][1];
    const dot11 =
      (deltaX - 1) * constantVectors[value11 & 7][0] +
      (deltaY - 1) * constantVectors[value11 & 7][1];

    const smoothX = ease(deltaX);
    const smoothY = ease(deltaY);

    return (
      (lerp(lerp(dot00, dot10, smoothX), lerp(dot01, dot11, smoothX), smoothY) +
        1) /
      2
    );
  }

  noiseMap({ offset, scale, size }: NoiseProps): number[] {
    const map: number[] = [];
    for (let y = 0; y < size[1]; y++) {
      for (let x = 0; x < size[0]; x++) {
        const sampleX = (x + offset[0]) / scale;
        const sampleY = (y + offset[1]) / scale;
        map[index(size, x, y)] = this.noise(sampleX, sampleY);
      }
    }
    return map;
  }
}
