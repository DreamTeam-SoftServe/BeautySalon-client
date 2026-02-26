import type { ChangeEvent, FocusEvent } from "react";
import { THEME } from "../../config/theme";
import { wrapStyle, labelStyle, getInputStyle, errorStyle } from "./Input.styles";

interface InputProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  rows?: number;
  type?: string;
  readOnly?: boolean;
  min?: string;
  as?: "input" | "textarea";
}

export function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  as: As = "input",
  rows,
}: InputProps) {
  const Tag = As;

  return (
    <div style={wrapStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <Tag
        name={name}
        type={As === "textarea" ? undefined : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        style={getInputStyle(error, As === "textarea")}
        onFocus={(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          (e.currentTarget.style.borderColor = THEME.colors.gold)
        }
        onBlur={(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          (e.currentTarget.style.borderColor = error ? "#C0392B" : "#D4C5A0")
        }
      />
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
}