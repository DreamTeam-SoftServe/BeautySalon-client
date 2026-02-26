import { THEME } from "../../shared/config/theme";
import type { CSSProperties } from "react";

export const getNavStyle = (scrolled: boolean): CSSProperties => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  padding: "0 5%",
  background: scrolled ? "rgba(253,251,247,0.96)" : "transparent",
  backdropFilter: scrolled ? "blur(8px)" : "none",
  borderBottom: scrolled ? `1px solid rgba(201,168,76,0.15)` : "none",
  transition: "all 0.4s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: scrolled ? "64px" : "80px",
});

export const logoWrapStyle: CSSProperties = {
  cursor: "pointer",
};

export const logoNameStyle: CSSProperties = {
  fontFamily: THEME.fonts.display,
  fontSize: "1.4rem",
  fontWeight: 700,
  color: THEME.colors.charcoal,
  margin: 0,
  letterSpacing: "0.04em",
};

export const logoSubStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.6rem",
  letterSpacing: "0.3em",
  color: THEME.colors.gold,
  margin: 0,
  textTransform: "uppercase",
};

export const linksWrapStyle: CSSProperties = {
  display: "flex",
  gap: "36px",
  alignItems: "center",
};

export const getLinkStyle = (active: boolean): CSSProperties => ({
  background: "none",
  border: "none",
  fontFamily: THEME.fonts.sans,
  fontSize: "0.75rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: active ? THEME.colors.gold : THEME.colors.charcoal,
  cursor: "pointer",
  padding: "4px 0",
  borderBottom: active ? `1px solid ${THEME.colors.gold}` : "1px solid transparent",
  transition: "all 0.2s",
});