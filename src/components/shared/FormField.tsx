import type { ChangeEvent, ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  className?: string;
  as?: "input" | "textarea" | "select";
  type?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  children?: ReactNode;
};

// Shared shape behind every "apply" form (careers, internships): a label,
// one input/textarea/select, and an inline error — wired to the apply-*
// CSS classes those forms already used before this was a component.
export default function FormField({
  id,
  label,
  optional,
  error,
  className,
  as = "input",
  type = "text",
  value,
  onChange,
  placeholder,
  children,
}: FormFieldProps) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={className ? `apply-field ${className}` : "apply-field"}>
      <label htmlFor={id} className="apply-field-label">
        {label} {optional && <span className="normal-case text-soft-white/55">(optional)</span>}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          className="apply-textarea"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={errorId}
        />
      ) : as === "select" ? (
        <select
          id={id}
          className="apply-select"
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
          aria-describedby={errorId}
        >
          {children}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          className="apply-input"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={errorId}
        />
      )}
      {error && (
        <p id={errorId} className="apply-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
