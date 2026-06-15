import type { CSSProperties } from "react";

export const getCheckoutStyles = (isMobile: boolean) => ({
  pageWrapStyle: {
    minHeight: "100vh",
    backgroundColor: "#FAFAFA",
    paddingBottom: isMobile ? "40px" : "80px",
  } as CSSProperties,

  containerStyle: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: isMobile ? "30px 20px" : "60px 20px",
    display: "flex",
    flexDirection: isMobile ? "column" : "row", // Колонки стають вертикальними на телефоні
    gap: isMobile ? "30px" : "40px",
    alignItems: "flex-start",
  } as CSSProperties,

  formSectionStyle: {
    flex: isMobile ? "none" : "2 1 600px",
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: isMobile ? "20px" : "40px",
    borderRadius: "16px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
  } as CSSProperties,

  summarySectionStyle: {
    flex: isMobile ? "none" : "1 1 350px",
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: isMobile ? "20px" : "30px",
    borderRadius: "16px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
    position: isMobile ? "static" : "sticky", // Вимикаємо sticky на телефоні
    top: isMobile ? "auto" : "100px",
  } as CSSProperties,

  sectionTitleStyle: {
    fontSize: isMobile ? "20px" : "24px",
    fontWeight: 500,
    marginBottom: isMobile ? "20px" : "30px",
    color: "#1A1A1A",
  } as CSSProperties,

  summaryItemStyle: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px",
    fontSize: "15px",
    color: "#555",
    lineHeight: 1.4,
  } as CSSProperties,

  totalStyle: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "24px",
    paddingTop: "24px",
    borderTop: "1px solid #EFEFEF",
    fontSize: isMobile ? "18px" : "22px",
    fontWeight: 600,
    color: "#1A1A1A",
  } as CSSProperties,
});