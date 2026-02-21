import { THEME } from '../shared/config/theme';
import { useState, useEffect } from 'react';
import { api } from '../shared/api/api';
import { SectionTitle } from '../shared/ui/SectionTitle';
import { ServicesSection } from '../widgets/ServicesSection';
import { Divider } from '../shared/ui/Divider';
import type { Service } from '../shared/api/api'; 
import { useI18n } from '../shared/i18n';



export function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const { t } = useI18n();

  useEffect(() => { 
    api.getServices().then(setServices); 
  }, []);

  return (
    <div style={{ paddingTop: "80px" }}>
      <div style={{ padding: "80px 5% 60px", background: THEME.colors.cream, textAlign: "center" }}>
        <SectionTitle subtitle={t.services.sectionEyebrow} title={t.services.sectionTitle} align="center" />
        <p style={{ fontFamily: THEME.fonts.body, fontSize: "1.1rem", color: THEME.colors.muted, maxWidth: "560px", margin: "0 auto" }}>
          {t.services.offeringsBody}
        </p>
      </div>
      <ServicesSection/>
      
      {/* Full service table */}
      <section style={{ padding: "80px 5%", background: THEME.colors.white }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <SectionTitle subtitle={t.services.menuEyebrow} title={t.services.menuTitle} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {services.map((s, i) => (
              <div key={s.id}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "24px", alignItems: "center", padding: "24px 0" }}>
                  <div>
                    {}
                    <h3 style={{ fontFamily: THEME.fonts.display, fontSize: "1.3rem", fontWeight: 400, margin: "0 0 4px" }}>
                      {s.title}
                    </h3>
                    
                    {}
                    <p style={{ fontFamily: THEME.fonts.body, fontSize: "0.9rem", color: THEME.colors.muted, margin: 0 }}>
                      {s.description}
                    </p>
                  </div>
                  {/*<span style={{ fontFamily: THEME.fonts.sans, fontSize: "0.75rem", color: THEME.colors.muted, whiteSpace: "nowrap" }}>{s.duration} {t.services.unit.min}</span>
                  <span style={{ fontFamily: THEME.fonts.display, fontSize: "1.3rem", color: THEME.colors.gold, whiteSpace: "nowrap" }}>{t.services.unit.from} ${s.price}</span>
                  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                  */}
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