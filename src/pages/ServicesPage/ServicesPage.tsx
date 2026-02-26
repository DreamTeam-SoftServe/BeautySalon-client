import { useState, useEffect } from "react";
import { api } from "../../shared/api/api";
import type { Service } from "../../shared/api/api";
import { useI18n } from "../../shared/i18n";
import { PageHeader } from "../../shared/ui/PageHeader";
import { SectionTitle } from "../../shared/ui/SectionTitle";
import { ServicesSection } from "../../widgets/ServiceSection/ServicesSection";
import { Divider } from "../../shared/ui/Divider";
import {
  pageWrapStyle, tablesSectionStyle, tableContainerStyle,
  tableListStyle, tableRowStyle, serviceTitleStyle,
  serviceDescStyle, servicePriceStyle,
} from "./ServicesPage.styles";

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const { t } = useI18n();

  useEffect(() => {
    api.getServices().then(setServices);
  }, []);

  return (
    <div style={pageWrapStyle}>
      <PageHeader
        subtitle={t.services.sectionEyebrow}
        title={t.services.sectionTitle}
        body={t.services.offeringsBody}
      />
      <ServicesSection />

      <section style={tablesSectionStyle}>
        <div style={tableContainerStyle}>
          <SectionTitle subtitle={t.services.menuEyebrow} title={t.services.menuTitle} />
          <div style={tableListStyle}>
            {services.map((s, i) => (
              <div key={s.id}>
                <div style={tableRowStyle}>
                  <div>
                    <h3 style={serviceTitleStyle}>{s.title}</h3>
                    <p style={serviceDescStyle}>{s.description}</p>
                  </div>
                  <span style={servicePriceStyle}>
                    {s.duration} {t.services.unit.min} — {s.servicePrice} UAH
                  </span>
                </div>
                {i < services.length - 1 && <Divider />}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}