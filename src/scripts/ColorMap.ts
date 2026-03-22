import { index } from "./NoiseUtil";

type RGB = [r: number, g: number, b: number];

type ColorStop = {
  t: number;
  color: RGB;
};

const COLOR_STOPS: ColorStop[] = [
  { t: 0, color: [255, 255, 255] },
  { t: 1, color: [0, 0, 0] },
];

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

const lerpColor = (a: RGB, b: RGB, t: number): RGB => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
];

const sampleColorMap = (value: number): RGB => {
  const clamped = Math.max(0, Math.min(1, value));

  for (let i = 0; i < COLOR_STOPS.length - 1; i++) {
    const lo = COLOR_STOPS[i];
    const hi = COLOR_STOPS[i + 1];
    if (clamped <= hi.t) {
      const t = (clamped - lo.t) / (hi.t - lo.t);
      return lerpColor(lo.color, hi.color, t);
    }
  }

  return COLOR_STOPS[COLOR_STOPS.length - 1].color;
};

export const applyColorMap = (
  noise: number[],
  size: [number, number],
): Uint8ClampedArray<ArrayBuffer> => {
  const pixels = new Uint8ClampedArray(
    size[0] * size[1] * 4,
  ) as Uint8ClampedArray<ArrayBuffer>;
  for (let y = 0; y < size[1]; y++) {
    for (let x = 0; x < size[0]; x++) {
      const i = index(size, x, y);
      const [r, g, b] = sampleColorMap(noise[i]);
      const p = i * 4;
      pixels[p] = r;
      pixels[p + 1] = g;
      pixels[p + 2] = b;
      pixels[p + 3] = 255;
    }
  }

  return pixels;
};
