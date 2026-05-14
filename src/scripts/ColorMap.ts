import { index } from "./noise/NoiseUtil";

export type RGB = { r: number; g: number; b: number };

export const WHITE: RGB = { r: 255, g: 255, b: 255 };

export const rgbToCSS = ({ r, g, b }: RGB): string => `rgb(${r}, ${g}, ${b})`;

export const rgbToHex = ({ r, g, b }: RGB): string =>
  `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

const lerpColor = (a: RGB, b: RGB, t: number): RGB => {
  return {
    r: lerp(a.r, b.r, t),
    g: lerp(a.g, b.g, t),
    b: lerp(a.b, b.b, t),
  };
};

export const applyColorMap = (
  noise: number[],
  size: [number, number],
  colorMin: RGB,
  colorMax: RGB,
): Uint8ClampedArray<ArrayBuffer> => {
  const pixels = new Uint8ClampedArray(
    size[0] * size[1] * 4,
  ) as Uint8ClampedArray<ArrayBuffer>;
  for (let y = 0; y < size[1]; y++) {
    for (let x = 0; x < size[0]; x++) {
      const i = index(size, x, y);
      const { r, g, b } = lerpColor(
        colorMin,
        colorMax,
        Math.max(0, Math.min(1, noise[i])),
      );
      const p = i * 4;
      pixels[p] = r;
      pixels[p + 1] = g;
      pixels[p + 2] = b;
      pixels[p + 3] = 255;
    }
  }

  return pixels;
};
