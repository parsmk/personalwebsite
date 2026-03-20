interface Props {
  label: string;
  name: string;
  placeholder: string;
  multiline?: boolean;
  required?: boolean;
  inputClasses?: string;
}

export default function InputField({
  label,
  name,
  placeholder,
  multiline = false,
  required = false,
  inputClasses = "",
}: Props) {
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
      {multiline ? (
        <textarea
          name={name}
          className={_inputClasses}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          name={name}
          className={_inputClasses}
          type="text"
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
}
