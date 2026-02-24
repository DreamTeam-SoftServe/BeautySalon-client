import { THEME } from "../shared/config/theme";
import { useState, useEffect } from "react";
import { Button } from "../shared/ui/Button";
import { useI18n } from "../shared/i18n";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  activePage?: string;
}

export function Navbar({ activePage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useI18n();
  const navigate = useNavigate();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { id: "home", path: "/", label: t.nav.home },
    { id: "services", path: "/services", label: t.nav.services },
    { id: "masters", path: "/masters", label: t.nav.masters },
    { id: "booking", path: "/booking", label: t.nav.booking },
    { id: "contacts", path: "/contacts", label: t.nav.contacts },
    { id: "account", path: "/account", label: t.nav.account },
  ];

  return (
    <>
      <nav
        style={{
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
        }}
      >
        {}
        <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <p
            style={{
              fontFamily: THEME.fonts.display,
              fontSize: "1.4rem",
              fontWeight: 700,
              color: THEME.colors.charcoal,
              margin: 0,
              letterSpacing: "0.04em",
            }}
          >
            Prestige Studio
          </p>
          <p
            style={{
              fontFamily: THEME.fonts.sans,
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              color: THEME.colors.gold,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Hair Atelier
          </p>
        </div>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
          {links
            .filter((l) => l.id !== "booking")
            .map((l) => (
              <button
                key={l.id}
                onClick={() => navigate(l.path)}
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: THEME.fonts.sans,
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color:
                    activePage === l.id
                      ? THEME.colors.gold
                      : THEME.colors.charcoal,
                  cursor: "pointer",
                  padding: "4px 0",
                  borderBottom:
                    activePage === l.id
                      ? `1px solid ${THEME.colors.gold}`
                      : "1px solid transparent",
                  transition: "all 0.2s",
                }}
              >
                {l.label}
              </button>
            ))}

          <Button
            onClick={() => navigate("/booking")}
            variant="primary"
            style={{ padding: "10px 24px" }}
          >
            {t.nav.booking}
          </Button>
        </div>
      </nav>
    </>
  );
}
