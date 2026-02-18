import { SectionTitle } from '../shared/ui/SectionTitle';
import { THEME } from '../shared/config/theme';

export function ContactsSection() {
  return (
    <section style={{ padding: "120px 5%", background: THEME.colors.white }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
        <div>
          <SectionTitle subtitle="Find Us" title={"Visit the Atelier"} />
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {[
              { label: "Address", value: "вулиця Політехнічна, 6, Київ, 02000", icon: "📍" },
              { label: "Phone", value: "+380 12 345 6789", icon: "📞" },
              { label: "Email", value: "PrestigeStudio@gmail.com", icon: "✉" },
              { label: "Hours", value: "Mon–Sat: 9:00 – 19:00\nSunday: Closed", icon: "🕐" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <div style={{
                  width: "44px", height: "44px",
                  background: "rgba(201,168,76,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.1rem", flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontFamily: THEME.fonts.sans, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: THEME.colors.gold, margin: "0 0 4px" }}>
                    {item.label}
                  </p>
                  <p style={{ fontFamily: THEME.fonts.body, fontSize: "1rem", color: THEME.colors.charcoal, margin: 0, whiteSpace: "pre-line" }}>
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "48px" }}>
            <p style={{ fontFamily: THEME.fonts.sans, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: THEME.colors.gold, marginBottom: "16px" }}>Follow Us</p>
            <div style={{ display: "flex", gap: "16px" }}>
              {["Instagram", "Facebook", "Pinterest"].map((s) => (
                <a key={s} href="#" style={{
                  fontFamily: THEME.fonts.sans, fontSize: "0.7rem", letterSpacing: "0.1em",
                  textDecoration: "none", color: THEME.colors.muted,
                  padding: "8px 16px", border: `1px solid #D4C5A0`,
                  transition: "all 0.2s",
                }}>
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div style={{
          aspectRatio: "1",
          background: "linear-gradient(135deg, #F5F0E8 0%, #E8E0D0 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          border: `1px solid #E8E0D0`,
          flexDirection: "column", gap: "16px",
        }}>
          <span style={{ fontSize: "3rem" }}>🗺</span>
          <p style={{ fontFamily: THEME.fonts.sans, fontSize: "0.75rem", color: THEME.colors.muted, letterSpacing: "0.1em" }}>
            Interactive map goes here
          </p>
          <a href="https://maps.google.com" target="_blank" rel="noopener" style={{
            fontFamily: THEME.fonts.sans, fontSize: "0.7rem", color: THEME.colors.gold,
            textDecoration: "none", letterSpacing: "0.1em",
          }}>
            Open in Google Maps →
          </a>
        </div>
      </div>
    </section>
  );
}