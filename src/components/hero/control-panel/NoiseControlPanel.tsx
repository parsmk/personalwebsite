import { NoiseTransformSection } from "./NoiseTransformSection";
import { NoiseBreak } from "./NoiseBreak";
import { NoiseConfigProvider } from "./NoiseConfigContext";
import { NoiseGenSection } from "./NoiseGenSection";
import { NoiseFractalSection } from "./NoiseFractalSection";
import { NoiseHeaderSection } from "./NoiseHeaderSection";

import type { NoiseConfig } from "../shaders/utils";

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
        max-w-[33%]
        flex flex-col p-5
        absolute top-1/2 -translate-y-1/2 left-3
        bg-accent/75 outline-1 outline-primary/50 rounded-md
      "
    >
      <NoiseHeaderSection />

      <NoiseBreak />

      <NoiseTransformSection />

      <NoiseBreak />

      <NoiseGenSection />

      <NoiseBreak />

      <NoiseFractalSection />
    </div>
  </NoiseConfigProvider>
);
