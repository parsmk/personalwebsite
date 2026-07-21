import { useState } from "react";
import { RgbColorPicker, type RgbColor } from "react-colorful";

import { Chevron } from "../../svgs/Chevron";
import { Copy } from "../../svgs/Copy";
import { Dice } from "../../svgs/Dice";

import { Button } from "../../ui-kit/Button";
import { IncrementField } from "../../ui-kit/IncrementField";
import { InputField } from "../../ui-kit/InputField";
import { NumberField } from "../../ui-kit/NumberField";

import { NoiseMode } from "../shaders/utils";
import { Subtitle } from "./NoiseSubtitle";
import { useNoiseConfig } from "./NoiseConfigContext";

export const NoiseGenSection = () => {
  const { config, setConfig } = useNoiseConfig();
  const [colorPicker, setColorPicker] = useState<boolean>(false);

  const rgbToCSS = ({ r, g, b }: RgbColor): string => `rgb(${r}, ${g}, ${b})`;

  const rgbToHex = ({ r, g, b }: RgbColor): string =>
    `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Subtitle>Generation</Subtitle>
      <div className="flex gap-1.5 items-end">
        <div className="grow min-w-0">
          <NumberField
            label="Seed"
            name="seed"
            variant="primary"
            value={config.noiseData.seed}
            onChange={(e) =>
              setConfig({
                noiseData: {
                  ...config.noiseData,
                  seed: parseInt(e.currentTarget.value),
                },
              })
            }
          />
        </div>
        <Button
          type="button"
          onClick={() =>
            setConfig({
              noiseData: {
                ...config.noiseData,
                seed: Math.random() * 99999 + 1,
              },
            })
          }
        >
          <Dice className="size-5" />
        </Button>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(config.noiseData.seed.toString());
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
          value={rgbToHex(config.colorMax)}
          leftAdornement={
            <div
              style={{ backgroundColor: rgbToCSS(config.colorMax) }}
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
              absolute z-10 grid w-full
              top-full left-0
              overflow-hidden transition-all duration-500
              bg-accent/75 rounded-md
              outline-primary/50
              ${colorPicker ? "grid-rows-[1fr] outline-1" : "grid-rows-[0fr]"}
            `}
        >
          <div className="min-h-0 overflow-hidden flex">
            <RgbColorPicker
              className="m-5 grow"
              color={config.colorMax}
              onChange={(color) => setConfig({ colorMax: color })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
