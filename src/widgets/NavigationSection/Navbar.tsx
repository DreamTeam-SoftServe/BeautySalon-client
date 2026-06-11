import { useState, useEffect } from "react";
import { Button } from "../../shared/ui/Button/Button";
import { useI18n } from "../../shared/i18n";
import { useNavigate } from "react-router-dom";
import {
  getNavStyle, logoWrapStyle, logoNameStyle, logoSubStyle,
  linksWrapStyle, getLinkStyle,
} from "./Navbar.styles";
import { useCart } from "../../app/providers/CartProvider";

interface NavbarProps {
  activePage?: string;
}

export function Navbar({ activePage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useI18n();
  const navigate = useNavigate();
  
  const { cartItems } = useCart();
  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { id: "home", path: "/", label: t.nav.home },
    { id: "services", path: "/services", label: t.nav.services },
    { id: "masters", path: "/masters", label: t.nav.masters },
    { id: "store", path: "/store", label: t.nav.store }, 
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
              {l.id === "store" && cartItemsCount > 0 && (
                  <span style={{
                      marginLeft: '6px',
                      backgroundColor: '#D4C5A0',
                      color: '#1A1A1A',
                      borderRadius: '50%',
                      padding: '2px 6px',
                      fontSize: '11px',
                      fontWeight: 'bold'
                  }}>
                      {cartItemsCount}
                  </span>
              )}
            </button>
          ))}
        <Button onClick={() => navigate("/booking")} variant="primary" style={{ padding: "10px 24px" }}>
          {t.nav.booking}
        </Button>
      </div>
    </nav>
  );
}