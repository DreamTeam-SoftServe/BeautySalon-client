import { useState } from 'react';
import { THEME } from '../../../shared/config/theme';
import { Badge } from '../../../shared/ui/Badge';
import type { Service } from '../../../shared/api/api';


export function ServiceCard({ service }: { service: Service }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "40px 36px",
        background: hovered ? THEME.colors.charcoal : THEME.colors.white,
        transition: "all 0.4s ease",
        cursor: "pointer",
        border: `1px solid ${hovered ? THEME.colors.charcoal : "#E8E0D0"}`,
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div style={{ fontSize: "2rem" }}>{service.icon}</div>
      <Badge>{service.category}</Badge>
      <h3 style={{
        fontFamily: THEME.fonts.display,
        fontSize: "1.5rem",
        fontWeight: 400,
        color: hovered ? THEME.colors.cream : THEME.colors.charcoal,
        margin: 0,
        transition: "color 0.4s",
      }}>
        {service.title}
      </h3>
      <p style={{
        fontFamily: THEME.fonts.body,
        fontSize: "1rem",
        color: hovered ? "rgba(245,240,232,0.75)" : THEME.colors.muted,
        lineHeight: 1.7,
        margin: 0,
        flexGrow: 1,
        transition: "color 0.4s",
      }}>
        {service.description}
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{
          fontFamily: THEME.fonts.display,
          fontSize: "1.4rem",
          color: hovered ? THEME.colors.goldLight : THEME.colors.gold,
          transition: "color 0.4s",
        }}>
          from ${service.price}
        </span>
        <span style={{
          fontFamily: THEME.fonts.sans,
          fontSize: "0.75rem",
          color: hovered ? "rgba(245,240,232,0.6)" : THEME.colors.muted,
          letterSpacing: "0.08em",
          transition: "color 0.4s",
        }}>
          {service.duration} min
        </span>
      </div>
    </div>
  );
}