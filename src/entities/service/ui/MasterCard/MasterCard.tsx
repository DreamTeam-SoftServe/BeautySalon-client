import { useState } from "react";
import { Badge } from "../../../../shared/ui/Badge";
import { serviceTypeMap } from "../../../../shared/lib/serviceTypeMap";
import { useI18n } from "../../../../shared/i18n";
import { useNavigate } from "react-router-dom";
import {
  BASE_SHADOW, HOVER_SHADOW, cardStyle, imageWrapStyle, imgStyle,
  placeholderTextStyle, experienceBadgeStyle, cardBodyStyle,
  nameStyle, levelStyle, bioStyle, specialtiesWrapStyle,
} from "./MasterCard.styles";

const profLevelNames: Record<number, string> = {
  0: "Junior", 1: "Middle", 2: "Senior", 3: "Top Master",
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
  const { t } = useI18n();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => navigate("/booking", { state: { selectedMasterId: master.id } })}
      style={{
        ...cardStyle,
        transform: hovered ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
        boxShadow: hovered ? HOVER_SHADOW : BASE_SHADOW,
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Фото — zoom при hover */}
      <div style={{
        ...imageWrapStyle,
        background: master.gradient || "#f5f5f5",
        overflow: "hidden",
        position: "relative",
      }}>
        {master.imageUrl ? (
          <img
            src={master.imageUrl}
            alt={master.name}
            style={{
              ...imgStyle,
              transform: hovered ? "scale(1.07)" : "scale(1)",
              transition: "transform 0.5s ease",
            }}
          />
        ) : (
          <span style={{
            ...placeholderTextStyle,
            transform: hovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.4s ease",
            display: "inline-block",
          }}>
            {master.avatar || master.name.charAt(0)}
          </span>
        )}

        {/* Золотий оверлей при hover */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(201,168,76,0.25) 0%, transparent 60%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }} />

        {master.experience && (
          <div style={experienceBadgeStyle}>{master.experience}</div>
        )}
      </div>

      <div style={cardBodyStyle}>
        <h3 style={{
          ...nameStyle,
          color: hovered ? "#C9A84C" : nameStyle.color,
          transition: "color 0.3s ease",
        }}>
          {master.name}
        </h3>
        <p style={levelStyle}>
          {profLevelNames[master.profLevel]} | {serviceTypeMap(master.specialization, t)}
        </p>
        {master.bio && <p style={bioStyle}>{master.bio}</p>}
        {master.specialties && master.specialties.length > 0 && (
          <div style={specialtiesWrapStyle}>
            {master.specialties.map((s) => <Badge key={s}>{s}</Badge>)}
          </div>
        )}
      </div>
    </div>
  );
}