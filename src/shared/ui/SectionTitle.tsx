import { THEME } from "../../shared/config/theme";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
}

export function SectionTitle({
  subtitle,
  title,
  align = "left",
}: SectionTitleProps) {
  return (
    <div style={{ textAlign: align, marginBottom: "48px" }}>
      <p
        style={{
          fontFamily: THEME.fonts.sans,
          fontSize: "0.7rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: THEME.colors.gold,
          marginBottom: "12px",
        }}
      >
        {subtitle}
      </p>
      <h2
        style={{
          fontFamily: THEME.fonts.display,
          fontSize: "clamp(2rem, 4vw, 3.2rem)",
          fontWeight: 400,
          color: THEME.colors.charcoal,
          lineHeight: 1.2,
          margin: 0,
        }}
      >
        {title}
      </h2>
      <div
        style={{
          width: align === "center" ? "60px" : "40px",
          height: "1px",
          background: THEME.colors.gold,
          margin: align === "center" ? "20px auto 0" : "20px 0 0",
        }}
      />
    </div>
  );
}
