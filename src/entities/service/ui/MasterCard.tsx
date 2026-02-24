import { THEME } from "../../../shared/config/theme";
import { Badge } from "../../../shared/ui/Badge";
import { serviceTypeMap } from "../../../../src/widgets/ServicesSection";

const profLevelNames: Record<number, string> = {
  0: "Junior",
  1: "Middle",
  2: "Senior",
  3: "Top Master",
};

export interface Master {
  id: string;
  name: string;
  profLevel: number;
  specialization: number;
  experience?: string;
  imageUrl?: string;
  bio?: string;
  gradient?: string;
  avatar?: string;
  specialties?: string[];
}

interface MasterCardProps {
  master: Master;
}

export function MasterCard({ master }: MasterCardProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div
        style={{
          width: "100%",
          aspectRatio: "3/4",
          background: master.gradient || "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {master.imageUrl ? (
          <img
            src={master.imageUrl}
            alt={master.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span
            style={{
              fontFamily: THEME.fonts.display,
              fontSize: "4rem",
              color: "rgba(0,0,0,0.1)",
              fontWeight: 700,
            }}
          >
            {master.avatar || master.name.charAt(0)}
          </span>
        )}

        {master.experience && (
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              background: THEME.colors.charcoal,
              color: THEME.colors.cream,
              padding: "6px 12px",
              fontFamily: THEME.fonts.sans,
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              zIndex: 2,
            }}
          >
            {master.experience}
          </div>
        )}
      </div>

      <div>
        <h3
          style={{
            fontFamily: THEME.fonts.display,
            fontSize: "1.4rem",
            fontWeight: 400,
            color: THEME.colors.charcoal,
            margin: "0 0 4px",
          }}
        >
          {master.name}
        </h3>

        <p
          style={{
            fontFamily: THEME.fonts.sans,
            fontSize: "0.75rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: THEME.colors.gold,
            margin: "0 0 12px",
          }}
        >
          {profLevelNames[master.profLevel]} |{" "}
          {typeof serviceTypeMap === "function"
            ? (serviceTypeMap as any)(master.specialization)
            : (serviceTypeMap as any)[String(master.specialization)] || master.specialization}{" "}
        </p>

        {master.bio && (
          <p
            style={{
              fontFamily: THEME.fonts.body,
              fontSize: "0.95rem",
              color: THEME.colors.muted,
              lineHeight: 1.7,
              margin: "0 0 16px",
            }}
          >
            {master.bio}
          </p>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {master.specialties?.map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
