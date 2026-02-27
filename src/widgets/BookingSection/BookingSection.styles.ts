import { THEME } from "../../shared/config/theme";
import type { CSSProperties } from "react";

const BP = { mobile: 600, tablet: 900 };

export const getSectionStyle = (w: number): CSSProperties => ({
  minHeight: "unset",
  background: THEME.colors.charcoal,
  color: THEME.colors.cream,
  display: "flex",
  flexDirection: w < BP.tablet ? "column" : "row",
  alignItems: w < BP.tablet ? "stretch" : "flex-start",
  justifyContent: "center",
  padding: w < BP.mobile ? "32px 5% 40px" : w < BP.tablet ? "40px 5% 60px" : "40px 5% 80px",
  gap: w < BP.tablet ? "32px" : "60px",
  boxSizing: "border-box",
  position: "relative",
  overflow: "hidden",
});

export const getFormSideStyle = (w: number, visible: boolean): CSSProperties => ({
  flex: w < BP.tablet ? "none" : "0 0 45%",
  width: w < BP.tablet ? "100%" : undefined,
  maxWidth: w < BP.tablet ? "100%" : "520px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  position: "relative",
  zIndex: 2,
  opacity: visible ? 1 : 0,
  transform: visible ? "translateX(0)" : w < BP.tablet ? "translateY(20px)" : "translateX(-40px)",
  transition: "opacity 0.9s ease, transform 0.9s ease",
});

export const getHeaderStyle = (visible: boolean): CSSProperties => ({
  marginBottom: "40px",
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(20px)",
  transition: "opacity 0.8s ease, transform 0.8s ease",
  transitionDelay: "0.1s",
});

export const getFormAnimStyle = (visible: boolean): CSSProperties => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(30px)",
  transition: "opacity 0.8s ease, transform 0.8s ease",
  transitionDelay: "0.3s",
});

export const getCarouselStyle = (w: number, visible: boolean): CSSProperties => ({
  flex: w < BP.tablet ? "none" : "0 0 48%",
  width: w < BP.tablet ? "100%" : undefined,
  height: w < BP.mobile ? "260px" : w < BP.tablet ? "380px" : "75vh",
  minHeight: w < BP.tablet ? "unset" : "500px",
  maxHeight: w < BP.tablet ? "unset" : "700px",
  position: "relative",
  overflow: "hidden",
  borderRadius: "12px",
  border: `2px solid ${THEME.colors.gold}`,
  boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
  opacity: visible ? 1 : 0,
  transform: visible ? "translateX(0)" : w < BP.tablet ? "translateY(20px)" : "translateX(50px)",
  transition: "opacity 0.9s ease, transform 0.9s ease",
  transitionDelay: "0.2s",
});

export const carouselOverlayStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(to top, rgba(30,25,20,0.5) 0%, transparent 50%)",
  zIndex: 2,
  pointerEvents: "none",
};

export const carouselFrameStyle: CSSProperties = {
  position: "absolute",
  inset: "20px",
  border: `1px solid rgba(201,168,76,0.3)`,
  zIndex: 3,
  pointerEvents: "none",
  borderRadius: "4px",
};

export const carouselDotsStyle: CSSProperties = {
  position: "absolute",
  bottom: "32px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: "8px",
  zIndex: 4,
};

export const getDotStyle = (active: boolean): CSSProperties => ({
  width: active ? "28px" : "8px",
  height: "8px",
  borderRadius: active ? "4px" : "50%",
  background: active ? THEME.colors.gold : "rgba(255,255,255,0.35)",
  border: `1px solid rgba(201,168,76,0.5)`,
  cursor: "pointer",
  transition: "all 0.3s ease",
  padding: 0,
});

export const carouselArrowStyle = (side: "left" | "right"): CSSProperties => ({
  position: "absolute",
  top: "50%",
  [side]: "16px",
  transform: "translateY(-50%)",
  zIndex: 4,
  background: "rgba(0,0,0,0.25)",
  border: `1px solid rgba(201,168,76,0.4)`,
  color: THEME.colors.cream,
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.3rem",
  backdropFilter: "blur(6px)",
  transition: "all 0.2s",
});

export const eyebrowStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.7rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: THEME.colors.gold,
  marginBottom: "16px",
  display: "block",
};

export const titleStyle: CSSProperties = {
  fontFamily: THEME.fonts.display,
  fontSize: "clamp(2rem, 4vw, 3.2rem)",
  fontWeight: 400,
  color: THEME.colors.cream,
  margin: "0 0 16px",
  lineHeight: 1.1,
};

export const bodyTextStyle: CSSProperties = {
  fontFamily: THEME.fonts.body,
  fontSize: "1rem",
  color: "rgba(245,240,232,0.65)",
  lineHeight: 1.7,
  margin: 0,
};

export const dividerStyle: CSSProperties = {
  width: "48px",
  height: "1px",
  background: THEME.colors.gold,
  margin: "20px 0 40px",
  opacity: 0.6,
};

export const carouselSlideStyle = (active: boolean): CSSProperties => ({
  position: "absolute",
  inset: 0,
  opacity: active ? 1 : 0,
  transform: active ? "scale(1)" : "scale(1.12)",
  transition: "opacity 0.9s ease, transform 0.9s ease",
  zIndex: active ? 1 : 0,
});

export const carouselSlideImgStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

export const getBookingCss = (w: number) => `
  .booking-section h2, .booking-section h3, .booking-section span {
    color: ${THEME.colors.cream} !important;
  }
  .booking-section p { color: rgba(245,240,232,0.7) !important; }
  .booking-section input, .booking-section select, .booking-section textarea {
    color: ${THEME.colors.cream} !important;
    background-color: rgba(255,255,255,0.06) !important;
    border: 1px solid rgba(245,240,232,0.15) !important;
    padding: 12px 16px; border-radius: 4px; width: 100%;
    box-sizing: border-box; transition: border-color 0.2s;
  }
  .booking-section input:focus, .booking-section select:focus, .booking-section textarea:focus {
    border-color: rgba(201,168,76,0.6) !important; outline: none;
  }
  .booking-section input[type="date"], .booking-section input[type="time"] { color-scheme: dark; }
  .booking-section input::placeholder, .booking-section textarea::placeholder {
    color: rgba(245,240,232,0.3) !important;
  }
  .booking-section label {
    color: ${THEME.colors.gold} !important; margin-bottom: 8px; display: block;
    font-family: ${THEME.fonts.sans}; font-size: 0.7rem;
    letter-spacing: 0.12em; text-transform: uppercase;
  }
  .booking-section option {
    background-color: ${THEME.colors.charcoal} !important;
    color: ${THEME.colors.cream} !important;
  }
  .booking-form { display: flex; flex-direction: column; gap: 24px; }

  /* Адаптивні колонки форми */
  .booking-row-3 {
    display: grid;
    grid-template-columns: ${w < 500 ? "1fr" : w < 700 ? "1fr 1fr" : "1fr 1fr 1fr"};
    gap: 16px;
  }
  .booking-row-2 {
    display: grid;
    grid-template-columns: ${w < 500 ? "1fr" : "1fr 1fr"};
    gap: 16px;
  }
  .booking-full { width: 100%; }
  .booking-button { display: flex; justify-content: ${w < BP.tablet ? "stretch" : "center"}; margin-top: 8px; }
  .booking-button button { ${w < BP.tablet ? "width: 100%;" : ""} }

  .react-datepicker-wrapper { width: 100%; }
  .react-datepicker {
    background-color: ${THEME.colors.charcoal} !important;
    border: 1px solid ${THEME.colors.gold} !important;
    font-family: ${THEME.fonts.body} !important;
    color: ${THEME.colors.cream} !important;
    box-shadow: 0 10px 25px rgba(0,0,0,0.5);
  }
  .react-datepicker__header {
    background-color: ${THEME.colors.charcoal} !important;
    border-bottom: 1px solid rgba(201,168,76,0.2) !important;
  }
  .react-datepicker__current-month, .react-datepicker__day-name, .react-datepicker__day {
    color: ${THEME.colors.cream} !important;
  }
  .react-datepicker__day:hover {
    background-color: rgba(201,168,76,0.3) !important; border-radius: 4px;
  }
  .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected {
    background-color: ${THEME.colors.gold} !important;
    color: ${THEME.colors.charcoal} !important;
    font-weight: bold; border-radius: 4px;
  }
  .react-datepicker__day--disabled { color: rgba(245,240,232,0.3) !important; }
  .react-datepicker__triangle { display: none; }
  .react-datepicker--time-only {
    border: 1px solid ${THEME.colors.gold} !important;
    background-color: ${THEME.colors.charcoal} !important;
  }
  .react-datepicker__header--time {
    background-color: ${THEME.colors.charcoal} !important;
    border-bottom: 1px solid rgba(201,168,76,0.3) !important; padding: 15px !important;
  }
  .react-datepicker-time__header {
    color: ${THEME.colors.gold} !important; font-family: ${THEME.fonts.sans} !important;
    font-size: 0.9rem !important; letter-spacing: 0.15em; text-transform: uppercase;
  }
  .react-datepicker__time-container {
    width: 140px !important; background-color: ${THEME.colors.charcoal} !important;
  }
  .react-datepicker__time-box {
    width: 100% !important; border-radius: 0 !important;
    scrollbar-width: thin; scrollbar-color: rgba(201,168,76,0.5) ${THEME.colors.charcoal};
  }
  .react-datepicker__time-list {
    background-color: ${THEME.colors.charcoal} !important; width: 100% !important;
  }
  .react-datepicker__time-list-item {
    display: flex !important; align-items: center !important; justify-content: center !important;
    height: 45px !important; font-size: 1.1rem !important;
    color: ${THEME.colors.cream} !important; border-radius: 4px; margin: 2px 4px !important;
  }
  .react-datepicker__time-list-item:hover {
    background-color: rgba(201,168,76,0.2) !important; color: ${THEME.colors.gold} !important;
  }
  .react-datepicker__time-list-item--selected {
    background-color: ${THEME.colors.gold} !important;
    color: ${THEME.colors.charcoal} !important; font-weight: bold !important;
  }
  .react-datepicker__time-list-item--disabled { display: none !important; }
  .react-datepicker__time-box::-webkit-scrollbar { width: 6px; }
  .react-datepicker__time-box::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
  .react-datepicker__time-box::-webkit-scrollbar-thumb {
    background-color: rgba(201,168,76,0.5); border-radius: 10px;
  }
`;