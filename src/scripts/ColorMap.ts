import { index } from "./NoiseUtil";

export type RGB = [r: number, g: number, b: number];

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

const lerpColor = (a: RGB, b: RGB, t: number): RGB => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
];

const sampleColorMap = (value: number, color: RGB): RGB => {
  const t = Math.max(0, Math.min(1, value));
  return lerpColor([255, 255, 255], color, t);
};

export const applyColorMap = (
  noise: number[],
  size: [number, number],
  color: RGB,
): Uint8ClampedArray<ArrayBuffer> => {
  const pixels = new Uint8ClampedArray(
    size[0] * size[1] * 4,
  ) as Uint8ClampedArray<ArrayBuffer>;
  for (let y = 0; y < size[1]; y++) {
    for (let x = 0; x < size[0]; x++) {
      const i = index(size, x, y);
      const [r, g, b] = sampleColorMap(noise[i], color);
      const p = i * 4;
      pixels[p] = r;
      pixels[p + 1] = g;
      pixels[p + 2] = b;
      pixels[p + 3] = 255;
    }
  }

  return pixels;
};
