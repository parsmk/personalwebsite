import { useState, useRef } from "react";
import { RgbColorPicker } from "react-colorful";

import type { RGB } from "../../scripts/ColorMap";
import type { FractalProps } from "../../scripts/noise/Fractal";
import type { NoiseProps } from "../../scripts/noise/NoiseUtil";

import { PerlinBG } from "./noise-bgs/PerlinBG";
import { FractalBG } from "./noise-bgs/FractalBG";
import { WorleyBG } from "./noise-bgs/WorleyBG";
import { FieldCard } from "./noise-bgs/FieldCard";
import { NoiseFields } from "./noise-bgs/NoiseFields";

import { Button } from "../ui-kit/Button";
import { InputField } from "../ui-kit/InputField";

export enum NoiseModes {
  WORLEY = "worley",
  PERLIN = "perlin",
}

type RenderConfig = {
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
        <FieldCard>
          <NoiseFields
            noiseData={editConfig.noiseData}
            setNoiseData={(next) => editPush({ noiseData: next })}
          />
          <InputField
            value={editConfig.noiseData.seed}
            onChange={(e) =>
              editPush({
                noiseData: { ...noiseData, seed: e.currentTarget.value },
              })
            }
            label={"Seed"}
            name={"seed"}
          />
          {editConfig.noiseMode === NoiseModes.WORLEY && (
            <InputField
              name="worleySeedCount"
              label="Worley Seed count"
              value={editConfig.worleySeeds.toFixed(0)}
              onChange={(e) =>
                editPush({ worleySeeds: Number(e.currentTarget.value) })
              }
            />
          )}
          <div>
            <p className="mb-2">Color</p>
            <RgbColorPicker
              className="mx-auto opacity-50 group-hover:opacity-75 transition"
              color={editConfig.color}
              onChange={(c) => editPush({ color: c })}
            />
          </div>
        </FieldCard>
        {bg}
        <div className="absolute flex gap-2 bottom-10 left-1/2 -translate-x-1/2 bg-white/40 hover:bg-white/50 transition py-3 px-10 rounded-full">
          <Button
            variant="outline"
            active={editConfig.noiseMode === NoiseModes.PERLIN}
            onClick={() => editPush({ noiseMode: NoiseModes.PERLIN })}
          >
            Perlin
          </Button>
          <Button
            variant="outline"
            active={editConfig.noiseMode === NoiseModes.WORLEY}
            onClick={() => editPush({ noiseMode: NoiseModes.WORLEY })}
          >
            Worley
          </Button>
          <Button
            variant="outline"
            active={editConfig.fractal}
            onClick={() => editPush({ fractal: !editConfig.fractal })}
          >
            Fractal
          </Button>
        </div>
      </div>
    </div>
  );
};
