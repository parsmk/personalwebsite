import { InputField, type InputFieldVariants } from "./InputField";

type NumberFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  value?: number;
  required?: boolean;
  disabled?: boolean;
  variant?: InputFieldVariants;
  leftAdornement?: React.ReactNode;
  rightAdornement?: React.ReactNode;
  decimalPlaces?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
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
  decimalPlaces,
  onChange,
}: NumberFieldProps) => {
  return (
    <InputField
      name={name}
      label={label}
      placeholder={placeholder}
      value={value?.toFixed(decimalPlaces ?? 0)}
      required={required}
      leftAdornement={leftAdornement}
      rightAdornement={rightAdornement}
      disabled={disabled}
      variant={variant}
      onChange={onChange}
    />
  );
};
