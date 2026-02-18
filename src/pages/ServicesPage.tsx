import { THEME } from '../shared/config/theme';
import { useState, useEffect } from 'react';
import { api } from '../shared/api/api';
import { SectionTitle } from '../shared/ui/SectionTitle';
import { ServicesSection } from '../widgets/ServicesSection';
import { Divider } from '../shared/ui/Divider';
import type { PageName } from '../shared/api/routes';
import type { Service } from '../shared/api/api'; 

interface ServicesPageProps {
  onNavigate: (page: PageName) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [services, setServices] = useState<Service[]>([]);
  
  useEffect(() => { 
    api.getServices().then(setServices); 
  }, []);

  return (
    <div style={{ paddingTop: "80px" }}>
      <div style={{ padding: "80px 5% 60px", background: THEME.colors.cream, textAlign: "center" }}>
        <SectionTitle subtitle="Our Offerings" title={"Services & Pricing"} align="center" />
        <p style={{ fontFamily: THEME.fonts.body, fontSize: "1.1rem", color: THEME.colors.muted, maxWidth: "560px", margin: "0 auto" }}>
          Every service is an experience. We use only premium products and take the time your hair deserves.
        </p>
      </div>
      
      <ServicesSection onNavigate={onNavigate} />
      
      {/* Full service table */}
      <section style={{ padding: "80px 5%", background: THEME.colors.white }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <SectionTitle subtitle="Complete Menu" title={"Service Details"} />
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
                  <span style={{ fontFamily: THEME.fonts.sans, fontSize: "0.75rem", color: THEME.colors.muted, whiteSpace: "nowrap" }}>{s.duration} min</span>
                  <span style={{ fontFamily: THEME.fonts.display, fontSize: "1.3rem", color: THEME.colors.gold, whiteSpace: "nowrap" }}>from ${s.price}</span>
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