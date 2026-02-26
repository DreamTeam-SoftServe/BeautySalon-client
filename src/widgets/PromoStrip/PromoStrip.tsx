import { Button } from "../../shared/ui/Button";
import { useI18n } from "../../shared/i18n";
import { useNavigate } from "react-router-dom";
import { sectionStyle, eyebrowStyle, headingStyle } from "./PromoStrip.styles";

export function PromoStrip() {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <section style={sectionStyle}>
      <p style={eyebrowStyle}>{t.cta.eyebrow}</p>
      <h2 style={headingStyle}>{t.cta.heading}</h2>
      <Button onClick={() => navigate("/booking")} variant="ghost">
        {t.cta.button}
      </Button>
    </section>
  );
}