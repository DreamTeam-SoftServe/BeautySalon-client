import { THEME } from '../shared/config/theme';
import { Button } from '../shared/ui/Button';
import type { PageName } from '../shared/api/routes';
import heroImg from '../shared/assets/istockphoto-1488432774-2048x2048.jpg';

interface HeroSectionProps {
  onNavigate: (page: PageName) => void;                 
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      background: THEME.colors.cream,
      position: "relative",
      overflow: "hidden",
      padding: "120px 5% 80px",
    }}>
      
      {}
      <div style={{
        position: "absolute", right: "-5%", top: "10%",
        width: "45%", height: "80%", 
        background: THEME.colors.white,
        borderLeft: `3px solid rgba(201,168,76,0.3)`,
        borderTop: `3px solid rgba(201,168,76,0.3)`,
        zIndex: 0,
      }} />

      <div style={{
        position: "absolute", right: "5%", top: "15%",
        width: "40%", 
        minWidth: "300px", 
        height: "70%",
        background: "linear-gradient(135deg, #C9A84C22 0%, #D4A5A511 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1,
      }}>
        {}
        <img 
          src={heroImg} 
          alt="Весільна зачіска" 
          style={{ 
            position: "relative", 
            width: "100%", 
            height: "100%", 
            objectFit: "cover",
            boxShadow: "-10px 10px 30px rgba(0,0,0,0.1)" 
          }} 
        />
      </div>

      {/* 4. ВИПРАВЛЕНО: Додали zIndex: 2, щоб текст завжди був поверх картинки на малих екранах */}
      <div style={{ position: "relative", maxWidth: "600px", zIndex: 2 }}>
        <p style={{
          fontFamily: THEME.fonts.sans,
          fontSize: "0.7rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: THEME.colors.gold,
          marginBottom: "24px",
          background: "rgba(255, 255, 255, 0.7)", // Трохи фону, щоб текст краще читався, якщо під ним картинка
          display: "inline-block",
          padding: "4px 8px",
          borderRadius: "4px"
        }}>
          ✦ Paris-Inspired Hair Atelier
        </p>
        <h1 style={{
          fontFamily: THEME.fonts.display,
          fontSize: "clamp(3rem, 7vw, 5.5rem)",
          fontWeight: 400,
          color: THEME.colors.charcoal,
          lineHeight: 1.05,
          margin: "0 0 28px",
          textShadow: "2px 2px 10px rgba(255,255,255,0.8)" // Захист тексту від наїзду на картинку
        }}>
          The Art<br />of Beautiful<br /><em style={{ fontStyle: "italic", color: THEME.colors.gold }}>Hair</em>
        </h1>
        <p style={{
          fontFamily: THEME.fonts.body,
          fontSize: "1.15rem",
          color: THEME.colors.muted,
          lineHeight: 1.8,
          marginBottom: "48px",
          maxWidth: "440px",
          background: "rgba(255, 255, 255, 0.7)", 
          padding: "8px",
          borderRadius: "8px"
        }}>
          Where Parisian craft meets modern vision. Each visit is a ritual — an experience of care, transformation, and quiet luxury.
        </p>
        
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Button onClick={() => onNavigate("booking")}>Book Appointment</Button>
          <Button variant="outline" onClick={() => onNavigate("services")}>Explore Services</Button>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "40px", marginTop: "64px", paddingTop: "40px", borderTop: `1px solid rgba(201,168,76,0.25)` }}>
          {[["12+", "Years"], ["4", "Masters"], ["3000+", "Clients"]].map(([n, l]) => (
            <div key={l}>
              <p style={{ fontFamily: THEME.fonts.display, fontSize: "2rem", color: THEME.colors.charcoal, margin: 0 }}>{n}</p>
              <p style={{ fontFamily: THEME.fonts.sans, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: THEME.colors.muted, margin: 0 }}>{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}