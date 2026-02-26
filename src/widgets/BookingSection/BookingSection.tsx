import { useState, useEffect, useCallback } from "react";
import { api } from "../../shared/api/api";
import { BookingForm } from "../../features/book-appointment/ui/BookingForm";
import type { Service, Master } from "../../shared/api/api";
import { useI18n } from "../../shared/i18n";
import heroImg  from "../../shared/assets/heroImg.jpg";
import heroImg2 from "../../shared/assets/heroImg2.jpg";
import heroImg3 from "../../shared/assets/heroImg3.jpg";
import heroImg4 from "../../shared/assets/heroImg4.jpg";
import {
  sectionStyle, formSideStyle, carouselSideStyle,
  carouselOverlayStyle, carouselFrameStyle,
  carouselDotsStyle, getDotStyle, carouselArrowStyle,
  headerStyle, eyebrowStyle, titleStyle, bodyTextStyle, dividerStyle,
  bookingSectionCss,
} from "./BookingSection.styles";

const IMAGES = [heroImg, heroImg2, heroImg3, heroImg4];

const PARALLAX_DIRS = [
  { from: "scale(1.08) translateX(2%)",  to: "scale(1) translateX(-1%)"   },
  { from: "scale(1.06) translateX(-2%)", to: "scale(1.02) translateX(1%)" },
  { from: "scale(1.1)  translateY(1%)",  to: "scale(1) translateY(-1%)"   },
  { from: "scale(1.07) translateX(1%)",  to: "scale(1.01) translateX(-2%)"},
];

export function BookingSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [masters, setMasters]   = useState<Master[]>([]);
  const [current, setCurrent]   = useState(0);
  const [prev, setPrev]         = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const [visible, setVisible] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const goTo = useCallback((next: number) => {
    setPrev(current);
    setCurrent(next);
    setTimeout(() => setPrev(null), 1200);
  }, [current]);

  const goNext = useCallback(() => {
    goTo(current === IMAGES.length - 1 ? 0 : current + 1);
  }, [current, goTo]);

  const goPrev = useCallback(() => {
    goTo(current === 0 ? IMAGES.length - 1 : current - 1);
  }, [current, goTo]);

  useEffect(() => {
    api.getServices().then(setServices);
    api.getMasters().then(setMasters);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(goNext, 4500);
    return () => clearInterval(interval);
  }, [isPaused, goNext]);

  return (
    <section className="booking-section" style={sectionStyle}>
      <style>{bookingSectionCss}</style>

      <div style={{
        ...formSideStyle,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-40px)",
        transition: "opacity 0.9s ease, transform 0.9s ease",
      }}>
        <div style={{
          ...headerStyle,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
          transitionDelay: "0.1s",
        }}>
          <span style={eyebrowStyle}>{t.booking.pageEyebrow}</span>
          <h1 style={titleStyle}>{t.booking.pageTitle}</h1>
          <div style={dividerStyle} />
          <p style={bodyTextStyle}>{t.booking.pageBody}</p>
        </div>

        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
          transitionDelay: "0.3s",
        }}>
          <BookingForm services={services} masters={masters} />
        </div>
      </div>

      <div
        style={{
          ...carouselSideStyle,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(50px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
          transitionDelay: "0.2s",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {IMAGES.map((img, index) => {
          const isActive  = index === current;
          const isLeaving = index === prev;
          const dir = PARALLAX_DIRS[index];

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                inset: 0,
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 2 : isLeaving ? 1 : 0,
                transition: "opacity 1.2s ease",
              }}
            >
              <img
                src={img}
                alt={`Booking slide ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transform: isActive
                    ? dir.to
                    : isLeaving
                    ? "scale(1.05) translateX(3%)"
                    : dir.from,
                  transition: isActive
                    ? "transform 5s ease-out"
                    : isLeaving
                    ? "transform 1.2s ease-in"
                    : "none",
                }}
              />
            </div>
          );
        })}

        <div style={carouselOverlayStyle} />
        <div style={carouselFrameStyle} />

        <button style={carouselArrowStyle("left")}  onClick={goPrev}>‹</button>
        <button style={carouselArrowStyle("right")} onClick={goNext}>›</button>

        <div style={carouselDotsStyle}>
          {IMAGES.map((_, i) => (
            <button
              key={i}
              style={getDotStyle(i === current)}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}