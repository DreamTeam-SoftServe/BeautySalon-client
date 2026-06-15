import { Divider } from "../../shared/ui/Divider/Divider";
import { useI18n } from "../../shared/i18n";
import { useNavigate } from "react-router-dom";
import { useMobile } from "../../shared/hooks/useMobile";
import { getFooterStyles } from "./Footer.styles";

export function Footer() {
  const { t, locale, setLocale, availableLocales } = useI18n();
  const navigate = useNavigate();

  const isMobile = useMobile();
  const styles = getFooterStyles(isMobile);

  const footerLinks = [
    { label: t.nav.home, path: "/" },
    { label: t.nav.services, path: "/services" },
    { label: t.nav.masters, path: "/masters" },
    { label: t.nav.booking, path: "/booking" },
    { label: t.nav.contacts, path: "/contacts" },
  ];

  return (
    <footer style={styles.footerStyle}>
      <div style={styles.innerStyle}>
        <div style={styles.gridStyle}>
          <div>
            <p style={styles.brandNameStyle}>Prestige Studio</p>
            <p style={styles.brandSubStyle}>HAIR ATELIER</p>
            <p style={styles.taglineStyle}>{t.footer.tagline}</p>
            <div style={styles.localeWrapStyle}>
              {availableLocales.map((l) => (
                <button key={l} onClick={() => setLocale(l)} style={styles.getLocaleButtonStyle(locale === l)}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p style={styles.colTitleStyle}>{t.footer.nav}</p>
            {footerLinks.map((link) => (
              <p key={link.path} style={{ margin: "0 0 12px" }}>
                <button onClick={() => navigate(link.path)} style={styles.navButtonStyle}>
                  {link.label}
                </button>
              </p>
            ))}
          </div>

          <div>
            <p style={styles.colTitleStyle}>{t.footer.legal}</p>
            {[t.footer.privacy, t.footer.terms, t.footer.cookies].map((l) => (
              <p key={l} style={{ margin: "0 0 12px" }}>
                <a href="#" style={styles.legalLinkStyle}>{l}</a>
              </p>
            ))}
          </div>
        </div>

        <Divider />
        <p style={styles.copyStyle}>{t.footer.copy}</p>
      </div>
    </footer>
  );
}