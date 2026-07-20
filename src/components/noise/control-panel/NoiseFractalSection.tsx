import { SliderField } from "../../ui-kit/SliderField";
import { Toggle } from "../../ui-kit/Toggle";

import { Subtitle } from "./NoiseSubtitle";
import { useNoiseConfig } from "./NoiseConfigContext";

export const NoiseFractalSection = () => {
  const { config, setConfig } = useNoiseConfig();

  return (
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
  );
};
