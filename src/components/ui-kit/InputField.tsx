import type { ChangeEventHandler } from "react";

interface Props {
  label: string;
  name: string;
  placeholder?: string;
  type?: "text" | "number" | "multiline";
  value?: string;
  required?: boolean;
  inputClasses?: string;
  onChange?: ChangeEventHandler<HTMLInputElement & HTMLTextAreaElement>;
}

export const InputField = ({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
  inputClasses = "",
  onChange,
}: Props) => {
  const _inputClasses = `
    p-2 my-1 w-full rounded-lg outline-1 outline-accent/20
    focus:outline-accent/75 hover:outline-accent/75 hover:shadow-md hover:shadow-primary/25
    transition-all
    ${inputClasses}
  `;

  return (
    <div className="w-full">
      <label className="text-right text-sm" htmlFor={name}>
        {label}
        {!required ? <span className="text-accent/50"> — optional</span> : null}
      </label>
      {type === "multiline" ? (
        <textarea
          name={name}
          className={_inputClasses}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
        />
      ) : (
        <input
          name={name}
          type={type}
          className={_inputClasses}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
        />
      )}
    </div>
  );
};
