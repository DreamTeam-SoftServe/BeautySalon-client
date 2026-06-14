import type { CSSProperties } from "react";
import { THEME } from "../../shared/config/theme";


export const pageWrapStyle: CSSProperties = {
  minHeight: "120vh",
  paddingTop: "80px",
  background: THEME.colors.offwhite,
};

export const containerStyle: CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "40px 20px",
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
  top: "40%",
  left: "-350px",
  transform: "rotate(150deg)",
};

export const decor2: CSSProperties = {
  ...basePattern,
  top: "60%",
  right: "-200px",
  transform: "rotate(30deg)",
};


export const topActionsStyle: CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "20px",
};

export const tabsWrapStyle: CSSProperties = {
  display: "flex",
  gap: "24px",
  flexWrap: "wrap",
  marginBottom: "40px",
  borderBottom: "1px solid #EFEFEF",
  paddingBottom: "12px",
};

export const getTabStyle = (isActive: boolean): CSSProperties => ({
  background: "none",
  border: "none",
  padding: "0 0 12px 0",
  marginBottom: "-13px",
  fontSize: "16px",
  cursor: "pointer",
  fontWeight: isActive ? 600 : 400,
  color: isActive ? "#D4C5A0" : "#7A7A7A",
  borderBottom: isActive ? "2px solid #D4C5A0" : "2px solid transparent",
  transition: "all 0.2s ease",
});

export const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "30px",
};

export const cardStyle: CSSProperties = {
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease",
};

export const imgWrapStyle: CSSProperties = {
  width: "100%",
  height: "280px",
  overflow: "hidden",
  cursor: "pointer",
};

export const imgStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.5s ease",
};

export const contentWrapStyle: CSSProperties = {
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  flex: 1,
};

export const brandStyle: CSSProperties = {
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "#A0A0A0",
  marginBottom: "8px",
};

export const nameStyle: CSSProperties = {
  fontSize: "20px",
  fontWeight: 500,
  color: "#1A1A1A",
  marginBottom: "12px",
  cursor: "pointer",
};

export const priceRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
  marginTop: "auto",
};

export const priceStyle: CSSProperties = {
  fontSize: "18px",
  fontWeight: 600,
  color: "#D4C5A0",
};

export const stockStyle: CSSProperties = {
  fontSize: "14px",
  color: "#7A7A7A",
};

export const buttonsRowStyle: CSSProperties = {
  display: "flex",
  gap: "12px",
};