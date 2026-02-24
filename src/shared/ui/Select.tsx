import { THEME } from "../../shared/config/theme";
import { useI18n } from "../i18n";

interface SelectProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  error?: string;
  disabled?: boolean;
}

export function Select({
  label,
  name,
  value,
  onChange,
  options,
  error,
}: SelectProps) {
  const { t } = useI18n();

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
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "14px 16px",
          fontFamily: THEME.fonts.body,
          fontSize: "1rem",
          background: "transparent",
          border: `1px solid ${error ? "#C0392B" : "#D4C5A0"}`,
          color: value ? THEME.colors.charcoal : THEME.colors.muted,
          outline: "none",
          appearance: "none",
          cursor: "pointer",
        }}
      >
        <option value="">{t.booking.fields.selectPh}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
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
