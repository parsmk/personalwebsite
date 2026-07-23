import { NoiseMode } from "../shaders/utils";
import { useNoiseConfig } from "./NoiseConfigContext";
import { NoiseModePill } from "./NoiseModePill";

export const NoiseModePills = () => {
  const { config, setConfig } = useNoiseConfig();

  return (
    <div className="text-white/50 flex mt-5">
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
  );
};
