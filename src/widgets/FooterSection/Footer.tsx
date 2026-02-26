import { Divider } from "../../shared/ui/Divider/Divider";
import { useI18n } from "../../shared/i18n";
import { useNavigate } from "react-router-dom";
import {
  footerStyle, innerStyle, gridStyle, brandNameStyle, brandSubStyle,
  taglineStyle, localeWrapStyle, getLocaleButtonStyle, colTitleStyle,
  navButtonStyle, legalLinkStyle, copyStyle,
} from "./Footer.styles";

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
    <footer style={footerStyle}>
      <div style={innerStyle}>
        <div style={gridStyle}>
          <div>
            <p style={brandNameStyle}>Prestige Studio</p>
            <p style={brandSubStyle}>HAIR ATELIER</p>
            <p style={taglineStyle}>{t.footer.tagline}</p>
            <div style={localeWrapStyle}>
              {availableLocales.map((l) => (
                <button key={l} onClick={() => setLocale(l)} style={getLocaleButtonStyle(locale === l)}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p style={colTitleStyle}>{t.footer.nav}</p>
            {footerLinks.map((link) => (
              <p key={link.path} style={{ margin: "0 0 12px" }}>
                <button onClick={() => navigate(link.path)} style={navButtonStyle}>
                  {link.label}
                </button>
              </p>
            ))}
          </div>

          <div>
            <p style={colTitleStyle}>{t.footer.legal}</p>
            {[t.footer.privacy, t.footer.terms, t.footer.cookies].map((l) => (
              <p key={l} style={{ margin: "0 0 12px" }}>
                <a href="#" style={legalLinkStyle}>{l}</a>
              </p>
            ))}
          </div>
        </div>

        <Divider />
        <p style={copyStyle}>{t.footer.copy}</p>
      </div>
    </footer>
  );
}