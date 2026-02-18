import { THEME } from '../shared/config/theme';
import { Divider } from '../shared/ui/Divider';
import type { PageName } from '../shared/api/routes';

interface FooterProps {
  onNavigate: (page: PageName) => void; 
}

export function Footer({ onNavigate }: FooterProps) {
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
              A sanctuary of style. Where every strand tells a story of craft and care.
            </p>
          </div>
          <div>
            <p style={{ fontFamily: THEME.fonts.sans, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: THEME.colors.gold, marginBottom: "20px" }}>Navigation</p>
            {["home","services","masters","booking","contacts"].map(p => (
              <p key={p} style={{ margin: "0 0 12px" }}>
                <button onClick={() => onNavigate(p as PageName)} style={{
                  background: "none", border: "none", padding: 0,
                  fontFamily: THEME.fonts.body, fontSize: "0.95rem",
                  color: "rgba(245,240,232,0.7)", cursor: "pointer", textTransform: "capitalize",
                }}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              </p>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: THEME.fonts.sans, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: THEME.colors.gold, marginBottom: "20px" }}>Legal</p>
            {["Privacy Policy","Terms of Service","Cookie Policy"].map(l => (
              <p key={l} style={{ margin: "0 0 12px" }}>
                <a href="#" style={{ fontFamily: THEME.fonts.body, fontSize: "0.95rem", color: "rgba(245,240,232,0.7)", textDecoration: "none" }}>{l}</a>
              </p>
            ))}
          </div>
        </div>
        <Divider />
        <p style={{ fontFamily: THEME.fonts.sans, fontSize: "0.7rem", color: "rgba(245,240,232,0.4)", textAlign: "center", marginTop: "24px", letterSpacing: "0.08em" }}>
          © 2025 Prestige Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}