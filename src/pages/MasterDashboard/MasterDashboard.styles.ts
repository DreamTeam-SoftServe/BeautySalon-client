import { THEME } from "../../shared/config/theme";
import type { CSSProperties } from "react";

export const containerStyle: CSSProperties = {
  padding: "40px",
  maxWidth: "1000px",
  margin: "0 auto",
  minHeight: "80vh",
};

export const loadingStyle: CSSProperties = {
  padding: "40px",
  textAlign: "center",
};

export const titleStyle: CSSProperties = {
  fontFamily: THEME.fonts.display,
  color: THEME.colors.charcoal,
  marginBottom: "24px",
};

export const emptyStyle: CSSProperties = {
  padding: "40px",
  textAlign: "center",
  background: THEME.colors.white,
  borderRadius: "8px",
  border: "1px solid #E8E0D0",
};

export const tableWrapStyle: CSSProperties = {
  overflowX: "auto",
  background: THEME.colors.white,
  border: "1px solid #E8E0D0",
  borderRadius: "8px",
};

export const tableStyle: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "left",
};

export const theadRowStyle: CSSProperties = {
  background: "#F8F5F0",
  borderBottom: "2px solid #E8E0D0",
};

export const thStyle: CSSProperties = {
  padding: "16px",
  color: THEME.colors.muted,
};

export const tdStyle: CSSProperties = {
  padding: "16px",
};

export const trStyle: CSSProperties = {
  borderBottom: "1px solid #E8E0D0",
};

export const datePrimaryStyle: CSSProperties = {
  fontWeight: 500,
};

export const dateSecondaryStyle: CSSProperties = {
  color: THEME.colors.gold,
};

export const clientNameStyle: CSSProperties = {
  fontWeight: 500,
};

export const clientPhoneStyle: CSSProperties = {
  fontSize: "0.85rem",
  color: THEME.colors.muted,
};

export const selectStyle: CSSProperties = {
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #E8E0D0",
};