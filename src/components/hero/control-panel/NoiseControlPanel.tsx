import { rgbToCSS, rgbToHex } from "../../../scripts/ColorMap";
import { NoiseMode } from "../../../scripts/noise/NoiseUtil";

import { Copy } from "../../svgs/Copy";
import { Dice } from "../../svgs/Dice";

import { Button } from "../../ui-kit/Button";
import { IncermentField } from "../../ui-kit/IncrementField";
import { InputField } from "../../ui-kit/InputField";
import { NumberField } from "../../ui-kit/NumberField";

import type { RenderConfig } from "../NoiseBG";
import { ControlPanelSubtitle } from "./ControlPanelSubtitle";
import { NoiseModePill } from "./NoiseModePill";

type NoiseControlPanelProps = {
  noiseMode: NoiseMode;
  config: RenderConfig;
};

export const NoiseControlPanel = ({
  noiseMode,
  config,
}: NoiseControlPanelProps) => {
  return (
    <div
      className="
        max-w-[33%]
        flex flex-col gap-y-3 p-5 
        absolute bg-accent/75 top-1/2 -translate-y-1/2 left-3
        outline-1 outline-primary/50 rounded-md
      "
    >
      <div>
        <h3 className="text-md text-white">Noise Generator</h3>
        <p className="text-primary">
          {`${noiseMode.charAt(0).toUpperCase() + noiseMode.slice(1)} · ${config.noiseData.size[0]} x ${config.noiseData.size[1]}`}
        </p>
      </div>

      <div className="gap-2 text-white/50 flex">
        <div className="bg-primary/25 gap-1 p-1.5 rounded-lg flex grow overflow-hidden justify-center">
          <NoiseModePill
            label="Perlin"
            active={noiseMode === NoiseMode.PERLIN}
          />
          <NoiseModePill
            label="Worley"
            active={noiseMode === NoiseMode.WORLEY}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <ControlPanelSubtitle>Transform</ControlPanelSubtitle>
        <div>
          <p className="text-white/50 text-sm">Offset</p>
          <div className="grid grid-cols-2 gap-2">
            <NumberField
              leftAdornement={"X"}
              name={"offset-x"}
              variant="primary"
            />
            <NumberField
              leftAdornement={"Y"}
              name={"offset-y"}
              variant="primary"
            />
          </div>
        </div>
        <div>
          <p className="text-white/50 text-sm">Scale</p>
          <div>SLIDER</div>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <ControlPanelSubtitle>Generation</ControlPanelSubtitle>
        <div className="flex gap-1.5 items-end">
          <div className="grow min-w-0">
            <InputField label="Seed" name="seed" variant="primary" />
          </div>
          <Button>
            <Dice className="size-5" />
          </Button>
          <Button>
            <Copy className="size-5" />
          </Button>
        </div>
        {noiseMode === NoiseMode.WORLEY ? (
          <IncermentField
            label="Worley points"
            name="worleySeeds"
            variant="primary"
          />
        ) : null}
        <InputField
          name="color"
          label="Color"
          value={rgbToHex(config.color)}
          leftAdornement={
            <div
              style={{ backgroundColor: rgbToCSS(config.color) }}
              className="size-5 rounded-md"
            ></div>
          }
          variant="primary"
        />
      </div>

      {config.fractal && (
        <div className="flex flex-col gap-2 w-full">
          <ControlPanelSubtitle>
            Fractal
            <input type="checkbox" className="rounded-md ml-2" />
          </ControlPanelSubtitle>
          <div className="flex gap-1.5 items-end">
            <div className="grow min-w-0">
              <NumberField label="Octaves" name="octaves" variant="primary" />
              <NumberField
                label="Persistence"
                name="persistence"
                variant="primary"
              />
              <NumberField
                label="Lacunarity"
                name="lacunarity"
                variant="primary"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
