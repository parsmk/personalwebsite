import { NumberField } from "../../ui-kit/NumberField";
import { SliderField } from "../../ui-kit/SliderField";

import { Subtitle } from "./NoiseSubtitle";
import { useNoiseConfig } from "./NoiseConfigContext";

export const NoiseTransformSection = () => {
  const { config, setConfig } = useNoiseConfig();
  return (
    <div className="flex flex-col gap-2">
      <Subtitle>Transform</Subtitle>
      <div>
        <p className="text-white/50 text-sm">Offset</p>
        <div className="grid grid-cols-2 gap-2">
          <NumberField
            leftAdornement={"X"}
            name={"offset-x"}
            variant="primary"
            value={config.noiseData.offset[0]}
            onChange={(e) =>
              setConfig({
                noiseData: {
                  ...config.noiseData,
                  offset: [
                    parseInt(e.currentTarget.value),
                    config.noiseData.offset[1],
                  ],
                },
              })
            }
          />
          <NumberField
            leftAdornement={"Y"}
            name={"offset-y"}
            variant="primary"
            value={config.noiseData.offset[1]}
            onChange={(e) =>
              setConfig({
                noiseData: {
                  ...config.noiseData,
                  offset: [
                    config.noiseData.offset[0],
                    parseInt(e.currentTarget.value),
                  ],
                },
              })
            }
          />
        </div>
      </div>
      <SliderField
        name="scale"
        label="Scale"
        min={0}
        max={1000}
        value={config.noiseData.scale}
        onValueChange={(v) =>
          setConfig({ noiseData: { ...config.noiseData, scale: v[0] } })
        }
      />
    </div>
  );
};
