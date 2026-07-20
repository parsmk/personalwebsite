import { NoiseTransformSection } from "./NoiseTransformSection";
import { NoiseBreak } from "./NoiseBreak";
import { NoiseConfigProvider } from "./NoiseConfigContext";
import { NoiseGenSection } from "./NoiseGenSection";
import { NoiseFractalSection } from "./NoiseFractalSection";
import { NoiseModePills } from "./NoiseModePills";

import type { NoiseConfig } from "../shaders/utils";
import { Arrow } from "../../svgs/Arrow";

type NoiseControlPanelProps = {
  config: NoiseConfig;
  setConfig: (config: Partial<NoiseConfig>) => void;
};

export const NoiseControlPanel = ({
  config,
  setConfig,
}: NoiseControlPanelProps) => (
  <NoiseConfigProvider value={{ config, setConfig }}>
    <div
      className="
        max-w-[33%] z-20
        flex flex-col p-5
        absolute top-1/2 -translate-y-1/2 left-3
        bg-accent/75 outline-1 outline-primary/50 rounded-md
      "
    >
      <div className="flex gap-2 items-center">
        <div
          className={`
            flex items-center justify-center size-10 rotate-270 
            bg-primary/75 group hover:bg-primary
            rounded-md border-2 border-secondary/25 hover:border-secondary/50
            cursor-pointer
            transition duration-300
          `}
        >
          <Arrow
            className={`
              fill-accent/75 size-7.5 
              group-hover:fill-accent transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5
            `}
          />
        </div>
        <div>
          <h3 className="text-md text-white">Noise Generator</h3>
          <p className="text-primary">
            {`${config.noiseMode.charAt(0).toUpperCase() + config.noiseMode.slice(1)} · ${config.noiseData.size[0]} x ${config.noiseData.size[1]}`}
          </p>
        </div>
      </div>

      <NoiseModePills />

      <NoiseBreak />

      <NoiseTransformSection />

      <NoiseBreak />

      <NoiseGenSection />

      <NoiseBreak />

      <NoiseFractalSection />
    </div>
  </NoiseConfigProvider>
);
