import { THEME } from '../shared/config/theme';
import { HeroSection } from '../widgets/HeroSection';
import { ServicesSection } from '../widgets/ServicesSection';
import { MastersSection } from '../widgets/MastersSection';
import { Divider } from '../shared/ui/Divider';
import { Button } from '../shared/ui/Button';
import type { PageName } from '../shared/api/routes';

interface HomePageProps {
  onNavigate: (page: PageName) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <>
      <HeroSection onNavigate={onNavigate} />
      <Divider />
      <ServicesSection onNavigate={onNavigate} />
      <Divider />
      {/* Inline promo strip */}
      <section style={{
        padding: "80px 5%",
        background: THEME.colors.charcoal,
        textAlign: "center",
      }}>
        <p style={{ fontFamily: THEME.fonts.sans, fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: THEME.colors.gold, marginBottom: "16px" }}>
          Limited Availability
        </p>
        <h2 style={{ fontFamily: THEME.fonts.display, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: THEME.colors.cream, margin: "0 0 24px" }}>
          Reserve Your Seat at the Atelier
        </h2>
        <Button onClick={() => onNavigate("booking")} variant="ghost">Book Now — It's Free</Button>
      </section>
      <Divider />
      <MastersSection onNavigate={onNavigate} />
    </>
  );
}