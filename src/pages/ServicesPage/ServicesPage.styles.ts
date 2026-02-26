import { THEME } from "../../shared/config/theme";
import type { CSSProperties } from "react";

export const pageWrapStyle: CSSProperties = {
  paddingTop: "80px",
};

export const tablesSectionStyle: CSSProperties = {
  padding: "80px 5%",
  background: THEME.colors.white,
};

export const tableContainerStyle: CSSProperties = {
  maxWidth: "1000px",
  margin: "0 auto",
};

export const tableListStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

export const tableRowStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: "24px",
  alignItems: "center",
  padding: "24px 0",
};

export const serviceTitleStyle: CSSProperties = {
  fontFamily: THEME.fonts.display,
  fontSize: "1.3rem",
  fontWeight: 400,
  margin: "0 0 4px",
};

export const serviceDescStyle: CSSProperties = {
  fontFamily: THEME.fonts.body,
  fontSize: "0.9rem",
  color: THEME.colors.muted,
  margin: 0,
  wordBreak: "break-word",
  overflowWrap: "anywhere",
};

export const servicePriceStyle: CSSProperties = {
  color: THEME.colors.gold,
  fontSize: "0.9rem",
  whiteSpace: "nowrap",
  textAlign: "right",
};