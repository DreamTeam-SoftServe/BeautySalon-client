import { THEME } from "../../../../shared/config/theme";
import type { CSSProperties } from "react";

export const wrapStyle: CSSProperties = {
  maxWidth: "400px",
};

export const titleStyle: CSSProperties = {
  fontFamily: THEME.fonts.display,
  fontSize: "1.5rem",
  marginBottom: "30px",
  fontWeight: 400,
  color: THEME.colors.charcoal,
};

export const formStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

export const dividerStyle: CSSProperties = {
  height: "1px",
  background: "rgba(201,168,76,0.1)",
  margin: "10px 0",
};

export const getStatusStyle = (type: string): CSSProperties => ({
  color: type === "success" ? "#2ecc71" : "#e74c3c",
  fontSize: "0.8rem",
});
