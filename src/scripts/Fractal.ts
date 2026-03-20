import {
  DIMENSIONS,
  index,
  makeRNG,
  prngNext,
  type NoiseProps,
} from "./NoiseUtil";

export type FractalProps = {
  lacunarity: number;
  persistence: number;
  octaves: number;
};

export class FractalNoise {
  private octaveOffsets: [number, number][];
  lacunarity: number;
  persistence: number;
  octaves: number;

  constructor(seed: string, { lacunarity, persistence, octaves }: FractalProps) {
    const rng = makeRNG(seed);
    this.lacunarity = lacunarity;
    this.persistence = persistence;
    this.octaves = octaves;

    this.octaveOffsets = [];
    for (let i = 0; i < octaves; i++) {
      this.octaveOffsets[i] = [prngNext(rng, -100, 100), prngNext(rng, -100, 100)];
    }
  }

  noiseMap(
    { offset, scale }: NoiseProps,
    noise: (sampleX: number, sampleY: number) => number,
  ): number[] {
    const map: number[] = [];
    for (let x = 0; x < DIMENSIONS; x++) {
      for (let y = 0; y < DIMENSIONS; y++) {
        let amp = 1.0;
        let freq = 1.0;
        let height = 0;

        for (let i = 0; i < this.octaves; i++) {
          const sampleX = (freq * (x + this.octaveOffsets[i][0] + offset[0])) / scale;
          const sampleY = (freq * (y + this.octaveOffsets[i][1] + offset[1])) / scale;

          height += noise(sampleX, sampleY) * amp;
          amp *= this.persistence;
          freq *= this.lacunarity;
        }

        map[index(x, y)] = height;
      }
    }
    return map;
  }
}
