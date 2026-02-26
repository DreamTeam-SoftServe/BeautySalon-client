import { getWrapStyle, subtitleStyle, titleStyle, getLineStyle } from "./SectionTitle.styles";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
}

export function SectionTitle({ subtitle, title, align = "left" }: SectionTitleProps) {
  return (
    <div style={getWrapStyle(align)}>
      {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
      <h2 style={titleStyle}>{title}</h2>
      <div style={getLineStyle(align)} />
    </div>
  );
}