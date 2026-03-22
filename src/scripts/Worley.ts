import {
  index,
  makeRNG,
  prngNext,
  type NoiseProps,
  type RNG,
} from "./NoiseUtil";

export class WorleyNoise {
  numSeeds: number;

  constructor(numSeeds: number) {
    this.numSeeds = numSeeds;
  }

  noise(sampleX: number, sampleY: number): number {
    const cellX = Math.floor(sampleX);
    const cellY = Math.floor(sampleY);

    let minDist = Number.MAX_VALUE;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const cx = cellX + dx;
        const cy = cellY + dy;
        const cellRng = makeRNG(`${cx},${cy}`);
        for (let i = 0; i < this.numSeeds; i++) {
          const px = cx + prngNext(cellRng, 0, 1);
          const py = cy + prngNext(cellRng, 0, 1);
          const distX = sampleX - px;
          const distY = sampleY - py;
          minDist = Math.min(minDist, Math.sqrt(distX * distX + distY * distY));
        }
      }
    }
    return minDist;
  }

  noiseMap({ offset, scale, size }: NoiseProps): Promise<number[]> {
    return new Promise((resolve) => {
      const map: number[] = [];
      for (let y = 0; y < size[1]; y++) {
        for (let x = 0; x < size[0]; x++) {
          const sampleX = (x + offset[0]) / scale;
          const sampleY = (y + offset[1]) / scale;
          map[index(size, x, y)] = this.noise(sampleX, sampleY);
        }
      }
      resolve(map);
    });
  }
}
