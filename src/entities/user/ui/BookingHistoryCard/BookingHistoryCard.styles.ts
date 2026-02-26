import { THEME } from "../../../../shared/config/theme";
import type { CSSProperties } from "react";

export const STATUS_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  pending:     { bg: "#FFF9EC", text: "#B8860B", border: "#F0D080" },
  confirmed:   { bg: "#EDF7F0", text: "#2D7A4F", border: "#A8D8B8" },
  in_progress: { bg: "#EBF5FB", text: "#2E86C1", border: "#AED6F1" },
  completed:   { bg: "#F8F9F9", text: "#717D7E", border: "#D5DBDB" },
  cancelled:   { bg: "#FDF2F2", text: "#C0392B", border: "#FADBD8" },
};

export const getCardStyle = (statusKey: string): CSSProperties => ({
  padding: "24px 28px",
  background: statusKey === "completed" ? "#FCFCFC" : THEME.colors.white,
  border: "1px solid #E8E0D0",
  display: "flex",
  gap: "20px",
  alignItems: "flex-start",
  transition: "all 0.2s",
  marginBottom: "12px",
  opacity: statusKey === "cancelled" ? 0.7 : 1,
});

export const calendarBlockStyle: CSSProperties = {
  minWidth: "80px",
  textAlign: "center",
  paddingRight: "20px",
  borderRight: "1px solid #E8E0D0",
  flexShrink: 0,
};

export const getDayStyle = (statusKey: string): CSSProperties => ({
  fontFamily: THEME.fonts.display,
  fontSize: "2rem",
  fontWeight: 400,
  color: statusKey === "completed" ? THEME.colors.muted : THEME.colors.charcoal,
  margin: 0,
  lineHeight: 1,
});

export const monthStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.65rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: THEME.colors.muted,
  margin: "4px 0 0",
};

export const infoBlockStyle: CSSProperties = { flex: 1 };

export const infoHeaderStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "8px",
};

export const getServiceNameStyle = (statusKey: string): CSSProperties => ({
  fontFamily: THEME.fonts.display,
  fontSize: "1.15rem",
  fontWeight: 400,
  color: statusKey === "completed" ? THEME.colors.muted : THEME.colors.charcoal,
  margin: 0,
});

export const getStatusBadgeStyle = (colors: { bg: string; text: string; border: string }): CSSProperties => ({
  fontFamily: THEME.fonts.sans,
  fontSize: "0.65rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  padding: "4px 12px",
  background: colors.bg,
  color: colors.text,
  border: `1px solid ${colors.border}`,
  flexShrink: 0,
  borderRadius: "2px",
});

export const notesStyle: CSSProperties = {
  fontFamily: THEME.fonts.body,
  fontSize: "0.85rem",
  color: "#888",
  fontStyle: "italic",
  marginTop: "12px",
  paddingLeft: "12px",
  borderLeft: `2px solid rgba(201,168,76,0.4)`,
  lineHeight: 1.5,
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

export const metaStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.8rem",
  color: THEME.colors.muted,
  margin: "0 0 4px",
};

export const footerRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "12px",
};

export const getPriceStyle = (statusKey: string): CSSProperties => ({
  fontFamily: THEME.fonts.display,
  fontSize: "1.1rem",
  color: statusKey === "completed" ? THEME.colors.muted : THEME.colors.gold,
});

export const cancelBtnStyle: CSSProperties = {
  background: "none",
  border: "1px solid #E8E0D0",
  fontFamily: THEME.fonts.sans,
  fontSize: "0.7rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: THEME.colors.muted,
  cursor: "pointer",
  padding: "6px 14px",
  transition: "all 0.2s",
};

export const completedNoteStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.6rem",
  color: "#4CAF50",
  display: "flex",
  alignItems: "center",
  gap: "4px",
};