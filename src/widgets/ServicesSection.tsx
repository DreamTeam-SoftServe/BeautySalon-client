import { THEME } from "../shared/config/theme";
import { SectionTitle } from "../shared/ui/SectionTitle";
import { api } from "../shared/api/api";
import { useState, useEffect } from "react";
import { ServiceCard } from "../entities/service/ui/ServiceCard";
import { Button } from "../shared/ui/Button";
import type { Service } from "../shared/api/api";
import { useI18n } from "../shared/i18n";
import { useNavigate } from "react-router-dom";

export const serviceTypeMap = (type: string | number) => {
  const { t } = useI18n();
  const key = String(type);
  switch (key) {
    case "0":
      return t.admin.services.type.option1;
    case "1":
      return t.admin.services.type.option2;
    case "2":
      return t.admin.services.type.option3;
    case "3":
      return t.admin.services.type.option4;
    case "4":
      return t.admin.services.type.option5;
    case "5":
      return t.admin.services.type.option6;
    case "6":
      return t.admin.services.type.option7;
    default:
      return t.services.menuTitle;
  }
};

export function ServicesSection() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | "All">("All");

  useEffect(() => {
    api.getServices().then(setServices);
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
    <section style={{ padding: "120px 5%", background: THEME.colors.offwhite }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionTitle
          subtitle={t.services.sectionEyebrow}
          title={t.services.sectionTitle}
        />

        {/* Category filter */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "48px",
          }}
        >
          {categories.map((c) => (
            <button
              key={String(c)}
              onClick={() => setActiveCategory(c as "All" | number)}
              style={{
                fontFamily: THEME.fonts.sans,
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "8px 20px",
                border: `1px solid ${activeCategory === c ? THEME.colors.charcoal : "#D4C5A0"}`,
                background:
                  activeCategory === c ? THEME.colors.charcoal : "transparent",
                color:
                  activeCategory === c
                    ? THEME.colors.cream
                    : THEME.colors.muted,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {c === "All" ? t.services.filterAll : serviceTypeMap(c)}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "2px",
          }}
        >
          {filtered.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "64px" }}>
          <Button onClick={() => navigate("/booking")} variant="dark">
            {t.services.bookCta}
          </Button>
        </div>
      </div>
    </section>
  );
}
