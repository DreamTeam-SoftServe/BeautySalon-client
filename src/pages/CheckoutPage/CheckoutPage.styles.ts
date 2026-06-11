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
  gap: "40px",
  flexWrap: "wrap",
  alignItems: "flex-start" // Щоб права колонка не розтягувалась
};

export const formSectionStyle: CSSProperties = {
  flex: "2 1 600px",
  backgroundColor: "#FFFFFF",
  padding: "40px",
  borderRadius: "16px",
  boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
};

export const summarySectionStyle: CSSProperties = {
  flex: "1 1 350px",
  backgroundColor: "#FFFFFF",
  padding: "30px",
  borderRadius: "16px",
  boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
  position: "sticky",
  top: "100px" // Зафіксовано при скролі
};

export const sectionTitleStyle: CSSProperties = {
  fontSize: "24px",
  fontWeight: 500,
  marginBottom: "30px",
  color: "#1A1A1A"
};

export const summaryItemStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "16px",
  fontSize: "15px",
  color: "#555",
  lineHeight: 1.4
};

export const totalStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "24px",
  paddingTop: "24px",
  borderTop: "1px solid #EFEFEF",
  fontSize: "22px",
  fontWeight: 600,
  color: "#1A1A1A"
};