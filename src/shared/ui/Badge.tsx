import { THEME } from '../../shared/config/theme';
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
}

export function Badge({ children }: BadgeProps){
  return (
    <span style={{
      fontFamily: THEME.fonts.sans,
      fontSize: "0.65rem",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      padding: "4px 10px",
      background: "rgba(201,168,76,0.15)",
      color: THEME.colors.gold,
      border: `1px solid rgba(201,168,76,0.3)`,
      display: "inline-block",
    }}>
      {children}
    </span>
  );
}