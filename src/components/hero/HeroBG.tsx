"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FractalNoise, type FractalProps } from "../../scripts/Fractal";
import { applyColorMap } from "../../scripts/ColorMap";
import { makeRNG, type NoiseProps } from "../../scripts/NoiseUtil";
import { PerlinNoise } from "../../scripts/Perlin";
import { WorleyNoise } from "../../scripts/Worley";

export type NoiseModes = "worley" | "perlin";

const INIT_FRACTAL: FractalProps = {
  lacunarity: 2,
  persistence: 0.5,
  octaves: 4,
};

const INIT_NOISE: NoiseProps = {
  offset: [0, 0],
  scale: 150,
  size: [0, 0],
};

export const HeroBG = () => {
  const [seed, setSeed] = useState<string>(crypto.randomUUID());
  const [size, setSize] = useState<[number, number]>([
    window.innerWidth,
    window.innerHeight,
  ]);
  const [noiseData, setNoiseData] = useState<NoiseProps>(INIT_NOISE);

  const [fractal, setFractal] = useState<boolean>(false);
  const [fractalData, setFractalData] = useState<FractalProps>(INIT_FRACTAL);

  const [worleySeeds, setWorleySeeds] = useState<number>(5);
  const [noiseMode, setNoiseMode] = useState<NoiseModes>("worley");

  const [errs, setErrs] = useState<string[]>([]);

  const noiseMap = useMemo(() => {
    const rng = makeRNG(seed);
    let noiseClass;
    switch (noiseMode) {
      case "perlin":
        noiseClass = new PerlinNoise(rng);
        break;
      case "worley":
        noiseClass = new WorleyNoise(worleySeeds, rng);
        break;
      default:
        return setErrs((prev) => [...prev, "Invalid noise mode!"]);
    }

    const props: NoiseProps = { ...noiseData, size };

    if (fractal) {
      const f = new FractalNoise(
        rng,
        fractalData,
        noiseClass.noise.bind(noiseClass),
      );
      return f.noiseMap(props);
    } else return noiseClass.noiseMap(props);
  }, [fractalData, noiseData, fractal, noiseMode, worleySeeds, seed, size]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!noiseMap || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const pixels = applyColorMap(noiseMap, size);
    const imageData = new ImageData(pixels, size[0], size[1]);
    ctx.putImageData(imageData, 0, 0);
  }, [noiseMap, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size[0]}
      height={size[1]}
      className="absolute inset-0 h-full w-full -z-1"
      style={{ imageRendering: "pixelated" }}
    />
  );
};
