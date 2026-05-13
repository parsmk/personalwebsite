import {
  generatePermutationTable,
  index,
  makeRNG,
  normalize,
  type NoiseProps,
} from "./NoiseUtil";

export class WorleyNoise {
  private pTable: number[];
  numSeeds: number;

  constructor(numSeeds: number, seed: string) {
    this.numSeeds = numSeeds;
    this.pTable = generatePermutationTable(makeRNG(seed));
  }

  private cellPoints(cx: number, cy: number): [number, number][] {
    const points: [number, number][] = [];
    for (let i = 0; i < this.numSeeds; i++) {
      const h =
        this.pTable[((cx & 255) + this.pTable[(cy + i * 53) & 255]) & 511];
      const px = cx + h / 255;
      const py = cy + this.pTable[(h + 37 + i * 17) & 511] / 255;
      points.push([px, py]);
    }
    return points;
  }

  noise(sampleX: number, sampleY: number): number {
    const cellX = Math.floor(sampleX);
    const cellY = Math.floor(sampleY);

    let minDist = Number.MAX_VALUE;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (const [px, py] of this.cellPoints(cellX + dx, cellY + dy)) {
          const distX = sampleX - px;
          const distY = sampleY - py;
          minDist = Math.min(minDist, distX * distX + distY * distY);
        }
      }
    }
    return minDist;
  }

  noiseMap({ offset, scale, size }: NoiseProps) {
    const map: number[] = [];
    let [min, max] = [Infinity, -Infinity];
    for (let y = 0; y < size[1]; y++) {
      for (let x = 0; x < size[0]; x++) {
        const sampleX = (x + offset[0]) / scale;
        const sampleY = (y + offset[1]) / scale;
        const v = this.noise(sampleX, sampleY);
        map[index(size, x, y)] = v;
        if (v < min) min = v;
        if (v > max) max = v;
      }
    }
    return normalize(map, max, min);
  }
}
