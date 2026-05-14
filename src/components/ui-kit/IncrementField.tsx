import { Minus } from "../svgs/Minus";
import { Plus } from "../svgs/Plus";
import { InputField, type InputFieldVariants } from "./InputField";

type IncrementFieldProps = {
  name: string;
  label?: string;
  variant?: InputFieldVariants;
};

export const IncermentField = ({
  name,
  label,
  variant,
}: IncrementFieldProps) => {
  return (
    <InputField
      name={name}
      label={label}
      variant={variant}
      disabled
      leftAdornement={<Minus className="size-5" />}
      rightAdornement={<Plus className="size-5" />}
    />
  );
};
