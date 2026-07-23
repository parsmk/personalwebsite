export type InputFieldVariants = "primary" | "outline";

type InputFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  variant?: InputFieldVariants;
  leftAdornement?: React.ReactNode;
  rightAdornement?: React.ReactNode;
  required?: boolean;
  multiline?: boolean;
  disabled?: boolean;
  showOptional?: boolean;
  centerText?: boolean;
  cursor?: "cursor-not-allowed" | "cursor-pointer" | "cursor-default";
  onChange?: React.ChangeEventHandler<HTMLInputElement & HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement & HTMLTextAreaElement>;
  onClick?: React.MouseEventHandler;
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
  centerText = false,
  cursor,
  onChange,
  onBlur,
  onClick,
}: InputFieldProps) => {
  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement & HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  const inputClasses = `
    grow min-w-0 focus:outline-none p-2
    ${centerText ? "text-center" : null}
    ${disabled ? "pointer-events-none" : ""}
  `;

  const adornments = "text-xs self-center";

  const variants: Record<InputFieldVariants, string> = {
    primary: `outline-primary/75 bg-secondary/15 text-white`,
    outline: `outline-accent/20 
      hover:outline-accent/75 hover:shadow-md hover:shadow-primary/25
      focus-within:outline-accent/75 focus-within:shadow-md focus-within:shadow-primary/25`,
  };

  const labelVariants: Record<InputFieldVariants, string> = {
    primary: `text-white/50`,
    outline: `text-black/50`,
  };

  return (
    <div
      className={`h-full flex flex-col gap-1 group ${cursor ?? ""}`}
      onClick={onClick}
    >
      {label && (
        <label className={`${labelVariants[variant]} text-sm`} htmlFor={name}>
          {label}
          {!required && showOptional ? (
            <span className="text-accent/50"> — optional</span>
          ) : null}
        </label>
      )}
      <div
        className={`${variants[variant]} flex outline-1 grow rounded-lg transition-all duration-300`}
      >
        {leftAdornement && (
          <div className={`${adornments} ml-3 mr-1`}>{leftAdornement}</div>
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
            className={`${inputClasses} h-40 lg:h-50 xl:h-60`}
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
          <div className={`${adornments} mr-3 ml-1`}>{rightAdornement}</div>
        )}
      </div>
    </div>
  );
};
