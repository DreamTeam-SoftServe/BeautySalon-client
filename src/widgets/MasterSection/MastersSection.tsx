import { useState, useEffect } from "react";
import { api } from "../../shared/api/api";
import { SectionTitle } from "../../shared/ui/SectionTitle";
import { Button } from "../../shared/ui/Button";
import { MasterCard } from "../../entities/service/ui/MasterCard/MasterCard";
import type { PageName } from "../../shared/api/routes";
import { useI18n } from "../../shared/i18n";
import { useScrollAnimation } from "../../shared/hooks/useScrollAnimation";
import {
  sectionStyle, containerStyle, gridStyle, ctaWrapStyle, decor1, decor2, decor3,
} from "./MastersSection.styles";

interface MastersSectionProps {
  onNavigate: (page: PageName) => void;
}

export function MastersSection({ onNavigate }: MastersSectionProps) {
  const [masters, setMasters] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  const { t } = useI18n();

  const [titleRef, titleVisible] = useScrollAnimation(0.2);
  const [gridRef, gridVisible] = useScrollAnimation(0.05);
  const [ctaRef, ctaVisible] = useScrollAnimation(0.5);

  useEffect(() => {
    api.getMasters().then((data) => {
      setMasters(data);
      setLoaded(true);
    });
  }, []);

  return (
    <section style={sectionStyle}>
      <div style={decor1} />
      <div style={decor2} />
      <div style={decor3} />
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
              subtitle={t.masters.sectionEyebrow}
              title={t.masters.sectionTitle}
            />
          </div>

          <div
            ref={gridRef as React.RefObject<HTMLDivElement>}
            key={loaded ? "loaded" : "loading"}
            style={gridStyle}
          >
            {masters.map((m, index) => (
              <div
                key={m.id}
                style={{
                  opacity: gridVisible ? 1 : 0,
                  transform: gridVisible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
                  transition: "opacity 0.7s ease, transform 0.7s ease",
                  transitionDelay: gridVisible ? `${index * 0.1}s` : "0s",
                }}
              >
                <MasterCard master={m} />
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
            <Button onClick={() => onNavigate("booking")} variant="outline">
              {t.masters.bookCta}
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}