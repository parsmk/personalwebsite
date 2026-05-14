import { useState, useRef } from "react";

import type { RGB } from "../../scripts/ColorMap";
import type { FractalProps } from "../../scripts/noise/Fractal";
import { NoiseMode, type NoiseProps } from "../../scripts/noise/NoiseUtil";

import { NoiseControlPanel } from "./control-panel/NoiseControlPanel";

import { PerlinBG } from "./noise-bgs/PerlinBG";
import { FractalBG } from "./noise-bgs/FractalBG";
import { WorleyBG } from "./noise-bgs/WorleyBG";

export type RenderConfig = {
  worleySeeds: number;
  noiseMode: NoiseMode;
  fractal: boolean;
  noiseData: NoiseProps;
  fractalData: FractalProps;
  color: RGB;
};

const INIT_CONFIG: RenderConfig = {
  worleySeeds: 2,
  noiseMode: NoiseMode.PERLIN,
  fractal: true,
  noiseData: {
    seed: crypto.randomUUID(),
    offset: [0, 0],
    scale: 250,
    size: [window.innerWidth, window.innerHeight],
  },
  fractalData: {
    lacunarity: 3,
    persistence: 0.5,
    octaves: 4,
  },
  color: { r: 4, g: 52, b: 44 },
};

export const NoiseBG = () => {
  const [editConfig, setEditConfig] = useState<RenderConfig>(INIT_CONFIG);
  const [renderConfig, setRenderConfig] = useState<RenderConfig>(INIT_CONFIG);
  const pendingRef = useRef<Partial<RenderConfig>>({});
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const editPush = (changes: Partial<RenderConfig>) => {
    setEditConfig((prev) => ({ ...prev, ...changes }));
    Object.assign(pendingRef.current, changes);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const flushed = pendingRef.current;
      pendingRef.current = {};
      setRenderConfig((prev) => ({ ...prev, ...flushed }));
    }, 100);
  };

  const { fractal, fractalData, worleySeeds, noiseData, noiseMode, color } =
    renderConfig;

  const bg = fractal ? (
    <FractalBG
      worleySeeds={worleySeeds}
      noiseData={noiseData}
      noiseMode={noiseMode}
      color={color}
      fractalData={fractalData}
    />
  ) : noiseMode === NoiseMode.WORLEY ? (
    <WorleyBG worleySeeds={worleySeeds} noiseData={noiseData} color={color} />
  ) : (
    <PerlinBG noiseData={noiseData} color={color} />
  );

  return (
    <div className="sticky top-0 h-0 w-full overflow-visible">
      <div className="absolute inset-x-0 top-0 h-screen">
        {bg}
        <NoiseControlPanel
          config={editConfig}
          setConfig={(changes) => editPush(changes)}
        />
      </div>
    </div>
  );
};
