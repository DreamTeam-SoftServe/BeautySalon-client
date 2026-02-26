import { THEME } from "../../../shared/config/theme";
import type { CSSProperties } from "react";

export const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "20px",
};

export const cardStyle: CSSProperties = {
  background: THEME.colors.white,
  borderRadius: "8px",
  overflow: "hidden",
  border: `1px solid ${THEME.colors.cream}`,
  
};

export const getImageStyle = (imageUrl?: string): CSSProperties => ({
  height: "120px",
  background: imageUrl ? `url(${imageUrl}) center/cover` : THEME.colors.cream,
});

export const cardBodyStyle: CSSProperties = {
  padding: "15px",
};

export const cardTitleStyle: CSSProperties = {
  margin: "0 0 5px",
  fontSize: "1rem",
};

export const cardDurationStyle: CSSProperties = {
  fontSize: "0.8rem",
  color: THEME.colors.muted,
  margin: "0 0 10px",
};

export const deleteBtnStyle: CSSProperties = {
  color: "#e74c3c",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "0.75rem",
  padding: 0,
};