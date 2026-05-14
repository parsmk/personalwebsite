import { Minus } from "../svgs/Minus";
import { Plus } from "../svgs/Plus";
import { InputField, type InputFieldVariants } from "./InputField";

type IncrementFieldProps = {
  name: string;
  value?: number;
  label?: string;
  variant?: InputFieldVariants;
  onChange?: (v: number) => void;
};

export const IncrementField = ({
  name,
  value = 0,
  label,
  variant,
  onChange = () => undefined,
}: IncrementFieldProps) => {
  return (
    <InputField
      name={name}
      label={label}
      variant={variant}
      value={value?.toString()}
      disabled
      centerText
      leftAdornement={
        <Minus
          className="size-5 cursor-pointer"
          onClick={() => onChange(value - 1)}
        />
      }
      rightAdornement={
        <Plus
          className="size-5 cursor-pointer"
          onClick={() => onChange(value + 1)}
        />
      }
    />
  );
};
