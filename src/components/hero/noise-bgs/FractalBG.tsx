import { useEffect, useRef, useState } from "react";
import { type FractalProps } from "../../../scripts/noise/Fractal";
import { NoiseMode, type NoiseProps } from "../../../scripts/noise/NoiseUtil";
import { WHITE, type RGB } from "../../../scripts/ColorMap";
import { Canvas } from "./Canvas";

type FractalBGProps = {
  noiseData: NoiseProps;
  noiseMode: NoiseMode;
  worleySeeds: number;
  color: RGB;
  fractalData: FractalProps;
};
export const FractalBG = ({
  noiseData,
  worleySeeds,
  noiseMode,
  color,
  fractalData,
}: FractalBGProps) => {
  const [noiseState, setNoiseState] = useState<{
    map: number[];
    mode: NoiseMode;
  } | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const requestId = useRef(0);

  const colors: Record<NoiseMode, [RGB, RGB]> = {
    [NoiseMode.WORLEY]: [color, WHITE],
    [NoiseMode.PERLIN]: [WHITE, color],
  };

  // Create worker on mount, terminate on unmount
  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../../../scripts/workers/fractal.worker.ts", import.meta.url),
      { type: "module" },
    );

    workerRef.current.onmessage = (e) => {
      if (e.data.id === requestId.current) {
        setNoiseState({ map: e.data.result, mode: e.data.noiseMode });
      }
    };

    return () => workerRef.current?.terminate();
  }, []);

  useEffect(() => {
    const id = ++requestId.current;
    workerRef.current?.postMessage({
      id,
      noiseMode,
      worleySeeds,
      noiseData,
      fractalData,
    });
  }, [noiseMode, worleySeeds, noiseData, fractalData]);

  if (!noiseState) return null;

  return (
    <Canvas
      noiseMap={noiseState.map}
      size={noiseData.size}
      colorMin={colors[noiseState.mode][0]}
      colorMax={colors[noiseState.mode][1]}
    />
  );
};
