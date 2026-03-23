import type { NoiseProps } from "../../../scripts/NoiseUtil";
import { InputField } from "../../ui-kit/InputField";

type NoiseFieldsProps = {
  noiseData: NoiseProps;
  setNoiseData: (next: NoiseProps) => void;
};

export const NoiseFields = ({ noiseData, setNoiseData }: NoiseFieldsProps) => {
  return (
    <div>
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
              setNoiseData({
                ...noiseData,
                offset: [val, noiseData.offset[1]],
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
              setNoiseData({
                ...noiseData,
                offset: [noiseData.offset[0], val],
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
            value={noiseData.offset[0].toFixed(2)}
            onChange={(e) => {
              const val = Number(e.currentTarget.value);
              setNoiseData({
                ...noiseData,
                offset: [val, noiseData.offset[1]],
              });
            }}
            placeholder={"0"}
          />
          <InputField
            label={"y"}
            type="number"
            name={"size-y"}
            value={noiseData.offset[1].toFixed(2)}
            onChange={(e) => {
              const val = Number(e.currentTarget.value);
              setNoiseData({
                ...noiseData,
                offset: [noiseData.offset[0], val],
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
          setNoiseData({ ...noiseData, scale: val });
        }}
      />
    </div>
  );
};