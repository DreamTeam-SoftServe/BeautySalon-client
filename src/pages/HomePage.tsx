import { THEME } from "../shared/config/theme";
import { HeroSection } from "../widgets/HeroSection";
import { ServicesSection } from "../widgets/ServicesSection";
import { MastersSection } from "../widgets/MastersSection";
import { Divider } from "../shared/ui/Divider";
import { Button } from "../shared/ui/Button";
import { useI18n } from "../shared/i18n";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <>
      <HeroSection />
      <Divider />
      <ServicesSection />
      <Divider />
      {/* Inline promo strip */}
      <section
        style={{
          padding: "80px 5%",
          background: THEME.colors.charcoal,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: THEME.fonts.sans,
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: THEME.colors.gold,
            marginBottom: "16px",
          }}
        >
          {t.cta.eyebrow}
        </p>
        <h2
          style={{
            fontFamily: THEME.fonts.display,
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 400,
            color: THEME.colors.cream,
            margin: "0 0 24px",
          }}
        >
          {t.cta.heading}
        </h2>
        <Button onClick={() => navigate("/booking")} variant="ghost">
          {t.cta.button}
        </Button>
      </section>
      <Divider />
      <MastersSection onNavigate={navigate} />
    </>
  );
}
