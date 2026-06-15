import type { Service } from "../../../../shared/api/api";
import { useI18n } from "../../../../shared/i18n";
import { useNavigate } from "react-router-dom";
import { useMobile } from "../../../../shared/hooks/useMobile";
import { getServiceCardStyles, BASE_SHADOW, HOVER_SHADOW } from "./ServiceCard.styles";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { t } = useI18n();
  const navigate = useNavigate();

  const isMobile = useMobile();
  const styles = getServiceCardStyles(isMobile);

  return (
    <div
      onClick={() => navigate("/booking", { state: { selectedServiceId: service.id } })}
      style={styles.cardStyle}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = HOVER_SHADOW;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = BASE_SHADOW;
      }}
    >
      <div style={{ ...styles.getImageStyle(!!service.imageUrl), background: service.imageUrl ? `url(${service.imageUrl}) center/cover` : "#F8F5F0" }}>
        {!service.imageUrl && (
          <div style={styles.placeholderStyle}>{t.services.placeHolderPhoto}</div>
        )}
      </div>

      <div style={styles.bodyStyle}>
        <h3 style={styles.titleStyle}>{service.title}</h3>
        <p style={styles.descStyle}>{service.description || t.services.defaultDescription}</p>
      </div>

      <div style={styles.footerStyle}>
        <span style={styles.durationStyle}>{service.duration} {t.services.unit.min}</span>
        <div style={styles.dividerLineStyle} />
        <span style={styles.priceStyle}>{service.servicePrice} {t.services.unit.cost}</span>
      </div>
    </div>
  );
}