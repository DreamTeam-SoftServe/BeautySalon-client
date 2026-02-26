import { useState, useEffect, useCallback } from "react";
import { api } from "../../shared/api/api";
import { BookingForm } from "../../features/book-appointment/ui/BookingForm";
import type { Service, Master } from "../../shared/api/api";
import { useI18n } from "../../shared/i18n";
import {
  sectionStyle, carouselOverlayStyle, carouselFrameStyle,
  carouselDotsStyle, getDotStyle, carouselArrowStyle,
  eyebrowStyle, titleStyle, bodyTextStyle, dividerStyle,
  bookingSectionCss, getFormSideAnimStyle, getHeaderAnimStyle,
  getFormAnimStyle, getCarouselAnimStyle, carouselSlideStyle,
  carouselSlideImgStyle,
} from "./BookingSection.styles";

const S3_URL = "https://beautysalon-dreamteam.s3.eu-north-1.amazonaws.com";

const IMAGES = [
  `${S3_URL}/booking/booking1.jpg`,
  `${S3_URL}/booking/booking2.jpg`,
  `${S3_URL}/booking/booking3.jpg`,
  `${S3_URL}/booking/booking4.jpg`,
];

export function BookingSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [masters, setMasters]   = useState<Master[]>([]);
  const [current, setCurrent]   = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visible, setVisible]   = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const goTo = useCallback((next: number) => {
    setCurrent((next + IMAGES.length) % IMAGES.length);
  }, []);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

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

      <div style={getFormSideAnimStyle(visible)}>
        <div style={getHeaderAnimStyle(visible)}>
          <span style={eyebrowStyle}>{t.booking.pageEyebrow}</span>
          <h1 style={titleStyle}>{t.booking.pageTitle}</h1>
          <div style={dividerStyle} />
          <p style={bodyTextStyle}>{t.booking.pageBody}</p>
        </div>
        <div style={getFormAnimStyle(visible)}>
          <BookingForm services={services} masters={masters} />
        </div>
      </div>

      <div
        style={getCarouselAnimStyle(visible)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {IMAGES.map((img, index) => (
          <div key={index} style={carouselSlideStyle(index === current)}>
            <img src={img} alt={`Booking slide ${index + 1}`} style={carouselSlideImgStyle} />
          </div>
        ))}

        <div style={carouselOverlayStyle} />
        <div style={carouselFrameStyle} />
        <button style={carouselArrowStyle("left")}  onClick={goPrev}>‹</button>
        <button style={carouselArrowStyle("right")} onClick={goNext}>›</button>
        <div style={carouselDotsStyle}>
          {IMAGES.map((_, i) => (
            <button key={i} style={getDotStyle(i === current)} onClick={() => goTo(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}