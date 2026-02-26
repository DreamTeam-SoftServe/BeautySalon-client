import { useI18n } from "../../i18n";
import { wrapStyle, labelStyle, getSelectStyle, errorStyle } from "./Select.styles";

interface SelectProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  error?: string;
  disabled?: boolean;
}

export function Select({ label, name, value, onChange, options, error }: SelectProps) {
  const { t } = useI18n();

  return (
    <div style={wrapStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={getSelectStyle(error, !!value)}
      >
        <option value="">{t.booking.fields.selectPh}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
}