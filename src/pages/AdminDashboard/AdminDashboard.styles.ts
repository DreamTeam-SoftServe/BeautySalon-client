import { THEME } from "../../shared/config/theme";
import type { CSSProperties } from "react";

export const pageStyle: CSSProperties = {
  padding: "80px 5% 40px",
  maxWidth: "1200px",
  margin: "0 auto",
  minHeight: "80vh",
};
export const pageTitleStyle: CSSProperties = {
  fontFamily: THEME.fonts.display,
  color: THEME.colors.charcoal,
  marginBottom: "32px",
  fontSize: "2.4rem",
};
export const tabsRowStyle: CSSProperties = {
  display: "flex",
  gap: "12px",
  marginBottom: "40px",
};
export const getTabBtnStyle = (active: boolean): CSSProperties => ({
  padding: "12px 24px",
  background: active ? THEME.colors.charcoal : THEME.colors.white,
  color: active ? THEME.colors.white : THEME.colors.charcoal,
  border: `1px solid ${THEME.colors.charcoal}`,
  borderRadius: "4px",
  cursor: "pointer",
  fontFamily: THEME.fonts.sans,
  fontSize: "0.85rem",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  transition: "all 0.2s",
});
export const loadingStyle: CSSProperties = {
  textAlign: "center",
  padding: "100px",
  color: THEME.colors.muted,
  fontFamily: THEME.fonts.body,
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
export const thStyle: CSSProperties = {
  background: "#F8F5F0",
  borderBottom: "2px solid #E8E0D0",
  padding: "16px",
  color: THEME.colors.muted,
  fontSize: "0.8rem",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
};
export const tdStyle: CSSProperties = { padding: "16px" };
export const trStyle: CSSProperties = { borderBottom: "1px solid #E8E0D0" };
export const datePrimaryStyle: CSSProperties = { fontWeight: 500 };
export const dateSecondaryStyle: CSSProperties = { color: THEME.colors.gold };
export const mutedTextStyle: CSSProperties = {
  fontSize: "0.85rem",
  color: THEME.colors.muted,
};
export const sectionHeaderStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
};
export const sectionTitleStyle: CSSProperties = {
  fontFamily: THEME.fonts.display,
  color: THEME.colors.charcoal,
};
export const goldBtnStyle: CSSProperties = {
  padding: "10px 20px",
  background: THEME.colors.gold,
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
export const formWrapStyle: CSSProperties = {
  background: "#F8F5F0",
  padding: "32px",
  borderRadius: "8px",
  border: "1px solid #E8E0D0",
  marginBottom: "40px",
};
export const formGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
};
export const inputStyle: CSSProperties = {
  padding: "12px 16px",
  borderRadius: "4px",
  border: "1px solid #E8E0D0",
  fontFamily: THEME.fonts.body,
  fontSize: "1rem",
  outline: "none",
};
export const photoLabelStyle: CSSProperties = {
  fontSize: "0.8rem",
  color: THEME.colors.muted,
  display: "block",
  marginBottom: "8px",
};
export const photoHintStyle: CSSProperties = {
  fontSize: "0.75rem",
  color: THEME.colors.gold,
  marginBottom: "10px",
  marginTop: "-4px",
};
export const imagePreviewWrapStyle: CSSProperties = {
  marginTop: "16px",
  border: "1px solid #E8E0D0",
  borderRadius: "4px",
  overflow: "hidden",
  position: "relative",
};
export const imageRemoveBtnStyle: CSSProperties = {
  position: "absolute",
  top: "5px",
  right: "5px",
  background: "rgba(211,47,47,0.85)",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: "24px",
  height: "24px",
  fontSize: "12px",
  cursor: "pointer",
  zIndex: 10,
};
export const getSaveBtnStyle = (disabled: boolean): CSSProperties => ({
  marginTop: "24px",
  width: "100%",
  padding: "14px",
  background: disabled ? "#ccc" : THEME.colors.charcoal,
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: disabled ? "not-allowed" : "pointer",
  fontWeight: 600,
});
export const mastersGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "24px",
};
export const masterCardStyle: CSSProperties = {
  background: "white",
  border: "1px solid #E8E0D0",
  borderRadius: "8px",
  overflow: "hidden",
  textAlign: "center",
  position: "relative",
};

export const editBtnStyle: CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "45px",
  background: THEME.colors.gold,
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  cursor: "pointer",
  zIndex: 10,
  fontSize: "14px",
};
export const deleteBtnStyle: CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "rgba(211,47,47,0.85)",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  cursor: "pointer",
  zIndex: 10,
};

export const masterImgWrapStyle: CSSProperties = {
  height: "280px",
  background: "#eee",
};
export const masterNameStyle: CSSProperties = {
  fontFamily: THEME.fonts.display,
  margin: "0 0 4px",
};
export const servicesGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "24px",
};
export const serviceCardStyle: CSSProperties = {
  background: "white",
  border: "1px solid #E8E0D0",
  borderRadius: "8px",
  overflow: "hidden",
  position: "relative",
};
export const serviceImgWrapStyle: CSSProperties = {
  height: "150px",
  background: "#eee",
};
export const servicePriceStyle: CSSProperties = {
  fontSize: "0.75rem",
  color: THEME.colors.gold,
};
export const deleteUserBtnStyle: CSSProperties = {
  padding: "6px 12px",
  background: "white",
  color: "red",
  border: "1px solid red",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "0.8rem",
};
export const selectStyle: CSSProperties = {
  padding: "8px",
  width: "100%",
  borderRadius: "4px",
  border: "1px solid #E8E0D0",
  cursor: "pointer",
};
export const masterSelectStyle: CSSProperties = {
  padding: "8px",
  width: "100%",
  borderRadius: "4px",
  border: "1px solid #C5E1A5",
  fontSize: "0.85rem",
};
export const uploadingStyle: CSSProperties = {
  fontSize: "0.8rem",
  color: THEME.colors.gold,
};
export const specLabelStyle: CSSProperties = {
  fontSize: "0.75rem",
  color: THEME.colors.muted,
  textTransform: "uppercase",
};
