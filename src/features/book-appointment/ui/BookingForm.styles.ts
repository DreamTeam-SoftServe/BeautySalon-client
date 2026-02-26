import { THEME } from "../../../shared/config/theme";
import type { CSSProperties } from "react";

export const bookingSectionStyle: CSSProperties = {
  height: "calc(100vh - 85px)",
  display: "flex",
  backgroundColor: THEME.colors.charcoal,
  position: "relative",
  overflow: "hidden",
  boxSizing: "border-box",
};

export const formSideStyle: CSSProperties = {
  width: "45%",
  padding: "0 6%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  paddingTop: "8vh",
  zIndex: 2,
};

export const formTitleStyle: CSSProperties = {
  fontFamily: THEME.fonts.display,
  fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
  color: THEME.colors.cream,
  marginBottom: "32px",
  fontWeight: 400,
  lineHeight: "1.1",
};

export const formGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
};

export const fullWidthStyle: CSSProperties = {
  gridColumn: "span 2",
};

export const imageSideStyle: CSSProperties = {
  width: "55%",
  position: "relative",
  height: "100%",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  paddingTop: "8vh",
  background: "#121212",
};

export const floatingFrameStyle: CSSProperties = {
  width: "85%",
  height: "75vh",
  position: "relative",
  borderRadius: "4px",
  boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
};

export const goldBorderStyle: CSSProperties = {
  position: "absolute",
  inset: "20px",
  border: "1px solid rgba(201,168,76,0.25)",
  borderRadius: "2px",
  pointerEvents: "none",
  zIndex: 3,
};

export const carouselImgStyle = (active: boolean): CSSProperties => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  opacity: active ? 1 : 0,
  transition: "opacity 1.8s ease-in-out",
  zIndex: active ? 1 : 0,
});

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
  padding: "80px 40px",
  background: THEME.colors.charcoal,
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
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
