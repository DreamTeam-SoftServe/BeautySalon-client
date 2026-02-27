import { useState, useEffect, useCallback } from "react";
import { api } from "../../shared/api/api";
import { BookingForm } from "../../features/book-appointment/ui/BookingForm";
import type { Service, Master } from "../../shared/api/api";
import { useI18n } from "../../shared/i18n";
import {
  getSectionStyle, getFormSideStyle, getCarouselStyle,
  getHeaderStyle, getFormAnimStyle,
  carouselOverlayStyle, carouselFrameStyle,
  carouselDotsStyle, getDotStyle, carouselArrowStyle,
  eyebrowStyle, titleStyle, bodyTextStyle, dividerStyle,
  carouselSlideStyle, carouselSlideImgStyle,
  getBookingCss,
} from "./BookingSection.styles";

const S3_URL = "https://beautysalon-dreamteam.s3.eu-north-1.amazonaws.com";

const IMAGES = [
  `${S3_URL}/booking/booking1.jpg`,
  `${S3_URL}/booking/booking2.jpg`,
  `${S3_URL}/booking/booking3.jpg`,
  `${S3_URL}/booking/booking4.jpg`,
];

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

export function BookingSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [masters, setMasters]   = useState<Master[]>([]);
  const [current, setCurrent]   = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visible, setVisible]   = useState(false);
  const { t } = useI18n();
  const w = useWindowWidth();

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
    <section className="booking-section" style={getSectionStyle(w)}>
      <style>{getBookingCss(w)}</style>

      <div style={getFormSideStyle(w, visible)}>
        <div style={getHeaderStyle(visible)}>
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
        style={getCarouselStyle(w, visible)}
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