import { THEME } from "../../shared/config/theme";
import type { CSSProperties } from "react";

export const sectionStyle: CSSProperties = {
  padding: "120px 5%",
  background: THEME.colors.white,
  position: "relative",
  overflow: "hidden",
};

export const containerStyle: CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "80px",
  alignItems: "start",
  position: "relative",
};

const basePattern: CSSProperties = {
  position: "absolute",
  width: "550px",
  height: "550px",
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='none' stroke='%23C9A84C' stroke-width='0.5' d='M50 0 C60 30 100 40 100 50 C100 60 60 70 50 100 C40 70 0 60 0 50 C0 40 40 30 50 0 Z'/%3E%3Ccircle cx='50' cy='50' r='15' fill='none' stroke='%23C9A84C' stroke-width='0.5'/%3E%3Cpath fill='none' stroke='%23C9A84C' stroke-width='0.5' d='M50 20 C55 35 80 45 80 50 C80 55 55 65 50 80 C45 65 20 55 20 50 C20 45 45 35 50 20 Z'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  opacity: 0.1,
  pointerEvents: "none",
  zIndex: 0,
};

export const decor1: CSSProperties = {
  ...basePattern,
  top: "-10%",
  left: "-350px",
  transform: "rotate(45deg)",
};

export const decor2: CSSProperties = {
  ...basePattern,
  bottom: "-20%",
  right: "-400px",
  transform: "rotate(-20deg)",
};

export const contactListStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "32px",
};

export const contactItemStyle: CSSProperties = {
  display: "flex",
  gap: "20px",
  alignItems: "flex-start",
};

export const iconStyle: CSSProperties = {
  width: "44px",
  height: "44px",
  background: "rgba(201,168,76,0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.1rem",
  flexShrink: 0,
};

export const labelStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.65rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: THEME.colors.gold,
  margin: "0 0 4px",
};

export const valueStyle: CSSProperties = {
  fontFamily: THEME.fonts.body,
  fontSize: "1rem",
  color: THEME.colors.charcoal,
  margin: 0,
  whiteSpace: "pre-line",
};

export const socialTitleStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.65rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: THEME.colors.gold,
  marginBottom: "16px",
};

export const socialLinkStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.7rem",
  letterSpacing: "0.1em",
  textDecoration: "none",
  color: THEME.colors.muted,
  padding: "8px 16px",
  border: "1px solid #D4C5A0",
  transition: "all 0.2s",
};

export const mapWrapperStyle: CSSProperties = {
  aspectRatio: "1",
  border: "1px solid #E8E0D0",
  overflow: "hidden",
  position: "relative",
};
