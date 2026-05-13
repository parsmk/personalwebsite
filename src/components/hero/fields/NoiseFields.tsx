import { RgbColorPicker } from "react-colorful";
import { NoiseModes, type NoiseProps } from "../../../scripts/noise/NoiseUtil";
import { InputField } from "../../ui-kit/InputField";
import { FieldCard, FieldCardPos } from "./FieldCard";
import type { RenderConfig } from "../HeroBG";

type NoiseFieldsProps = {
  config: RenderConfig;
  setConfig: (next: RenderConfig) => void;
};

export const NoiseFields = ({ config, setConfig }: NoiseFieldsProps) => {
  const noiseData = config.noiseData;

  return (
    <FieldCard pos={FieldCardPos.LEFT}>
      <div>
        <p>Offset</p>
        <div className="flex gap-3">
          <InputField
            label={"x"}
            type="number"
            name={"offset-x"}
            value={noiseData.offset[0].toFixed(2)}
            onChange={(e) => {
              const val = Number(e.currentTarget.value);
              setConfig({
                ...config,
                noiseData: {
                  ...noiseData,
                  ...{ offset: [val, noiseData.offset[0]] },
                },
              });
            }}
            placeholder={"0"}
          />
          <InputField
            label={"y"}
            type="number"
            name={"offset-y"}
            value={noiseData.offset[1].toFixed(2)}
            onChange={(e) => {
              const val = Number(e.currentTarget.value);
              setConfig({
                ...config,
                noiseData: {
                  ...noiseData,
                  ...{ offset: [val, noiseData.offset[1]] },
                },
              });
            }}
            placeholder={"0"}
          />
        </div>
      </div>
      <div>
        <p>Size</p>
        <div className="flex gap-3">
          <InputField
            label={"x"}
            type="number"
            name={"size-x"}
            value={noiseData.size[0].toFixed(2)}
            onChange={(e) => {
              const val = Number(e.currentTarget.value);
              setConfig({
                ...config,
                noiseData: {
                  ...noiseData,
                  offset: [val, noiseData.size[0]],
                },
              });
            }}
            placeholder={"0"}
          />
          <InputField
            label={"y"}
            type="number"
            name={"size-y"}
            value={noiseData.size[1].toFixed(2)}
            onChange={(e) => {
              const val = Number(e.currentTarget.value);
              setConfig({
                ...config,
                noiseData: {
                  ...noiseData,
                  offset: [val, noiseData.size[1]],
                },
              });
            }}
            placeholder={"0"}
          />
        </div>
      </div>
      <InputField
        label={"Scale"}
        type="number"
        name={"scale"}
        value={noiseData.scale.toFixed(2)}
        onChange={(e) => {
          const val = Number(e.currentTarget.value);
          setConfig({
            ...config,
            noiseData: { ...noiseData, scale: val },
          });
        }}
      />
      <InputField
        value={noiseData.seed}
        onChange={(e) =>
          setConfig({
            ...config,
            noiseData: { ...noiseData, seed: e.currentTarget.value },
          })
        }
        label={"Seed"}
        name={"seed"}
      />
      {config.noiseMode === NoiseModes.WORLEY && (
        <InputField
          name="worleySeedCount"
          label="Worley Seed count"
          value={config.worleySeeds.toFixed(0)}
          onChange={(e) =>
            setConfig({ ...config, worleySeeds: Number(e.currentTarget.value) })
          }
        />
      )}
      <div>
        <p className="mb-2">Color</p>
        <RgbColorPicker
          className="mx-auto opacity-50 group-hover:opacity-75 transition"
          color={config.color}
          onChange={(c) => setConfig({ ...config, color: c })}
        />
      </div>
    </FieldCard>
  );
};
