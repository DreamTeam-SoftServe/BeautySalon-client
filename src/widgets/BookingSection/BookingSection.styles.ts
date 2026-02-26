import { THEME } from "../../shared/config/theme";
import type { CSSProperties } from "react";

export const sectionStyle: CSSProperties = {
  minHeight: "100vh",
  background: THEME.colors.charcoal,
  color: THEME.colors.cream,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "80px 5%",
  position: "relative",
  overflow: "hidden",
  gap: "60px",
};

export const formSideStyle: CSSProperties = {
  flex: "0 0 45%",
  maxWidth: "520px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  position: "relative",
  zIndex: 2,
};

export const carouselSideStyle: CSSProperties = {
  flex: "0 0 48%",
  height: "75vh",
  minHeight: "500px",
  maxHeight: "700px",
  position: "relative",
  overflow: "hidden",
  borderRadius: "12px",
  border: `2px solid ${THEME.colors.gold}`,
  boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
};

export const carouselImgStyle = (active: boolean): CSSProperties => ({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  opacity: active ? 1 : 0,
  transition: "opacity 1.5s ease-in-out",
  zIndex: active ? 1 : 0,
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

export const headerStyle: CSSProperties = {
  marginBottom: "40px",
};

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

export const bookingSectionCss = `
  .booking-section h2,
  .booking-section h3,
  .booking-section span {
    color: ${THEME.colors.cream} !important;
  }
  .booking-section p {
    color: rgba(245,240,232,0.7) !important;
  }
  .booking-section input,
  .booking-section select,
  .booking-section textarea {
    color: ${THEME.colors.cream} !important;
    background-color: rgba(255,255,255,0.06) !important;
    border: 1px solid rgba(245,240,232,0.15) !important;
    padding: 12px 16px;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.2s;
  }
  .booking-section input:focus,
  .booking-section select:focus,
  .booking-section textarea:focus {
    border-color: rgba(201,168,76,0.6) !important;
    outline: none;
  }
  .booking-section input[type="date"],
  .booking-section input[type="time"] {
    color-scheme: dark;
  }
  .booking-section input::placeholder,
  .booking-section textarea::placeholder {
    color: rgba(245,240,232,0.3) !important;
  }
  .booking-section label {
    color: ${THEME.colors.gold} !important;
    margin-bottom: 8px;
    display: block;
    font-family: ${THEME.fonts.sans};
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .booking-section option {
    background-color: ${THEME.colors.charcoal} !important;
    color: ${THEME.colors.cream} !important;
  }
  .booking-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .booking-row-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
  }
  .booking-row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .booking-full { width: 100%; }
  .booking-button {
    display: flex;
    justify-content: center;
    margin-top: 8px;
  }
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
  .react-datepicker__current-month,
  .react-datepicker__day-name,
  .react-datepicker__day {
    color: ${THEME.colors.cream} !important;
  }
  .react-datepicker__day:hover {
    background-color: rgba(201,168,76,0.3) !important;
    border-radius: 4px;
  }
  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: ${THEME.colors.gold} !important;
    color: ${THEME.colors.charcoal} !important;
    font-weight: bold;
    border-radius: 4px;
  }
  .react-datepicker__day--disabled {
    color: rgba(245,240,232,0.3) !important;
  }
  .react-datepicker__triangle { display: none; }
  .react-datepicker--time-only {
    border: 1px solid ${THEME.colors.gold} !important;
    background-color: ${THEME.colors.charcoal} !important;
    box-shadow: 0 10px 25px rgba(0,0,0,0.5);
  }
  .react-datepicker__header--time {
    background-color: ${THEME.colors.charcoal} !important;
    border-bottom: 1px solid rgba(201,168,76,0.3) !important;
    padding: 15px !important;
  }
  .react-datepicker-time__header {
    color: ${THEME.colors.gold} !important;
    font-family: ${THEME.fonts.sans} !important;
    font-size: 0.9rem !important;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }
  .react-datepicker__time-container {
    width: 140px !important;
    background-color: ${THEME.colors.charcoal} !important;
  }
  .react-datepicker__time-box {
    width: 100% !important;
    border-radius: 0 !important;
    scrollbar-width: thin;
    scrollbar-color: rgba(201,168,76,0.5) ${THEME.colors.charcoal};
  }
  .react-datepicker__time-list {
    background-color: ${THEME.colors.charcoal} !important;
    width: 100% !important;
  }
  .react-datepicker__time-list-item {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    height: 45px !important;
    font-size: 1.1rem !important;
    color: ${THEME.colors.cream} !important;
    border-radius: 4px;
    margin: 2px 4px !important;
  }
  .react-datepicker__time-list-item:hover {
    background-color: rgba(201,168,76,0.2) !important;
    color: ${THEME.colors.gold} !important;
  }
  .react-datepicker__time-list-item--selected {
    background-color: ${THEME.colors.gold} !important;
    color: ${THEME.colors.charcoal} !important;
    font-weight: bold !important;
  }
  .react-datepicker__time-list-item--disabled { display: none !important; }
  .react-datepicker__time-box::-webkit-scrollbar { width: 6px; }
  .react-datepicker__time-box::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
  .react-datepicker__time-box::-webkit-scrollbar-thumb {
    background-color: rgba(201,168,76,0.5);
    border-radius: 10px;
  }
`;