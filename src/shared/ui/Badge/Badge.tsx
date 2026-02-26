import type { ReactNode } from "react";
import { badgeStyle } from "./Badge.styles";

interface BadgeProps {
  children: ReactNode;
}

export function Badge({ children }: BadgeProps) {
  return <span style={badgeStyle}>{children}</span>;
}