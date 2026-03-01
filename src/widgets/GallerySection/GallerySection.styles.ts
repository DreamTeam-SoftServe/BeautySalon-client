import { THEME } from "../../shared/config/theme";
import type { CSSProperties } from "react";

export const sectionStyle: CSSProperties = {
  padding: "120px 0",
  background: THEME.colors.cream,
  position: "relative",
  
};

export const containerStyle: CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 5%",
};

export const gridWrapperStyle: CSSProperties = {
  width: "100%",
  padding: "0 5%",
  boxSizing: "border-box",
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
  overflowX: "hidden", 
  zIndex: 0,
};

export const galleryDecor1: CSSProperties = {
  ...basePattern,
  top: "-80px",
  right: "90px",
  transform: "rotate(15deg)",
};

export const galleryDecor2: CSSProperties = {
  ...basePattern,
  bottom: "-100px",
  left: "-280px",
  transform: "rotate(200deg)",
};

export const headerStyle: CSSProperties = {
  textAlign: "center",
  marginBottom: "64px",
};

export const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  gridAutoRows: "auto",
  gap: "10px",
  width: "100%",
};

export const getCardStyle = (size?: string): CSSProperties => {
  const colSpan =
    size === "wide"   ? 4
    : size === "medium" ? 3
    : size === "slim"   ? 1
    : 2;

  const rowSpan =
    size === "small" ? 1 : 2;

  return {
    position: "relative",
    overflow: "hidden",
    borderRadius: "8px",
    border: `1px solid rgba(201,168,76,0.2)`,
    gridColumn: `span ${colSpan}`,
    gridRow: `span ${rowSpan}`,
    background: THEME.colors.charcoal,
    cursor: "pointer",
    minWidth: 0,
  };
};

export const imgStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.6s ease",
};

export const overlayStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(to top, rgba(30,25,20,0.7) 0%, transparent 60%)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  padding: "24px",
  opacity: 0,
  transition: "opacity 0.3s ease",
};

export const overlayTitleStyle: CSSProperties = {
  fontFamily: THEME.fonts.display,
  fontSize: "1.2rem",
  color: THEME.colors.cream,
  margin: "0 0 4px",
};

export const overlayTagStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.65rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: THEME.colors.gold,
  margin: 0,
};

export const ctaRowStyle: CSSProperties = {
  textAlign: "center",
  marginTop: "56px",
};