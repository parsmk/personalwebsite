import { NoiseMode } from "../shaders/utils";
import { useNoiseConfig } from "./NoiseConfigContext";
import { NoiseModePill } from "./NoiseModePill";

export const NoiseHeaderSection = () => {
  const { config, setConfig } = useNoiseConfig();

  return (
    <>
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
    </>
  );
};
