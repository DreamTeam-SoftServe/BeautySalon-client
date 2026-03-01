import { THEME } from "../../shared/config/theme";
import type { CSSProperties } from "react";

export const sectionStyle: CSSProperties = {
  padding: "120px 5%",
  background: THEME.colors.offwhite,
  position: "relative",
};

const basePattern: CSSProperties = {
  position: "absolute",
  width: "500px",
  height: "500px",
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='none' stroke='%23C9A84C' stroke-width='0.5' d='M50 0 C60 30 100 40 100 50 C100 60 60 70 50 100 C40 70 0 60 0 50 C0 40 40 30 50 0 Z'/%3E%3Ccircle cx='50' cy='50' r='15' fill='none' stroke='%23C9A84C' stroke-width='0.5'/%3E%3Cpath fill='none' stroke='%23C9A84C' stroke-width='0.5' d='M50 20 C55 35 80 45 80 50 C80 55 55 65 50 80 C45 65 20 55 20 50 C20 45 45 35 50 20 Z'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  opacity: 0.3,
  pointerEvents: "none",
  zIndex: 0,
};

export const aboutDecor1: CSSProperties = {
  ...basePattern,
  top: "-60px",
  left: "-120px",
  transform: "rotate(45deg)",
};

export const aboutDecor2: CSSProperties = {
  ...basePattern,
  bottom: "-80px",
  right: "95px",
  transform: "rotate(130deg)",
};

export const containerStyle: CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "80px",
  alignItems: "center",
};

export const imageBlockStyle: CSSProperties = {
  position: "relative",
};

export const mainImgStyle: CSSProperties = {
  width: "100%",
  aspectRatio: "4/5",
  objectFit: "cover",
  borderRadius: "8px",
  border: `3px solid ${THEME.colors.gold}`,
  display: "block",
};

export const accentCardStyle: CSSProperties = {
  position: "absolute",
  bottom: "-32px",
  right: "-32px",
  background: THEME.colors.charcoal,
  color: THEME.colors.cream,
  padding: "32px",
  borderRadius: "8px",
  border: `1px solid rgba(201,168,76,0.3)`,
  minWidth: "180px",
};

export const accentNumberStyle: CSSProperties = {
  fontFamily: THEME.fonts.display,
  fontSize: "3rem",
  color: THEME.colors.gold,
  margin: 0,
  lineHeight: 1,
};

export const accentLabelStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.65rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: THEME.colors.cream,
  margin: "8px 0 0",
  opacity: 0.7,
};

export const contentStyle: CSSProperties = {
  paddingLeft: "16px",
};

export const bodyStyle: CSSProperties = {
  fontFamily: THEME.fonts.body,
  fontSize: "1.05rem",
  color: THEME.colors.muted,
  lineHeight: 1.8,
  marginBottom: "48px",
};

export const featuresGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "24px",
  marginBottom: "48px",
};

export const featureItemStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

export const featureIconStyle: CSSProperties = {
  fontSize: "1.5rem",
  marginBottom: "4px",
};

export const featureTitleStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.8rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: THEME.colors.charcoal,
  fontWeight: 600,
};

export const featureDescStyle: CSSProperties = {
  fontFamily: THEME.fonts.body,
  fontSize: "0.9rem",
  color: THEME.colors.muted,
  lineHeight: 1.6,
};
