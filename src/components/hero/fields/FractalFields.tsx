import { InputField } from "../../ui-kit/InputField";
import type { RenderConfig } from "../HeroBG";
import { FieldCard, FieldCardPos } from "./FieldCard";

type FractalFieldsProps = {
  config: RenderConfig;
  setConfig: (next: RenderConfig) => void;
};

export const FractalFields = ({ config, setConfig }: FractalFieldsProps) => {
  return (
    <FieldCard pos={FieldCardPos.RIGHT}>
      <InputField label="octaves" name={""} />
      <InputField label="lacunarity" name={""} />
      <InputField label="persistence" name={""} />
    </FieldCard>
  );
};
