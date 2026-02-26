import type { CSSProperties } from "react";

export const pageWrapStyle: CSSProperties = {
  paddingTop: "80px",
  width: "100%",
  overflow: "hidden",
};

export const patternOverlayStyle: CSSProperties = {
  position: "absolute",
  top: 50,
  left: 0,
  width: "100%",
  height: "450px",
  backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 250'%3E%3Cpath fill='none' stroke='%23C9A84C' stroke-width='4' stroke-linecap='round' d='M-50 200 C 250 250, 450 150, 450 80 C 450 20, 350 20, 350 80 C 350 130, 420 150, 480 150' /%3E%3Cpath fill='none' stroke='%23C9A84C' stroke-width='4' stroke-linecap='round' d='M1250 200 C 950 250, 750 150, 750 80 C 750 20, 850 20, 850 80 C 850 130, 780 150, 720 150' /%3E%3C/svg%3E")`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
  opacity: 1,
  pointerEvents: "none",
  zIndex: 1,
};

export const patternOverlayStyle2: CSSProperties = {
  position: "absolute",
  top: 150,
  left: 0,
  width: "100%",
  height: "200px",
  backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 300' opacity='1'%3E%3Cg transform='translate(400, 150) scale(4)' fill='none' stroke='%23C9A84C' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='-15' cy='20' r='8'/%3E%3Ccircle cx='15' cy='20' r='8'/%3E%3Cpath d='M-8,14 L40,-35'/%3E%3Cpath d='M8,14 L-40,-35'/%3E%3C/g%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center top",
  backgroundSize: "auto 100%",
  pointerEvents: "none",
  opacity: 1,
  zIndex: 1,
};
