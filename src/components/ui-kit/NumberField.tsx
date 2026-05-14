import { InputField, type InputFieldVariants } from "./InputField";

type NumberFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  variant?: InputFieldVariants;
  leftAdornement?: React.ReactNode;
  rightAdornement?: React.ReactNode;
};

export const NumberField = ({
  name,
  label,
  placeholder,
  value,
  required = false,
  leftAdornement,
  rightAdornement,
  disabled = false,
  variant,
}: NumberFieldProps) => {
  return (
    <InputField
      name={name}
      label={label}
      placeholder={placeholder}
      value={value}
      required={required}
      leftAdornement={leftAdornement}
      rightAdornement={rightAdornement}
      disabled={disabled}
      variant={variant}
    />
  );
};
