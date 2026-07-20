import { createContext, useContext } from "react";

import type { NoiseConfig } from "../shaders/utils";

type NoiseConfigContextValue = {
  config: NoiseConfig;
  setConfig: (config: Partial<NoiseConfig>) => void;
};

const NoiseConfigContext = createContext<NoiseConfigContextValue | null>(null);

export const NoiseConfigProvider = NoiseConfigContext.Provider;

export const useNoiseConfig = (): NoiseConfigContextValue => {
  const ctx = useContext(NoiseConfigContext);
  if (!ctx) throw new Error("useNoiseConfig must be used within NoiseConfigProvider");
  return ctx;
};
