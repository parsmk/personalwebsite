import React, { useState, useTransition, useEffect, useRef } from "react";
import { LoadingBG } from "./noise-bgs/LoadingBG";
import { WorleyBG } from "./noise-bgs/WorleyBG";
import { FieldCard } from "./noise-bgs/FieldCard";
import { NoiseFields } from "./noise-bgs/NoiseFields";
import type { NoiseProps } from "../../scripts/NoiseUtil";
import { PerlinBG } from "./noise-bgs/PerlinBG";
import { FractalBG } from "./noise-bgs/FractalBG";
import { Button } from "../ui-kit/Button";
import { InputField } from "../ui-kit/InputField";
import type { RGB } from "../../scripts/ColorMap";
import { RgbColorPicker } from "react-colorful";

export enum NoiseModes {
  WORLEY = "worley",
  PERLIN = "perlin",
}

type RenderConfig = {
  seed: string;
  worleySeeds: number;
  noiseMode: NoiseModes;
  fractal: boolean;
  noiseData: NoiseProps;
  color: RGB;
};

const INIT_CONFIG: RenderConfig = {
  seed: crypto.randomUUID(),
  worleySeeds: 2,
  noiseMode: NoiseModes.PERLIN,
  fractal: true,
  noiseData: { offset: [0, 0], scale: 250, size: [window.innerWidth, window.innerHeight] },
  color: { r: 4, g: 52, b: 44 },
};

export const HeroBG = () => {
  const [editConfig, setEditConfig] = useState<RenderConfig>(INIT_CONFIG);
  const [renderConfig, setRenderConfig] = useState<RenderConfig>(INIT_CONFIG);
  const pendingRef = useRef<Partial<RenderConfig>>({});
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [bg, setBG] = useState<React.ReactNode>(
    <FractalBG
      seed={INIT_CONFIG.seed}
      worleySeeds={INIT_CONFIG.worleySeeds}
      noiseMode={INIT_CONFIG.noiseMode}
      noiseData={INIT_CONFIG.noiseData}
      color={INIT_CONFIG.color}
    />,
  );
  const [isPending, startTransition] = useTransition();

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

  useEffect(() => {
    const { fractal, seed, worleySeeds, noiseData, noiseMode, color } = renderConfig;
    startTransition(() => {
      if (fractal)
        return setBG(
          <FractalBG
            worleySeeds={worleySeeds}
            seed={seed}
            noiseData={noiseData}
            noiseMode={noiseMode}
            color={color}
          />,
        );

      switch (noiseMode) {
        case NoiseModes.WORLEY:
          return setBG(
            <WorleyBG
              seed={seed}
              worleySeeds={worleySeeds}
              noiseData={noiseData}
              color={color}
            />,
          );
        case NoiseModes.PERLIN:
          return setBG(
            <PerlinBG seed={seed} noiseData={noiseData} color={color} />,
          );
      }
    });
  }, [renderConfig]);

  return (
    <div className="sticky top-0 h-0 w-full overflow-visible">
      <div className="absolute inset-x-0 top-0 h-screen">
        <FieldCard>
          <NoiseFields
            noiseData={editConfig.noiseData}
            setNoiseData={(next) => editPush({ noiseData: next })}
          />
          <InputField
            value={editConfig.seed}
            onChange={(e) => editPush({ seed: e.currentTarget.value })}
            label={"Seed"}
            name={"seed"}
          />
          {editConfig.noiseMode === NoiseModes.WORLEY && (
            <InputField
              name="worleySeedCount"
              label="Worley Seed count"
              value={editConfig.worleySeeds.toFixed(0)}
              onChange={(e) => editPush({ worleySeeds: Number(e.currentTarget.value) })}
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
        {bg} {isPending && <LoadingBG />}
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
