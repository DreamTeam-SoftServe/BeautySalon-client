import { useState, useEffect, useCallback } from "react";
import { Button } from "../../shared/ui/Button/Button";
import { api } from "../../shared/api/api";
import heroImg from "../../shared/assets/heroImg.jpg";
import heroImg2 from "../../shared/assets/heroImg2.jpg";
import heroImg3 from "../../shared/assets/heroImg3.jpg";
import heroImg4 from "../../shared/assets/heroImg4.jpg";
import { useI18n } from "../../shared/i18n";
import { useNavigate } from "react-router-dom";
import {
  sectionStyle, getImageWrapStyle, imageFrameStyle,
  contentStyle, getEyebrowStyle, getHeadingStyle, accentStyle,
  getBodyStyle, getCtaRowStyle, getStatsRowStyle,
  statNumberStyle, statLabelStyle, heroDecor1, heroDecor2,
  dotsWrapStyle, getDotStyle, arrowBtnStyle, imageCounterStyle,
} from "./HeroSection.styles";

const HERO_IMAGES = [heroImg, heroImg2, heroImg3, heroImg4];

const PARALLAX_DIRS = [
  { from: "scale(1.08) translateX(2%)",  to: "scale(1) translateX(-1%)" },
  { from: "scale(1.06) translateX(-2%)", to: "scale(1.02) translateX(1%)" },
  { from: "scale(1.1)  translateY(1%)",  to: "scale(1) translateY(-1%)" },
  { from: "scale(1.07) translateX(1%)",  to: "scale(1.01) translateX(-2%)" },
];

export function HeroSection() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [masterCount, setMasterCount] = useState<number | string>("...");
  const [clientCount, setClientCount] = useState<number | string>("...");
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const goTo = useCallback((next: number) => {
    setPrev(current);
    setCurrent(next);
    setTimeout(() => setPrev(null), 1200);
  }, [current]);

  const goNext = useCallback(() => {
    goTo(current === HERO_IMAGES.length - 1 ? 0 : current + 1);
  }, [current, goTo]);

  const goPrev = useCallback(() => {
    goTo(current === 0 ? HERO_IMAGES.length - 1 : current - 1);
  }, [current, goTo]);

  useEffect(() => {
    api.getMasters()
      .then((masters) => setMasterCount(masters.length))
      .catch(() => setMasterCount("4+"));
    api.getClientsCount()
      .then((count) => {
        const total = Number(count) || 0;
        setClientCount(total > 0 ? `${total}+` : "3000+");
      })
      .catch(() => setClientCount("3000+"));
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, [isPaused, goNext]);

  const stats = [
    ["12+", t.hero.stat1Label],
    [String(masterCount), t.hero.stat2Label],
    [String(clientCount), t.hero.stat3Label],
  ];

  return (
    <section style={sectionStyle}>
      <div style={heroDecor1} />
      <div style={heroDecor2} />

      <div
        style={getImageWrapStyle(visible)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {HERO_IMAGES.map((img, index) => {
          const isActive = index === current;
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
                alt={`Hero Slide ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transform: isActive
                    ? dir.to
                    : isLeaving
                    ? `scale(1.05) translateX(3%)`
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

        <div style={imageFrameStyle} />

        <div style={imageCounterStyle}>
          {current + 1} / {HERO_IMAGES.length}
        </div>

        <button style={arrowBtnStyle("left")} onClick={goPrev}>‹</button>
        <button style={arrowBtnStyle("right")} onClick={goNext}>›</button>

        <div style={dotsWrapStyle}>
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              style={getDotStyle(i === current)}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>

      <div style={contentStyle}>
        <p style={getEyebrowStyle(visible)}>{t.cta.eyebrow}</p>
        <h1 style={getHeadingStyle(visible)}>
          {t.hero.line1}<br />
          {t.hero.line2}<br />
          <em style={accentStyle}>{t.hero.line3}</em>
        </h1>
        <p style={getBodyStyle(visible)}>{t.hero.body}</p>
        <div style={getCtaRowStyle(visible)}>
          <Button onClick={() => navigate("/booking")}>{t.hero.ctaPrimary}</Button>
          <Button variant="outline" onClick={() => navigate("/services")}>{t.hero.ctaSecondary}</Button>
        </div>
        <div style={getStatsRowStyle(visible)}>
          {stats.map(([n, l]) => (
            <div key={l}>
              <p style={statNumberStyle}>{n}</p>
              <p style={statLabelStyle}>{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}