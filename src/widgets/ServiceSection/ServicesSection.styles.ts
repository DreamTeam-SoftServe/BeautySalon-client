import { THEME } from "../../shared/config/theme";
import type { CSSProperties } from "react";

export const sectionStyle: CSSProperties = {
  padding: "120px 5%",
  background: THEME.colors.offwhite,
  position: "relative",
  overflow: "hidden",
};

export const containerStyle: CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  position: "relative",
  zIndex: 0.5,
};

const basePattern: CSSProperties = {
  position: "absolute",
  width: "450px",
  height: "450px",
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='none' stroke='%23C9A84C' stroke-width='0.5' d='M50 0 C60 30 100 40 100 50 C100 60 60 70 50 100 C40 70 0 60 0 50 C0 40 40 30 50 0 Z'/%3E%3Ccircle cx='50' cy='50' r='15' fill='none' stroke='%23C9A84C' stroke-width='0.5'/%3E%3Cpath fill='none' stroke='%23C9A84C' stroke-width='0.5' d='M50 20 C55 35 80 45 80 50 C80 55 55 65 50 80 C45 65 20 55 20 50 C20 45 45 35 50 20 Z'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  opacity: 0.2,
  pointerEvents: "none",
  zIndex: 0,
};

export const decor1: CSSProperties = {
  ...basePattern,
  top: "2%",
  right: "-280px",
  transform: "rotate(30deg)",
};
export const decor2: CSSProperties = {
  ...basePattern,
  top: "30%",
  left: "-320px",
  transform: "rotate(-45deg)",
};
export const decor3: CSSProperties = {
  ...basePattern,
  top: "60%",
  right: "-250px",
  transform: "rotate(110deg)",
};
export const decor4: CSSProperties = {
  ...basePattern,
  bottom: "2%",
  left: "-200px",
  transform: "rotate(10deg)",
};

export const filterWrapStyle: CSSProperties = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  marginBottom: "48px",
};

export const getFilterButtonStyle = (active: boolean): CSSProperties => ({
  fontFamily: THEME.fonts.sans,
  fontSize: "0.7rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  padding: "8px 20px",
  border: `1px solid ${active ? THEME.colors.charcoal : "#D4C5A0"}`,
  background: active ? THEME.colors.charcoal : "transparent",
  color: active ? THEME.colors.cream : THEME.colors.muted,
  cursor: "pointer",
  transition: "all 0.2s",
});

export const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: "60px 20px",
};

export const ctaWrapStyle: CSSProperties = {
  textAlign: "center",
  marginTop: "64px",
};
