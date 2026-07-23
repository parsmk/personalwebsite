import { useEffect, useRef, useState } from "react";

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
}: NoiseControlPanelProps) => {
  const [expandPanel, setExpandPanel] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const hasInteracted = useRef<boolean>(false);

  useEffect(() => {
    const target = document.getElementById("noise-prompt");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (expandPanel && !entry.isIntersecting) {
          setExpandPanel(false);
        }
      },
      { threshold: 1 },
    );
    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <NoiseConfigProvider value={{ config, setConfig }}>
      <div
        className={`
          w-[90%] 2xl:w-[50%] z-20
          flex flex-col p-5
          absolute top-2 left-1/2 -translate-x-1/2
          bg-accent/75 outline-1 outline-primary/50 rounded-md
          transition-all duration-300
          ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
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
            onClick={() => {
              setExpandPanel(!expandPanel);
              if (!hasInteracted.current) hasInteracted.current = true;
            }}
          >
            <Arrow
              className={`
                fill-accent/75 size-7.5
                group-hover:fill-accent 
                ${
                  expandPanel
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
            ${expandPanel ? "grid-rows-[1fr] grid-cols-[1fr]" : "grid-rows-[0fr] grid-cols-[0fr]"}
          `}
        >
          <div className="overflow-hidden min-h-0 flex flex-col z-20">
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
