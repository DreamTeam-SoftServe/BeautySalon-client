import type { CSSProperties } from "react";

export const pageWrapStyle: CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#FAFAFA",
  paddingBottom: "80px",
};

export const containerStyle: CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "60px 20px",
  display: "flex",
  gap: "60px",
  flexWrap: "wrap",
};

export const imageWrapStyle: CSSProperties = {
  flex: "1 1 450px",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
  backgroundColor: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px"
};

export const imageStyle: CSSProperties = {
  width: "100%",
  maxHeight: "600px",
  objectFit: "cover",
  borderRadius: "8px"
};

export const infoWrapStyle: CSSProperties = {
  flex: "1 1 400px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
};

export const backBtnStyle: CSSProperties = {
  alignSelf: "flex-start",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#7A7A7A",
  fontSize: "15px",
  marginBottom: "24px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: 0,
  transition: "color 0.2s"
};

export const brandStyle: CSSProperties = {
  fontSize: "14px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "#A0A0A0",
  marginBottom: "12px",
};

export const titleStyle: CSSProperties = {
  fontSize: "36px",
  fontWeight: 400,
  color: "#1A1A1A",
  marginBottom: "20px",
  lineHeight: 1.2
};

export const priceStyle: CSSProperties = {
  fontSize: "28px",
  fontWeight: 600,
  color: "#D4C5A0",
  marginBottom: "30px",
};

export const specRowStyle: CSSProperties = {
  display: "flex",
  gap: "40px",
  marginBottom: "30px",
  paddingBottom: "20px",
  borderBottom: "1px solid #EFEFEF"
};

export const specLabelStyle: CSSProperties = {
  fontSize: "14px",
  color: "#7A7A7A",
  marginBottom: "4px"
};

export const specValueStyle: CSSProperties = {
  fontSize: "16px",
  color: "#1A1A1A",
  fontWeight: 500
};

export const descWrapStyle: CSSProperties = {
  marginBottom: "40px",
  lineHeight: 1.6,
  color: "#555555",
  fontSize: "16px"
};