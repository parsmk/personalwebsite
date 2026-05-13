import { useState, useRef } from "react";

import type { RGB } from "../../scripts/ColorMap";
import type { FractalProps } from "../../scripts/noise/Fractal";
import { NoiseModes, type NoiseProps } from "../../scripts/noise/NoiseUtil";

import { PerlinBG } from "./noise-bgs/PerlinBG";
import { FractalBG } from "./noise-bgs/FractalBG";
import { WorleyBG } from "./noise-bgs/WorleyBG";

import { NoiseFields } from "./fields/NoiseFields";
import { FractalFields } from "./fields/FractalFields";
import { ModeFields } from "./fields/ModeFields";

export type RenderConfig = {
  worleySeeds: number;
  noiseMode: NoiseModes;
  fractal: boolean;
  noiseData: NoiseProps;
  fractalData: FractalProps;
  color: RGB;
};

const INIT_CONFIG: RenderConfig = {
  worleySeeds: 2,
  noiseMode: NoiseModes.PERLIN,
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

export const HeroBG = () => {
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
  ) : noiseMode === NoiseModes.WORLEY ? (
    <WorleyBG worleySeeds={worleySeeds} noiseData={noiseData} color={color} />
  ) : (
    <PerlinBG noiseData={noiseData} color={color} />
  );

  return (
    <div className="sticky top-0 h-0 w-full overflow-visible">
      <div className="absolute inset-x-0 top-0 h-screen">
        <NoiseFields
          config={renderConfig}
          setConfig={(next) => editPush(next)}
        />
        <FractalFields
          config={renderConfig}
          setConfig={(next) => editPush(next)}
        />
        <ModeFields
          config={renderConfig}
          setConfig={(next) => editPush(next)}
        />
        {bg}
      </div>
    </div>
  );
};
