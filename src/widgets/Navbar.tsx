import { THEME } from '../shared/config/theme';
import { useState, useEffect } from 'react';
import { Button } from '../shared/ui/Button';
import type { PageName } from '../shared/api/routes';
import { useAuth } from '../shared/auth/context';

interface NavbarProps {
  onNavigate: (page: PageName) => void; 
  activePage?: string;                
}

export function Navbar({ activePage, onNavigate }: NavbarProps) {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "masters", label: "Masters" },
    { id: "booking", label: "Book Now" },
    { id: "contacts", label: "Contact" },
    { id: "account", label: "My Account"},
  ];

  return (
    <>
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 5%",
        background: scrolled ? "rgba(253,251,247,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: scrolled ? `1px solid rgba(201,168,76,0.15)` : "none",
        transition: "all 0.4s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: scrolled ? "64px" : "80px",
      }}>
        {/* Logo */}
        <div onClick={() => onNavigate("home")} style={{ cursor: "pointer" }}>
          <p style={{ fontFamily: THEME.fonts.display, fontSize: "1.4rem", fontWeight: 700, color: THEME.colors.charcoal, margin: 0, letterSpacing: "0.04em" }}>
            Prestige Studio
          </p>
          <p style={{ fontFamily: THEME.fonts.sans, fontSize: "0.6rem", letterSpacing: "0.3em", color: THEME.colors.gold, margin: 0, textTransform: "uppercase" }}>
            Hair Atelier
          </p>
        </div>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
          {links.filter(l => l.id !== "booking").map((l) => (
            <button
              key={l.id}
              onClick={() => onNavigate(l.id as PageName)}
              style={{
                background: "none",
                border: "none",
                fontFamily: THEME.fonts.sans,
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: activePage === l.id ? THEME.colors.gold : THEME.colors.charcoal,
                cursor: "pointer",
                padding: "4px 0",
                borderBottom: activePage === l.id ? `1px solid ${THEME.colors.gold}` : "1px solid transparent",
                transition: "all 0.2s",
              }}
            >
              {l.label}
            </button>
          ))}
          <Button onClick={() => onNavigate("booking")} variant="primary" style={{ padding: "10px 24px" }}>
            Book Now
          </Button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: THEME.colors.charcoal,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: "32px",
        }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: "20px", right: "24px", background: "none", border: "none", color: THEME.colors.cream, fontSize: "1.5rem", cursor: "pointer" }}>✕</button>
          {links.map((l) => (
            <button key={l.id} onClick={() => { onNavigate(l.id as PageName); setMenuOpen(false); }} style={{
              background: "none", border: "none",
              fontFamily: THEME.fonts.display, fontSize: "2.5rem",
              color: THEME.colors.cream, cursor: "pointer",
            }}>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}