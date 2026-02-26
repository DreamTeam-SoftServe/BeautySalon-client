import { useState, useEffect } from "react";
import { Button } from "../../shared/ui/Button/Button";
import { useI18n } from "../../shared/i18n";
import { useNavigate } from "react-router-dom";
import {
  getNavStyle, logoWrapStyle, logoNameStyle, logoSubStyle,
  linksWrapStyle, getLinkStyle,
} from "./Navbar.styles";

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
    <nav style={getNavStyle(scrolled)}>
      <div onClick={() => navigate("/")} style={logoWrapStyle}>
        <p style={logoNameStyle}>Prestige Studio</p>
        <p style={logoSubStyle}>Hair Atelier</p>
      </div>

      <div style={linksWrapStyle}>
        {links
          .filter((l) => l.id !== "booking")
          .map((l) => (
            <button
              key={l.id}
              onClick={() => navigate(l.path)}
              style={getLinkStyle(activePage === l.id)}
            >
              {l.label}
            </button>
          ))}
        <Button onClick={() => navigate("/booking")} variant="primary" style={{ padding: "10px 24px" }}>
          {t.nav.booking}
        </Button>
      </div>
    </nav>
  );
}