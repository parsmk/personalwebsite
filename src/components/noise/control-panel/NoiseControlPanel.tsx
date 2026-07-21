import { useState } from "react";

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
  showPanel: boolean;
  setConfig: (config: Partial<NoiseConfig>) => void;
};

export const NoiseControlPanel = ({
  config,
  showPanel,
  setConfig,
}: NoiseControlPanelProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <NoiseConfigProvider value={{ config, setConfig }}>
      <div
        className={`
          max-w-[25%] z-20
          flex flex-col p-5
          absolute top-1/2 -translate-y-1/2 left-3
          bg-accent/75 outline-1 outline-primary/50 rounded-md
          transition-all duration-300
          ${showPanel ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        <div className="flex gap-2 items-center">
          <div
            className={`
            flex items-center justify-center size-10
            bg-primary/75 group hover:bg-primary
            rounded-md border-2 border-secondary/25 hover:border-secondary/50
            cursor-pointer
            transition duration-300
          `}
            onClick={() => setVisible(!visible)}
          >
            <Arrow
              className={`
                fill-accent/75 size-7.5
                group-hover:fill-accent 
                ${
                  visible
                    ? "-rotate-90 group-hover:-translate-y-0.5 group-hover:-translate-x-0.5"
                    : "rotate-90 group-hover:translate-y-0.5 group-hover:translate-x-0.5"
                }
                transition duration-300 
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
        <div
          className={`
            grid transition-all duration-500 ease-in-out
            ${visible ? "grid-rows-[1fr] grid-cols-[1fr]" : "grid-rows-[0fr] grid-cols-[0fr]"}
          `}
        >
          <div className="overflow-hidden min-h-0 flex flex-col">
            <div className="p-1">
              <NoiseModePills />
              <NoiseBreak />
              <NoiseTransformSection />
              <NoiseBreak />
              <NoiseGenSection />
              <NoiseBreak />
              <NoiseFractalSection />
            </div>
          </div>
        </div>
      </div>
    </NoiseConfigProvider>
  );
};
