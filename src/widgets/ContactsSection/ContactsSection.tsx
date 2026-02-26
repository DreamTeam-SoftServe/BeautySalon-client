import { SectionTitle } from "../../shared/ui/SectionTitle";
import { useI18n } from "../../shared/i18n";
import { useScrollAnimation } from "../../shared/hooks/useScrollAnimation";
import {
  sectionStyle, containerStyle, contactListStyle, contactItemStyle,
  iconStyle, labelStyle, valueStyle, socialTitleStyle, socialLinkStyle,
  mapWrapperStyle, decor1, decor2
} from "./ContactsSection.styles";

export function ContactsSection() {
  const { t } = useI18n();

  const [titleRef, titleVisible] = useScrollAnimation(0.2);
  const [listRef, listVisible] = useScrollAnimation(0.1);
  const [socialRef, socialVisible] = useScrollAnimation(0.3);
  const [mapRef, mapVisible] = useScrollAnimation(0.05);

  const contacts = [
    { label: t.contacts.labels.address, value: t.contacts.address, icon: "📍" },
    { label: t.contacts.labels.phone,   value: t.contacts.phone,   icon: "📞" },
    { label: t.contacts.labels.email,   value: t.contacts.email,   icon: "✉"  },
    { label: t.contacts.labels.hours,   value: t.contacts.hours,   icon: "🕐" },
  ];

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <div style={decor1} />
        <div style={decor2} />

        <div style={{ position: "relative", zIndex: 2 }}>

          {/* Заголовок */}
          <div
            ref={titleRef as React.RefObject<HTMLDivElement>}
            style={{
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? "translateX(0)" : "translateX(-30px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <SectionTitle
              subtitle={t.contacts.sectionEyebrow}
              title={t.contacts.sectionTitle}
            />
          </div>

          <div
            ref={listRef as React.RefObject<HTMLDivElement>}
            style={contactListStyle}
          >
            {contacts.map((item, index) => (
              <div
                key={item.label}
                style={{
                  ...contactItemStyle,
                  opacity: listVisible ? 1 : 0,
                  transform: listVisible ? "translateX(0)" : "translateX(-20px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                  transitionDelay: listVisible ? `${index * 0.1}s` : "0s",
                }}
              >
                <div style={{
                  ...iconStyle,
                  transform: listVisible ? "scale(1)" : "scale(0.6)",
                  transition: "transform 0.5s ease",
                  transitionDelay: listVisible ? `${index * 0.1}s` : "0s",
                }}>
                  {item.icon}
                </div>
                <div>
                  <p style={labelStyle}>{item.label}</p>
                  <p style={valueStyle}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Соцмережі */}
          <div
            ref={socialRef as React.RefObject<HTMLDivElement>}
            style={{
              marginTop: "48px",
              opacity: socialVisible ? 1 : 0,
              transform: socialVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <p style={socialTitleStyle}>{t.contacts.social}</p>
            <div style={{ display: "flex", gap: "16px" }}>
              {["Instagram", "Facebook", "Pinterest"].map((s, index) => (
                <a
                  key={s}
                  href="#"
                  style={{
                    ...socialLinkStyle,
                    opacity: socialVisible ? 1 : 0,
                    transform: socialVisible ? "translateY(0)" : "translateY(10px)",
                    transition: "opacity 0.5s ease, transform 0.5s ease, background 0.2s, color 0.2s",
                    transitionDelay: socialVisible ? `${index * 0.1}s` : "0s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "#D4C5A0";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#777";
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={mapRef as React.RefObject<HTMLDivElement>}
          style={{
            ...mapWrapperStyle,
            opacity: mapVisible ? 1 : 0,
            transform: mapVisible ? "translateX(0) scale(1)" : "translateX(40px) scale(0.98)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
            transitionDelay: "0.2s",
          }}
        >
          <iframe
            title="Prestige Studio Location"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d67307.51847911887!2d30.478836!3d50.424247!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce8314fdfde3%3A0xb47746ae37ae936e!2z0J3QsNCy0YfQsNC70YzQvdC-LdC90LDRg9C60L7QstC40Lkg0ZbQvdGB0YLQuNGC0YPRgiDQsNGC0L7QvNC90L7RnyDRgtCwINGC0LXQv9C70L7QstC-0Zcg0LXQvdC10YDQs9C10YLQuNC60Lgg0J3QotCj0KMgItCa0J_QhiI!5e1!3m2!1suk!2sua!4v1771715043811!5m2!1suk!2sua"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}