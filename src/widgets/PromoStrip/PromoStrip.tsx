import { Button } from "../../shared/ui/Button";
import { useI18n } from "../../shared/i18n";
import { useNavigate } from "react-router-dom";

import { useMobile } from "../../shared/hooks/useMobile"; 
import { getPromoStyles } from "./PromoStrip.styles"; 

export function PromoStrip() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const isMobile = useMobile(); 
  const styles = getPromoStyles(isMobile);

  return (
    <section style={styles.sectionStyle}>
      <p style={styles.eyebrowStyle}>{t.cta.eyebrow}</p>
      <h2 style={styles.headingStyle}>{t.cta.heading}</h2>
      <Button onClick={() => navigate("/booking")} variant="ghost">
        {t.cta.button}
      </Button>
    </section>
  );
}