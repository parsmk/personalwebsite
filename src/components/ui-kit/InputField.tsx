import type { ChangeEventHandler } from "react";

export type InputFieldVariants = "primary" | "outline";

type InputFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  leftAdornement?: React.ReactNode;
  rightAdornement?: React.ReactNode;
  multiline?: boolean;
  disabled?: boolean;
  variant?: InputFieldVariants;
  showOptional?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement & HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement & HTMLTextAreaElement>;
};

export const InputField = ({
  name,
  label,
  placeholder,
  value,
  required = false,
  leftAdornement,
  rightAdornement,
  multiline = false,
  disabled = false,
  variant = "outline",
  showOptional = false,
  onChange,
  onBlur,
}: InputFieldProps) => {
  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement & HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };
  const inputClasses = "grow focus:outline-none p-2";

  const adornmentClasses = "text-xs ml-3 mr-1 self-center";

  const variantClasses: Record<InputFieldVariants, string> = {
    primary: `outline-primary/75 bg-secondary/15 text-white`,
    outline: `outline-accent/20 
      hover:outline-accent/75 hover:shadow-md hover:shadow-primary/25
      focus-within:outline-accent/75 focus-within:shadow-md focus-within:shadow-primary/25`,
  };

  return (
    <div className="h-full flex flex-col">
      {label && (
        <label className="text-white/50 text-sm" htmlFor={name}>
          {label}
          {!required && showOptional ? (
            <span className="text-accent/50"> — optional</span>
          ) : null}
        </label>
      )}
      <div
        className={`${variantClasses[variant]} flex outline-1 my-1 grow rounded-lg transition-all duration-300`}
      >
        {leftAdornement && (
          <div className={adornmentClasses}>{leftAdornement}</div>
        )}
        {multiline ? (
          <textarea
            name={name}
            placeholder={placeholder}
            value={value}
            required={required}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            className={inputClasses}
            disabled={disabled}
          />
        ) : (
          <input
            name={name}
            type="text"
            value={value}
            placeholder={placeholder}
            required={required}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            className={inputClasses}
            disabled={disabled}
          />
        )}
        {rightAdornement && (
          <div className={adornmentClasses}>{rightAdornement}</div>
        )}
      </div>
    </div>
  );
};
