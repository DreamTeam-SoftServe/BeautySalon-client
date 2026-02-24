import { THEME } from '../shared/config/theme';
import { Divider } from '../shared/ui/Divider';
import { useI18n } from '../shared/i18n';
import { useNavigate } from 'react-router-dom';

export function Footer() {
  const { t, locale, setLocale, availableLocales } = useI18n();
  const navigate = useNavigate();

  const footerLinks = [
    { label: t.nav.home, path: "/" },
    { label: t.nav.services, path: "/services" },
    { label: t.nav.masters, path: "/masters" },
    { label: t.nav.booking, path: "/booking" },
    { label: t.nav.contacts, path: "/contacts" },
  ];

  return (
    <footer style={{
      background: THEME.colors.charcoal,
      padding: "64px 5% 32px",
      color: THEME.colors.cream,
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "64px", marginBottom: "48px" }}>
          
          <div>
            <p style={{ fontFamily: THEME.fonts.display, fontSize: "1.8rem", margin: "0 0 8px" }}>Prestige Studio</p>
            <p style={{ fontFamily: THEME.fonts.sans, fontSize: "0.6rem", letterSpacing: "0.3em", color: THEME.colors.gold, margin: "0 0 20px" }}>HAIR ATELIER</p>
            <p style={{ fontFamily: THEME.fonts.body, fontSize: "0.95rem", color: "rgba(245,240,232,0.6)", lineHeight: 1.7, maxWidth: "280px" }}>
              {t.footer.tagline}
            </p>

            <div style={{ display: 'flex', gap: '8px', marginTop: '32px', flexWrap: 'wrap' }}>
              {availableLocales.map(l => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  style={{
                    fontFamily:THEME.fonts.sans,
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '7px 14px',
                    background: locale === l ? THEME.colors.gold : 'transparent',
                    color: locale === l ? THEME.colors.charcoal : 'rgba(245,240,232,0.45)',
                    border: `1px solid ${locale === l ? THEME.colors.gold : 'rgba(201,168,76,0.25)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontFamily: THEME.fonts.sans, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: THEME.colors.gold, marginBottom: "20px" }}>{t.footer.nav}</p>
            {footerLinks.map(link => (
              <p key={link.path} style={{ margin: "0 0 12px" }}>
                <button onClick={() => navigate(link.path)} style={{
                  background: "none", border: "none", padding: 0,
                  fontFamily: THEME.fonts.body, fontSize: "0.95rem",
                  color: "rgba(245,240,232,0.7)", cursor: "pointer", textTransform: "capitalize",
                }}>
                  {link.label}
                </button>
              </p>
            ))}
          </div>

          <div>
            <p style={{ fontFamily: THEME.fonts.sans, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: THEME.colors.gold, marginBottom: "20px" }}>{t.footer.legal}</p>
            {[t.footer.privacy, t.footer.terms, t.footer.cookies].map(l => (
              <p key={l} style={{ margin: "0 0 12px" }}>
                <a href="#" style={{ fontFamily: THEME.fonts.body, fontSize: "0.95rem", color: "rgba(245,240,232,0.7)", textDecoration: "none" }}>{l}</a>
              </p>
            ))}
          </div>
          
        </div>

        <Divider />
        <p style={{ fontFamily: THEME.fonts.sans, fontSize: "0.7rem", color: "rgba(245,240,232,0.4)", textAlign: "center", marginTop: "24px", letterSpacing: "0.08em" }}>
            {t.footer.copy}
        </p>
      </div>
    </footer>
  );
}