import { THEME } from "../../shared/config/theme";
import type { CSSProperties } from "react";

export const getAdminDashboardStyles = (isMobile: boolean) => ({
  pageStyle: {
    padding: isMobile ? "80px 15px 40px" : "80px 5% 40px",
    maxWidth: "1200px",
    margin: "0 auto",
    minHeight: "80vh",
  } as CSSProperties,

  pageTitleStyle: {
    fontFamily: THEME.fonts.display,
    color: THEME.colors.charcoal,
    marginBottom: isMobile ? "24px" : "32px",
    fontSize: isMobile ? "1.8rem" : "2.4rem",
  } as CSSProperties,

  tabsRowStyle: {
    display: "flex",
    gap: "12px",
    marginBottom: isMobile ? "24px" : "40px",
    flexDirection: isMobile ? "column" : "row", // На телефоні таби йдуть вертикально
    flexWrap: "wrap",
  } as CSSProperties,

  getTabBtnStyle: (active: boolean): CSSProperties => ({
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
    width: isMobile ? "100%" : "auto", // Розтягуємо кнопки на всю ширину на мобільному
    textAlign: "center",
  }),

  loadingStyle: {
    textAlign: "center",
    padding: "100px",
    color: THEME.colors.muted,
    fontFamily: THEME.fonts.body,
  } as CSSProperties,

  tableWrapStyle: {
    overflowX: "auto", // Дозволяє скролити таблицю вправо-вліво на телефоні
    background: THEME.colors.white,
    border: "1px solid #E8E0D0",
    borderRadius: "8px",
    WebkitOverflowScrolling: "touch", // Плавний скрол на iOS
  } as CSSProperties,

  tableStyle: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    minWidth: isMobile ? "600px" : "100%", // Запобігає стисканню контенту
  } as CSSProperties,

  thStyle: {
    background: "#F8F5F0",
    borderBottom: "2px solid #E8E0D0",
    padding: "16px",
    color: THEME.colors.muted,
    fontSize: "0.8rem",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  } as CSSProperties,

  tdStyle: { padding: "16px" } as CSSProperties,
  trStyle: { borderBottom: "1px solid #E8E0D0" } as CSSProperties,
  datePrimaryStyle: { fontWeight: 500 } as CSSProperties,
  dateSecondaryStyle: { color: THEME.colors.gold } as CSSProperties,
  
  mutedTextStyle: {
    fontSize: "0.85rem",
    color: THEME.colors.muted,
  } as CSSProperties,

  sectionHeaderStyle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: isMobile ? "stretch" : "center",
    flexDirection: isMobile ? "column" : "row", // Заголовок і кнопка "Додати" один під одним
    gap: isMobile ? "16px" : "0",
    marginBottom: "24px",
  } as CSSProperties,

  sectionTitleStyle: {
    fontFamily: THEME.fonts.display,
    color: THEME.colors.charcoal,
    margin: 0,
  } as CSSProperties,

  goldBtnStyle: {
    padding: "10px 20px",
    background: THEME.colors.gold,
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  } as CSSProperties,

  formWrapStyle: {
    background: "#F8F5F0",
    padding: isMobile ? "20px" : "32px",
    borderRadius: "8px",
    border: "1px solid #E8E0D0",
    marginBottom: "40px",
  } as CSSProperties,

  formGridStyle: {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", // Всі інпути в 1 колонку на телефоні
    gap: "20px",
  } as CSSProperties,

  inputStyle: {
    padding: "12px 16px",
    borderRadius: "4px",
    border: "1px solid #E8E0D0",
    fontFamily: THEME.fonts.body,
    fontSize: "1rem",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  } as CSSProperties,

  photoLabelStyle: {
    fontSize: "0.8rem",
    color: THEME.colors.muted,
    display: "block",
    marginBottom: "8px",
  } as CSSProperties,

  photoHintStyle: {
    fontSize: "0.75rem",
    color: THEME.colors.gold,
    marginBottom: "10px",
    marginTop: "-4px",
  } as CSSProperties,

  imagePreviewWrapStyle: {
    marginTop: "16px",
    border: "1px solid #E8E0D0",
    borderRadius: "4px",
    overflow: "hidden",
    position: "relative",
  } as CSSProperties,

  imageRemoveBtnStyle: {
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
  } as CSSProperties,

  getSaveBtnStyle: (disabled: boolean): CSSProperties => ({
    marginTop: "24px",
    width: "100%",
    padding: "14px",
    background: disabled ? "#ccc" : THEME.colors.charcoal,
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: 600,
  }),

  mastersGridStyle: {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "24px",
  } as CSSProperties,

  masterCardStyle: {
    background: "white",
    border: "1px solid #E8E0D0",
    borderRadius: "8px",
    overflow: "hidden",
    textAlign: "center",
    position: "relative",
  } as CSSProperties,

  editBtnStyle: {
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
  } as CSSProperties,

  deleteBtnStyle: {
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
  } as CSSProperties,

  masterImgWrapStyle: {
    height: "280px",
    background: "#eee",
  } as CSSProperties,

  masterNameStyle: {
    fontFamily: THEME.fonts.display,
    margin: "0 0 4px",
  } as CSSProperties,

  servicesGridStyle: {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "24px",
  } as CSSProperties,

  serviceCardStyle: {
    background: "white",
    border: "1px solid #E8E0D0",
    borderRadius: "8px",
    overflow: "hidden",
    position: "relative",
  } as CSSProperties,

  serviceImgWrapStyle: {
    height: "150px",
    background: "#eee",
  } as CSSProperties,

  servicePriceStyle: {
    fontSize: "0.75rem",
    color: THEME.colors.gold,
  } as CSSProperties,

  deleteUserBtnStyle: {
    padding: "6px 12px",
    background: "white",
    color: "red",
    border: "1px solid red",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.8rem",
  } as CSSProperties,

  selectStyle: {
    padding: "8px",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid #E8E0D0",
    cursor: "pointer",
  } as CSSProperties,

  masterSelectStyle: {
    padding: "8px",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid #C5E1A5",
    fontSize: "0.85rem",
  } as CSSProperties,

  uploadingStyle: {
    fontSize: "0.8rem",
    color: THEME.colors.gold,
  } as CSSProperties,

  specLabelStyle: {
    fontSize: "0.75rem",
    color: THEME.colors.muted,
    textTransform: "uppercase",
  } as CSSProperties,
});