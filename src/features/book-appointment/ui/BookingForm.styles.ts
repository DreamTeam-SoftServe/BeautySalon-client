import { THEME } from "../../../shared/config/theme";
import type { CSSProperties } from "react";


export const datePickerLabelStyle: CSSProperties = {
  display: "block",
  fontFamily: THEME.fonts.sans,
  fontSize: "0.65rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: THEME.colors.gold,
  marginBottom: "8px",
};


export const successWrapStyle: CSSProperties = {
  textAlign: "center",
  padding: "60px 40px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
};

export const successIconStyle: CSSProperties = {
  fontSize: "4rem",
  color: THEME.colors.gold,
  marginBottom: "20px",
};

export const successTitleStyle: CSSProperties = {
  fontFamily: THEME.fonts.display,
  fontSize: "2.5rem",
  color: THEME.colors.cream,
  marginBottom: "30px",
};

export const dateLabelWrapStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

export const successContainerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  padding: "40px 0",
};

export const mainContainerStyle: CSSProperties = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const progressBarWrapStyle: CSSProperties = {
  position: "fixed",
  top: "80px", 
  left: 0,
  width: "100%",
  height: "3px",
  backgroundColor: "rgba(0,0,0,0.05)",
  zIndex: 999,
};

export const getProgressBarFillStyle = (step: number): CSSProperties => ({
  width: `${(step / 4) * 100}%`,
  height: "100%",
  backgroundColor: THEME.colors.gold,
  transition: "width 0.4s ease-in-out",
});

export const formStyle: CSSProperties = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minHeight: "300px",
};

export const stepContainerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "20px", 
  width: "100%",
  animation: "fadeIn 0.2s ease",
};

export const stepSimpleContainerStyle: CSSProperties = {
  animation: "fadeIn 0.2s ease",
};

export const modeButtonStyle: CSSProperties = {
  width: "100%",
  padding: "18px 24px",
  border: `1px solid ${THEME.colors.gold}`,
  borderRadius: "4px",
  backgroundColor: "transparent",
  color: THEME.colors.charcoal,
  fontSize: "0.95rem",
  fontFamily: THEME.fonts.sans,
  fontWeight: 500,
  letterSpacing: "0.5px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  textTransform: "uppercase",
};

export const dateRowStyle: CSSProperties = {
  display: "flex",
  gap: "20px",
};

export const flexColStyle: CSSProperties = {
  flex: 1,
};

export const navRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "50px",
  gap: "16px",
};

export const backButtonStyle: CSSProperties = {
  flex: 1,
  padding: "12px 24px",
  backgroundColor: "transparent",
  border: `1px solid ${THEME.colors.gold}`,
  color: THEME.colors.gold,
  borderRadius: "4px",
  cursor: "pointer",
  fontFamily: THEME.fonts.sans,
  fontWeight: 500,
  fontSize: "0.9rem",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  transition: "all 0.2s ease",
};