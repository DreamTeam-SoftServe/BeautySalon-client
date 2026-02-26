import { THEME } from "../../shared/config/theme";
import type { CSSProperties } from "react";

export const sectionStyle: CSSProperties = {
  padding: "120px 5%",
  background: THEME.colors.offwhite,
  position: "relative",
  overflow: "hidden",
};

const basePattern: CSSProperties = {
  position: "absolute",
  width: "500px",
  height: "500px",
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='none' stroke='%23C9A84C' stroke-width='0.5' d='M50 0 C60 30 100 40 100 50 C100 60 60 70 50 100 C40 70 0 60 0 50 C0 40 40 30 50 0 Z'/%3E%3Ccircle cx='50' cy='50' r='15' fill='none' stroke='%23C9A84C' stroke-width='0.5'/%3E%3Cpath fill='none' stroke='%23C9A84C' stroke-width='0.5' d='M50 20 C55 35 80 45 80 50 C80 55 55 65 50 80 C45 65 20 55 20 50 C20 45 45 35 50 20 Z'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  opacity: 0.5,
  pointerEvents: "none",
  zIndex: 0,
};

export const decor1: CSSProperties = {
  ...basePattern,
  top: "-5%",
  left: "-300px",
  transform: "rotate(15deg)",
};

export const decor2: CSSProperties = {
  ...basePattern,
  top: "40%",
  right: "-350px",
  transform: "rotate(80deg)",
};

export const decor3: CSSProperties = {
  ...basePattern,
  bottom: "0%",
  left: "-250px",
  transform: "rotate(145deg)",
};

export const containerStyle: CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  position: "relative",
  zIndex: 2,
};

export const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: "48px 32px",
};

export const ctaWrapStyle: CSSProperties = {
  textAlign: "center",
  marginTop: "64px",
};
