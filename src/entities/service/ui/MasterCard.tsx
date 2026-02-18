import { THEME } from '../../../shared/config/theme';
import { Badge } from '../../../shared/ui/Badge';


export interface Master {
    id: number | string;
    name: string;
    role: string;
    services: string[]; 
    experience: number;
    avatar: string;
    gradient: string;
    bio: string;
    specialties: string[];
}

interface MasterCardProps {
    master: Master;
}

export function MasterCard({ master }: MasterCardProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{
        width: "100%",
        aspectRatio: "3/4",
        background: master.gradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <span style={{
          fontFamily: THEME.fonts.display,
          fontSize: "4rem",
          color: "rgba(255,255,255,0.6)",
          fontWeight: 700,
        }}>
          {master.avatar}
        </span>
        <div style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          background: THEME.colors.charcoal,
          color: THEME.colors.cream,
          padding: "6px 12px",
          fontFamily: THEME.fonts.sans,
          fontSize: "0.7rem",
          letterSpacing: "0.1em",
        }}>
          {master.experience}+ yrs
        </div>
      </div>
      <div>
        <h3 style={{
          fontFamily: THEME.fonts.display,
          fontSize: "1.4rem",
          fontWeight: 400,
          color: THEME.colors.charcoal,
          margin: "0 0 4px",
        }}>
          {master.name}
        </h3>
        <p style={{
          fontFamily: THEME.fonts.sans,
          fontSize: "0.75rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: THEME.colors.gold,
          margin: "0 0 12px",
        }}>
          {master.role}
        </p>
        <p style={{
          fontFamily: THEME.fonts.body,
          fontSize: "0.95rem",
          color: THEME.colors.muted,
          lineHeight: 1.7,
          margin: "0 0 16px",
        }}>
          {master.bio}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {master.specialties?.map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}