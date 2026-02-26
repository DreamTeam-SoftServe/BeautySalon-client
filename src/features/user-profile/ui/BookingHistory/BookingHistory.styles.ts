import { THEME } from "../../../../shared/config/theme";
import type { CSSProperties } from "react";

export const titleStyle: CSSProperties = {
  fontFamily: THEME.fonts.display,
  fontSize: "1.5rem",
  fontWeight: 400,
  color: THEME.colors.charcoal,
  marginBottom: "32px",
};

export const skeletonWrapStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "2px",
};

export const emptyWrapStyle: CSSProperties = {
  textAlign: "center",
  padding: "80px 40px",
};

export const emptyTitleStyle: CSSProperties = {
  fontFamily: THEME.fonts.display,
  fontSize: "1.5rem",
  color: THEME.colors.charcoal,
  marginBottom: "12px",
};

export const emptyBodyStyle: CSSProperties = {
  fontFamily: THEME.fonts.body,
  fontSize: "1rem",
  color: THEME.colors.muted,
  marginBottom: "32px",
};

export const listStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "2px",
};

export const getCancellingStyle = (cancelling: boolean): CSSProperties => ({
  opacity: cancelling ? 0.5 : 1,
  transition: "opacity 0.2s",
});