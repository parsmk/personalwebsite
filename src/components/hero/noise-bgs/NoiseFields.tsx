import { type SetStateAction } from "react";
import type { NoiseProps } from "../../../scripts/NoiseUtil";
import { InputField } from "../../ui-kit/InputField";

type NoiseFieldsProps = {
  noiseData: NoiseProps;
  setNoiseData: React.Dispatch<SetStateAction<NoiseProps>>;
};

export const INIT_NOISE: NoiseProps = {
  offset: [0, 0],
  scale: 150,
  size: [0, 0],
};

export const NoiseFields = ({ noiseData, setNoiseData }: NoiseFieldsProps) => {
  return (
    <div>
      <div className="flex gap-3">
        <InputField
          label={"x"}
          type="number"
          name={"offset-x"}
          value={noiseData.offset[0].toFixed(2)}
          onChange={(e) =>
            setNoiseData((prev) => ({
              ...prev,
              offset: [Number(e.currentTarget.value), prev.offset[1]],
            }))
          }
          placeholder={"0"}
        />
        <InputField
          label={"y"}
          type="number"
          name={"offset-y"}
          value={noiseData.offset[1].toFixed(2)}
          onChange={(e) =>
            setNoiseData((prev) => ({
              ...prev,
              offset: [prev.offset[0], Number(e.currentTarget.value)],
            }))
          }
          placeholder={"0"}
        />
      </div>
      <div className="flex gap-3">
        <InputField
          label={"x"}
          type="number"
          name={"size-x"}
          value={noiseData.offset[0].toFixed(2)}
          onChange={(e) =>
            setNoiseData((prev) => ({
              ...prev,
              offset: [Number(e.currentTarget.value), prev.offset[1]],
            }))
          }
          placeholder={"0"}
        />
        <InputField
          label={"y"}
          type="number"
          name={"size-y"}
          value={noiseData.offset[1].toFixed(2)}
          onChange={(e) =>
            setNoiseData((prev) => ({
              ...prev,
              offset: [prev.offset[0], Number(e.currentTarget.value)],
            }))
          }
          placeholder={"0"}
        />
      </div>
      <InputField
        label={"Scale"}
        type="number"
        name={"scale"}
        value={noiseData.scale.toFixed(2)}
        onChange={(e) => {
          setNoiseData((prev) => ({
            ...prev,
            scale: Number(e.currentTarget.value),
          }));
        }}
      />
    </div>
  );
};
