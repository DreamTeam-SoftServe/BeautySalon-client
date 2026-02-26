import type { Service } from "../../../../shared/api/api";
import { useI18n } from "../../../../shared/i18n";
import { useNavigate } from "react-router-dom";
import {
  BASE_SHADOW, HOVER_SHADOW, cardStyle, getImageStyle, placeholderStyle,
  bodyStyle, titleStyle, descStyle, footerStyle, durationStyle, dividerLineStyle, priceStyle,
} from "./ServiceCard.styles";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/booking", { state: { selectedServiceId: service.id } })}
      style={cardStyle}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = HOVER_SHADOW;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = BASE_SHADOW;
      }}
    >
      <div style={{ ...getImageStyle(!!service.imageUrl), background: service.imageUrl ? `url(${service.imageUrl}) center/cover` : "#F8F5F0" }}>
        {!service.imageUrl && (
          <div style={placeholderStyle}>{t.services.placeHolderPhoto}</div>
        )}
      </div>

      <div style={bodyStyle}>
        <h3 style={titleStyle}>{service.title}</h3>
        <p style={descStyle}>{service.description || t.services.defaultDescription}</p>
      </div>

      <div style={footerStyle}>
        <span style={durationStyle}>{service.duration} {t.services.unit.min}</span>
        <div style={dividerLineStyle} />
        <span style={priceStyle}>{service.servicePrice} {t.services.unit.cost}</span>
      </div>
    </div>
  );
}