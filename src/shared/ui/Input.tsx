import { THEME } from "../../shared/config/theme";
import type { ChangeEvent, FocusEvent, CSSProperties } from "react";

interface InputProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  rows?: number;
  type?: string;
  style?: React.CSSProperties;
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
  const inputStyle: CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    fontFamily: THEME.fonts.body,
    fontSize: "1rem",
    background: "transparent",
    border: `1px solid ${error ? "#C0392B" : "#D4C5A0"}`,
    color: THEME.colors.charcoal,
    outline: "none",
    transition: "border-color 0.2s",
    resize: As === "textarea" ? "vertical" : "none",
  };

  const Tag = As;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && (
        <label
          style={{
            fontFamily: THEME.fonts.sans,
            fontSize: "0.75rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: THEME.colors.muted,
          }}
        >
          {label}
        </label>
      )}
      <Tag
        name={name}
        type={As === "textarea" ? undefined : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        style={inputStyle}
        onFocus={(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          (e.currentTarget.style.borderColor = THEME.colors.gold)
        }
        onBlur={(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          (e.currentTarget.style.borderColor = error ? "#C0392B" : "#D4C5A0")
        }
      />
      {error && (
        <span
          style={{
            fontFamily: THEME.fonts.sans,
            fontSize: "0.75rem",
            color: "#C0392B",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}
