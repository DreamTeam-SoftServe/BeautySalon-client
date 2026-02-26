import { SectionTitle } from "../../shared/ui/SectionTitle";
import { api } from "../../shared/api/api";
import { useState, useEffect } from "react";
import { ServiceCard } from "../../entities/service/ui/ServiceCard/ServiceCard";
import { Button } from "../../shared/ui/Button/Button";
import type { Service } from "../../shared/api/api";
import { useI18n } from "../../shared/i18n";
import { useNavigate } from "react-router-dom";
import { serviceTypeMap } from "../../shared/lib/serviceTypeMap";
import { useScrollAnimation } from "../../shared/hooks/useScrollAnimation";
import {
  sectionStyle,
  containerStyle,
  filterWrapStyle,
  getFilterButtonStyle,
  gridStyle,
  ctaWrapStyle,
  decor1,
  decor2,
  decor3,
  decor4,
} from "./ServicesSection.styles";

export function ServicesSection() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | "All">("All");

  const [titleRef, titleVisible] = useScrollAnimation(0.2);
  const [filterRef, filterVisible] = useScrollAnimation(0.2);
  const [gridRef, gridVisible] = useScrollAnimation(0.05);
  const [ctaRef, ctaVisible] = useScrollAnimation(0.5);

  useEffect(() => {
    api.getServices().then((data) => {
      setServices(data);
      setLoaded(true);
    });
  }, []);

  const categories: Array<"All" | number> = [
    "All",
    ...new Set(services.map((s) => s.serviceType)),
  ];

  const filtered =
    activeCategory === "All"
      ? services
      : services.filter((s) => s.serviceType === activeCategory);

  return (
    <section style={sectionStyle}>
      <div style={decor1} />
      <div style={decor2} />
      <div style={decor3} />
      <div style={decor4} />
      <div style={containerStyle}>
        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            ref={titleRef as React.RefObject<HTMLDivElement>}
            style={{
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <SectionTitle
              subtitle={t.services.sectionEyebrow}
              title={t.services.sectionTitle}
            />
          </div>

          <div
            ref={filterRef as React.RefObject<HTMLDivElement>}
            style={filterWrapStyle}
          >
            {categories.map((c, index) => (
              <button
                key={String(c)}
                onClick={() => setActiveCategory(c as "All" | number)}
                style={{
                  ...getFilterButtonStyle(activeCategory === c),
                  opacity: filterVisible ? 1 : 0,
                  transform: filterVisible
                    ? "translateY(0)"
                    : "translateY(15px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                  transitionDelay: filterVisible ? `${index * 0.07}s` : "0s",
                }}
              >
                {c === "All" ? t.services.filterAll : serviceTypeMap(c, t)}
              </button>
            ))}
          </div>

          <div
            ref={gridRef as React.RefObject<HTMLDivElement>}
            key={loaded ? "loaded" : "loading"}
            style={gridStyle}
          >
            {filtered.map((s, index) => (
              <div
                key={s.id}
                style={{
                  opacity: gridVisible ? 1 : 0,
                  transform: gridVisible
                    ? "translateY(0) scale(1)"
                    : "translateY(40px) scale(0.97)",
                  transition: "opacity 0.7s ease, transform 0.7s ease",
                  transitionDelay: gridVisible ? `${index * 0.08}s` : "0s",
                }}
              >
                <ServiceCard service={s} />
              </div>
            ))}
          </div>

          <div
            ref={ctaRef as React.RefObject<HTMLDivElement>}
            style={{
              ...ctaWrapStyle,
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
              transitionDelay: "0.2s",
            }}
          >
            <Button onClick={() => navigate("/booking")} variant="dark">
              {t.services.bookCta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
