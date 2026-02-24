import { THEME } from "../../../shared/config/theme";
import type { Service } from "../../../shared/api/api";
import { useI18n } from "../../../shared/i18n";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { t } = useI18n();

  return (
    <div
      style={{
        padding: "40px",
        background: THEME.colors.white,
        border: "1px solid #F0EBE3",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        transition: "transform 0.3s ease",
        cursor: "pointer",
      }}
      onMouseOver={(e) =>
        (e.currentTarget.style.transform = "translateY(-5px)")
      }
      onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div
        style={{
          width: "100%",
          height: "220px",
          background: service.imageUrl
            ? `url(${service.imageUrl}) center/cover`
            : "#F8F5F0",
          borderRadius: "2px",
          border: "1px solid #F0EBE3",
        }}
      >
        {!service.imageUrl && (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#D4C5A0",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
            }}
          >
            {t.services.placeHolderPhoto}
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <h3
          style={{
            fontFamily: THEME.fonts.display,
            fontSize: "1.5rem",
            margin: 0,
            color: THEME.colors.charcoal,
            fontWeight: 400,
          }}
        >
          {service.title}
        </h3>

        <p
          style={{
            fontSize: "0.9rem",
            color: THEME.colors.muted,
            lineHeight: "1.7",
            margin: 0,
            minHeight: "60px",
          }}
        >
          {service.description || t.services.defaultDescription}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "auto",
          paddingTop: "20px",
          borderTop: "1px solid #F8F5F0",
        }}
      >
        <span
          style={{
            fontSize: "0.75rem",
            color: THEME.colors.gold,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            fontWeight: 600,
          }}
        >
          {service.duration} {t.services.unit.min}
        </span>

        <div
          style={{
            width: "30px",
            height: "1px",
            background: THEME.colors.gold,
          }}
        ></div>

        <span
          style={{
            fontSize: "0.9rem",
            fontWeight: 600,
            color: THEME.colors.charcoal,
          }}
        >
          {service.servicePrice} {t.services.unit.cost}
        </span>
      </div>
    </div>
  );
}
