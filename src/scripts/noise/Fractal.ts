import {
  index,
  makeRNG,
  normalize,
  prngNext,
  type NoiseProps,
  type RNG,
} from "./NoiseUtil";

export type FractalProps = {
  lacunarity: number;
  persistence: number;
  octaves: number;
};

export class FractalNoise {
  private octaveOffsets: [number, number][];
  private noiseFunc: (sampleX: number, sampleY: number) => number;
  lacunarity: number;
  persistence: number;
  octaves: number;

  constructor(
    seed: string,
    { lacunarity, persistence, octaves }: FractalProps,
    noiseFunc: (sampleX: number, sampleY: number) => number,
  ) {
    const rng = typeof seed === "string" ? makeRNG(seed) : seed;
    this.lacunarity = lacunarity;
    this.persistence = persistence;
    this.octaves = octaves;

    this.noiseFunc = noiseFunc;

    this.octaveOffsets = [];
    for (let i = 0; i < octaves; i++) {
      this.octaveOffsets[i] = [
        prngNext(rng, -100, 100),
        prngNext(rng, -100, 100),
      ];
    }
  }

  noiseMap({ offset, scale, size }: NoiseProps): number[] {
    const map: number[] = [];
    let [min, max] = [Infinity, -Infinity];
    for (let y = 0; y < size[1]; y++) {
      for (let x = 0; x < size[0]; x++) {
        let amp = 1.0;
        let freq = 1.0;
        let height = 0;

        for (let i = 0; i < this.octaves; i++) {
          const sampleX =
            (freq * (x + this.octaveOffsets[i][0] + offset[0])) / scale;
          const sampleY =
            (freq * (y + this.octaveOffsets[i][1] + offset[1])) / scale;

          height += this.noiseFunc(sampleX, sampleY) * amp;
          amp *= this.persistence;
          freq *= this.lacunarity;

          min = Math.min(min, height);
          max = Math.max(max, height);
        }

        map[index(size, x, y)] = height;
      }
    }
    return normalize(map, max, min);
  }
}
