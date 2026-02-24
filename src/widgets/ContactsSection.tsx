import { SectionTitle } from "../shared/ui/SectionTitle";
import { THEME } from "../shared/config/theme";
import { useI18n } from "../shared/i18n";

export function ContactsSection() {
  const { t } = useI18n();

  return (
    <section style={{ padding: "120px 5%", background: THEME.colors.white }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "start",
        }}
      >
        <div>
          <SectionTitle
            subtitle={t.contacts.sectionEyebrow}
            title={t.contacts.sectionTitle}
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "32px" }}
          >
            {[
              {
                label: t.contacts.labels.address,
                value: t.contacts.address,
                icon: "📍",
              },
              {
                label: t.contacts.labels.phone,
                value: t.contacts.phone,
                icon: "📞",
              },
              {
                label: t.contacts.labels.email,
                value: t.contacts.email,
                icon: "✉",
              },
              {
                label: t.contacts.labels.hours,
                value: t.contacts.hours,
                icon: "🕐",
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "rgba(201,168,76,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.1rem",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: THEME.fonts.sans,
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: THEME.colors.gold,
                      margin: "0 0 4px",
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: THEME.fonts.body,
                      fontSize: "1rem",
                      color: THEME.colors.charcoal,
                      margin: 0,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "48px" }}>
            <p
              style={{
                fontFamily: THEME.fonts.sans,
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: THEME.colors.gold,
                marginBottom: "16px",
              }}
            >
              {t.contacts.social}
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              {["Instagram", "Facebook", "Pinterest"].map((s) => (
                <a
                  key={s}
                  href="#"
                  style={{
                    fontFamily: THEME.fonts.sans,
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    textDecoration: "none",
                    color: THEME.colors.muted,
                    padding: "8px 16px",
                    border: `1px solid #D4C5A0`,
                    transition: "all 0.2s",
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div
          style={{
            aspectRatio: "1",
            border: `1px solid #E8E0D0`,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <iframe
            title="Prestige Studio Location"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d67307.51847911887!2d30.478836!3d50.424247!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce8314fdfde3%3A0xb47746ae37ae936e!2z0J3QsNCy0YfQsNC70YzQvdC-LdC90LDRg9C60L7QstC40Lkg0ZbQvdGB0YLQuNGC0YPRgiDQsNGC0L7QvNC90L7RlyDRgtCwINGC0LXQv9C70L7QstC-0Zcg0LXQvdC10YDQs9C10YLQuNC60Lgg0J3QotCj0KMgItCa0J_QhiI!5e1!3m2!1suk!2sua!4v1771715043811!5m2!1suk!2sua"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
