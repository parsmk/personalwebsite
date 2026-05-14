import { useState } from "react";
import { rgbToCSS, rgbToHex } from "../../../scripts/ColorMap";
import { NoiseMode } from "../../../scripts/noise/NoiseUtil";
import { Chevron } from "../../svgs/Chevron";

import { Copy } from "../../svgs/Copy";
import { Dice } from "../../svgs/Dice";

import { Button } from "../../ui-kit/Button";
import { IncrementField } from "../../ui-kit/IncrementField";
import { InputField } from "../../ui-kit/InputField";
import { NumberField } from "../../ui-kit/NumberField";
import { SliderField } from "../../ui-kit/SliderField";

import type { RenderConfig } from "../NoiseBG";
import { NoiseModePill } from "./NoiseModePill";
import { RgbColorPicker } from "react-colorful";
import { Toggle } from "../../ui-kit/Toggle";

const Subtitle = ({ children }: { children: React.ReactNode }) => {
  return <h3 className="text-primary font-semibold uppercase">{children}</h3>;
};

const Break = () => {
  return <hr className="w-full mx-auto border-t-1 border-secondary my-5" />;
};

type NoiseControlPanelProps = {
  config: RenderConfig;
  setConfig: (config: Partial<RenderConfig>) => void;
};

export const NoiseControlPanel = ({
  config,
  setConfig,
}: NoiseControlPanelProps) => {
  const [colorPicker, setColorPicker] = useState<boolean>(false);

  return (
    <div
      className="
        max-w-[33%]
        flex flex-col p-5 
        absolute top-1/2 -translate-y-1/2 left-3
        bg-accent/75 outline-1 outline-primary/50 rounded-md
      "
    >
      <div>
        <h3 className="text-md text-white">Noise Generator</h3>
        <p className="text-primary">
          {`${config.noiseMode.charAt(0).toUpperCase() + config.noiseMode.slice(1)} · ${config.noiseData.size[0]} x ${config.noiseData.size[1]}`}
        </p>
      </div>

      <div className="gap-2 text-white/50 flex mt-5">
        <div className="bg-primary/25 gap-1 p-1.5 rounded-lg flex grow overflow-hidden justify-center">
          <NoiseModePill
            label="Perlin"
            active={config.noiseMode === NoiseMode.PERLIN}
            onClick={() =>
              config.noiseMode !== NoiseMode.PERLIN
                ? setConfig({ noiseMode: NoiseMode.PERLIN })
                : undefined
            }
          />
          <NoiseModePill
            label="Worley"
            active={config.noiseMode === NoiseMode.WORLEY}
            onClick={() =>
              config.noiseMode !== NoiseMode.WORLEY
                ? setConfig({ noiseMode: NoiseMode.WORLEY })
                : undefined
            }
          />
        </div>
      </div>

      <Break />

      <div className="flex flex-col gap-2">
        <Subtitle>Transform</Subtitle>
        <div>
          <p className="text-white/50 text-sm">Offset</p>
          <div className="grid grid-cols-2 gap-2">
            <NumberField
              leftAdornement={"X"}
              name={"offset-x"}
              variant="primary"
              value={config.noiseData.offset[0]}
              onChange={(e) =>
                setConfig({
                  noiseData: {
                    ...config.noiseData,
                    offset: [
                      parseInt(e.currentTarget.value),
                      config.noiseData.offset[1],
                    ],
                  },
                })
              }
            />
            <NumberField
              leftAdornement={"Y"}
              name={"offset-y"}
              variant="primary"
              value={config.noiseData.offset[1]}
              onChange={(e) =>
                setConfig({
                  noiseData: {
                    ...config.noiseData,
                    offset: [
                      config.noiseData.offset[0],
                      parseInt(e.currentTarget.value),
                    ],
                  },
                })
              }
            />
          </div>
        </div>
        <SliderField
          name="scale"
          label="Scale"
          min={0}
          max={1000}
          value={config.noiseData.scale}
          onValueChange={(v) =>
            setConfig({ noiseData: { ...config.noiseData, scale: v[0] } })
          }
        />
      </div>

      <Break />

      <div className="flex flex-col gap-2 w-full">
        <Subtitle>Generation</Subtitle>
        <div className="flex gap-1.5 items-end">
          <div className="grow min-w-0">
            <InputField
              label="Seed"
              name="seed"
              variant="primary"
              value={config.noiseData.seed}
              onChange={(e) =>
                setConfig({
                  noiseData: {
                    ...config.noiseData,
                    seed: e.currentTarget.value,
                  },
                })
              }
            />
          </div>
          <Button
            type="button"
            onClick={() =>
              setConfig({
                noiseData: { ...config.noiseData, seed: crypto.randomUUID() },
              })
            }
          >
            <Dice className="size-5" />
          </Button>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(config.noiseData.seed);
            }}
          >
            <Copy className="size-5" />
          </Button>
        </div>
        {config.noiseMode === NoiseMode.WORLEY ? (
          <IncrementField
            label="Worley points"
            name="worleySeeds"
            variant="primary"
            value={config.worleySeeds}
            onChange={(v) => setConfig({ worleySeeds: v })}
          />
        ) : null}

        <div className="relative w-full">
          <InputField
            name="color"
            label="Color"
            variant="primary"
            disabled
            cursor="cursor-pointer"
            value={rgbToHex(config.color)}
            leftAdornement={
              <div
                style={{ backgroundColor: rgbToCSS(config.color) }}
                className="size-5 rounded-md outline-1 outline-white"
              />
            }
            rightAdornement={
              <Chevron
                className={`text-primary size-5 transition-all duration-500 ${colorPicker ? "" : "rotate-180"}`}
              />
            }
            onClick={() => setColorPicker((prev) => !prev)}
          />
          <div
            className={`
              absolute z-10 w-full flex
              top-full left-0
              overflow-hidden transition-all duration-500
              bg-accent/75 rounded-md
              outline-primary/50
              ${colorPicker ? "h-60 outline-1" : "h-0"}
            `}
          >
            <RgbColorPicker
              className="grow m-5"
              color={config.color}
              onChange={(color) => setConfig({ color: color })}
            />
          </div>
        </div>
      </div>

      <Break />

      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center">
          <Subtitle>Fractal</Subtitle>
          <Toggle
            active={config.fractal}
            setActive={(b) => setConfig({ fractal: b })}
          />
        </div>
        {config.fractal && (
          <div className="flex gap-1.5 items-end">
            <div className="grow min-w-0">
              <SliderField
                label="Octaves"
                name="octaves"
                min={1}
                max={8}
                step={1}
                value={config.fractalData.octaves}
                onValueChange={(v) =>
                  setConfig({
                    fractalData: { ...config.fractalData, octaves: v[0] },
                  })
                }
              />
              <SliderField
                label="Persistence"
                name="persistence"
                min={0}
                max={1}
                step={0.01}
                value={config.fractalData.persistence}
                onValueChange={(v) =>
                  setConfig({
                    fractalData: { ...config.fractalData, persistence: v[0] },
                  })
                }
              />
              <SliderField
                label="Lacunarity"
                name="lacunarity"
                min={1}
                max={4}
                step={0.01}
                value={config.fractalData.lacunarity}
                onValueChange={(v) =>
                  setConfig({
                    fractalData: { ...config.fractalData, lacunarity: v[0] },
                  })
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
