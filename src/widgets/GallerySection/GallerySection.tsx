import { useState } from "react";
import { useI18n } from "../../shared/i18n";
import { SectionTitle } from "../../shared/ui/SectionTitle";
import { Button } from "../../shared/ui/Button";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "../../shared/hooks/useScrollAnimation";
import {
  sectionStyle,
  containerStyle,
  gridWrapperStyle,
  headerStyle,
  gridStyle,
  getCardStyle,
  imgStyle,
  overlayStyle,
  overlayTitleStyle,
  overlayTagStyle,
  ctaRowStyle,
  galleryDecor1,
  galleryDecor2,
} from "./GallerySection.styles";

const GALLERY_ITEMS = [
  { id: 1, title: "Балаяж",      tag: "Фарбування", img: "https://placehold.co/800x320/2C2826/C9A84C?text=Balayage",   size: "wide"   },
  { id: 2, title: "Кератин",     tag: "Догляд",     img: "https://placehold.co/400x320/2C2826/C9A84C?text=Keratin",    size: "tall"   },
  { id: 3, title: "Стрижка",     tag: "Стрижка",    img: "https://placehold.co/400x320/2C2826/C9A84C?text=Haircut",    size: "tall"   },
  { id: 4, title: "Колорування", tag: "Фарбування", img: "https://placehold.co/600x320/2C2826/C9A84C?text=Coloring",   size: "medium" },
  { id: 5, title: "Укладка",     tag: "Стайлінг",   img: "https://placehold.co/200x320/2C2826/C9A84C?text=Styling",    size: "slim"   },
  { id: 6, title: "Хайлайтинг", tag: "Фарбування", img: "https://placehold.co/400x160/2C2826/C9A84C?text=Highlights", size: "small"  },
  { id: 7, title: "Омбре",       tag: "Фарбування", img: "https://placehold.co/400x160/2C2826/C9A84C?text=Ombre",      size: "small"  },
  { id: 8, title: "Догляд",      tag: "Процедури",  img: "https://placehold.co/400x160/2C2826/C9A84C?text=Treatment",  size: "small"  },
];

export function GallerySection() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const [titleRef, titleVisible] = useScrollAnimation(0.2);
  const [gridRef, gridVisible] = useScrollAnimation(0.05);
  const [ctaRef, ctaVisible] = useScrollAnimation(0.5);

  return (
    <section style={sectionStyle}>
      <div style={galleryDecor1} />
      <div style={galleryDecor2} />

      <div style={containerStyle}>
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          style={{
            ...headerStyle,
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <SectionTitle
            subtitle={t.gallery?.eyebrow ?? "Наші роботи"}
            title={t.gallery?.title ?? "Портфоліо"}
            align="center"
          />
        </div>
      </div>

      <div style={gridWrapperStyle}>
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          style={gridStyle}
        >
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              style={{
                ...getCardStyle(item.size),
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
                transitionDelay: gridVisible ? `${index * 0.07}s` : "0s",
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={item.img}
                alt={item.title}
                style={{
                  ...imgStyle,
                  transform: hoveredId === item.id ? "scale(1.05)" : "scale(1)",
                }}
              />
              <div style={{ ...overlayStyle, opacity: hoveredId === item.id ? 1 : 0 }}>
                <p style={overlayTitleStyle}>{item.title}</p>
                <p style={overlayTagStyle}>{item.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={containerStyle}>
        <div
          ref={ctaRef as React.RefObject<HTMLDivElement>}
          style={{
            ...ctaRowStyle,
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            transitionDelay: "0.2s",
          }}
        >
          <Button variant="outline" onClick={() => navigate("/services")}>
            {t.gallery?.cta ?? "Переглянути всі послуги"}
          </Button>
        </div>
      </div>
    </section>
  );
}