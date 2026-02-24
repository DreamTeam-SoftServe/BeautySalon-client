import { THEME } from "../shared/config/theme";
import { Button } from "../shared/ui/Button";
import heroImg from "../shared/assets/heroImg.jpg";
import { useI18n } from "../shared/i18n";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: THEME.colors.cream,
        position: "relative",
        overflow: "hidden",
        padding: "120px 5% 80px",
      }}
    >
      {}
      <div
        style={{
          position: "absolute",
          right: "-5%",
          top: "10%",
          width: "45%",
          height: "80%",
          background: THEME.colors.white,
          borderLeft: `3px solid rgba(201,168,76,0.3)`,
          borderTop: `3px solid rgba(201,168,76,0.3)`,
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          right: "5%",
          top: "15%",
          width: "40%",
          minWidth: "300px",
          height: "70%",
          background: "linear-gradient(135deg, #C9A84C22 0%, #D4A5A511 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        {}
        <img
          src={heroImg}
          alt="Весільна зачіска"
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            boxShadow: "-10px 10px 30px rgba(0,0,0,0.1)",
          }}
        />
      </div>

      {}
      <div style={{ position: "relative", maxWidth: "600px", zIndex: 2 }}>
        <p
          style={{
            fontFamily: THEME.fonts.sans,
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: THEME.colors.gold,
            marginBottom: "24px",
            background: "rgba(255, 255, 255, 0.7)",
            display: "inline-block",
            padding: "4px 8px",
            borderRadius: "4px",
          }}
        >
          {t.cta.eyebrow}
        </p>
        <h1
          style={{
            fontFamily: THEME.fonts.display,
            fontSize: "clamp(3rem, 7vw, 5.5rem)",
            fontWeight: 400,
            color: THEME.colors.charcoal,
            lineHeight: 1.05,
            margin: "0 0 28px",
            textShadow: "2px 2px 10px rgba(255,255,255,0.8)",
          }}
        >
          {t.hero.line1}
          <br />
          {t.hero.line2}
          <br />
          <em style={{ fontStyle: "italic", color: THEME.colors.gold }}>
            {t.hero.line3}
          </em>
        </h1>
        <p
          style={{
            fontFamily: THEME.fonts.body,
            fontSize: "1.15rem",
            color: THEME.colors.muted,
            lineHeight: 1.8,
            marginBottom: "48px",
            maxWidth: "440px",
            background: "rgba(255, 255, 255, 0.7)",
            padding: "8px",
            borderRadius: "8px",
          }}
        >
          {t.hero.body}
        </p>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Button onClick={() => navigate("/booking")}>
            {t.hero.ctaPrimary}
          </Button>
          <Button variant="outline" onClick={() => navigate("/services")}>
            {t.hero.ctaSecondary}
          </Button>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            marginTop: "64px",
            paddingTop: "40px",
            borderTop: `1px solid rgba(201,168,76,0.25)`,
          }}
        >
          {[
            ["12+", t.hero.stat1Label],
            ["4", t.hero.stat2Label],
            ["3000+", t.hero.stat3Label],
          ].map(([n, l]) => (
            <div key={l}>
              <p
                style={{
                  fontFamily: THEME.fonts.display,
                  fontSize: "2rem",
                  color: THEME.colors.charcoal,
                  margin: 0,
                }}
              >
                {n}
              </p>
              <p
                style={{
                  fontFamily: THEME.fonts.sans,
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: THEME.colors.muted,
                  margin: 0,
                }}
              >
                {l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
