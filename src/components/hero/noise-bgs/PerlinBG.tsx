import { useEffect, useRef, useState } from "react";
import type { NoiseProps } from "../../../scripts/noise/NoiseUtil";
import { WHITE, type RGB } from "../../../scripts/ColorMap";
import { Canvas } from "./Canvas";
import { NoiseModes } from "../HeroBG";

type PerlinBGProps = {
  noiseData: NoiseProps;
  seed: string;
  color: RGB;
};

export const PerlinBG = ({ noiseData, seed, color }: PerlinBGProps) => {
  const [noiseState, setNoiseState] = useState<{
    map: number[];
    mode: NoiseModes;
  } | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const requestId = useRef(0);
  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../../../scripts/workers/perlin.worker.ts", import.meta.url),
      { type: "module" },
    );

    workerRef.current.onmessage = (e) => {
      if (e.data.id === requestId.current) {
        setNoiseState({ map: e.data.result, mode: NoiseModes.PERLIN });
      }
    };

    return () => workerRef.current?.terminate();
  }, []);

  useEffect(() => {
    const id = ++requestId.current;
    workerRef.current?.postMessage({
      id,
      seed,
      noiseData,
    });
  }, [seed, noiseData]);

  if (!noiseState) return null;

  return (
    <Canvas
      noiseMap={noiseState.map}
      size={noiseData.size}
      colorMin={color}
      colorMax={WHITE}
    />
  );
};
