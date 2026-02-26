import { useEffect, useState } from "react";
import { BookingSection } from "../../widgets/BookingSection/BookingSection";
import { pageWrapStyle } from "./BookingPage.styles";

export function BookingPage() {
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 100);
    return () => clearTimeout(t);
  }, []);

  const strokeStyle = (delay = "0s"): React.CSSProperties => ({
    fill: "none",
    stroke: "#C9A84C",
    strokeWidth: 4,
    strokeLinecap: "round" as const,
    strokeDasharray: 1200,
    strokeDashoffset: drawn ? 0 : 1200,
    transition: `stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}`,
  });

  const scissorStroke = (delay = "0s", width = 1.5): React.CSSProperties => ({
    fill: "none",
    stroke: "#C9A84C",
    strokeWidth: width,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeDasharray: 300,
    strokeDashoffset: drawn ? 0 : 300,
    transition: `stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${delay}`,
  });

  return (
    <div style={{ ...pageWrapStyle, position: "relative" }}>

      <div style={{
        position: "absolute",
        top: "100px", 
        left: 0,
        width: "100%",
        height: "320px",
        pointerEvents: "none",
        zIndex: 2,
      }}>
        {/* Локони */}
        <svg
          viewBox="0 0 1200 250"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
          preserveAspectRatio="xMidYMid meet"
        >
          <path style={strokeStyle("0s")}   d="M-50 200 C 250 250, 450 150, 450 80 C 450 20, 350 20, 350 80 C 350 130, 420 150, 480 150" />
          <path style={strokeStyle("0.2s")} d="M1250 200 C 950 250, 750 150, 750 80 C 750 20, 850 20, 850 80 C 850 130, 780 150, 720 150" />
        </svg>

        <svg
          viewBox="-70 -70 140 140"
          style={{
            position: "absolute",
            top: "80px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "380px",
            height: "220px",
            overflow: "visible",
            opacity: drawn ? 1 : 0,
            transition: "opacity 0.6s ease 0.8s",
          }}
        >
          <g fill="none" stroke="#C9A84C" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="-20" cy="20" r="12" style={scissorStroke("0.9s")} />
            <circle cx="20"  cy="20" r="12" style={scissorStroke("1.0s")} />
            <path d="M-13,10 L65,-65"  style={scissorStroke("1.1s", 2.5)} />
            <path d="M13,10 L-65,-65" style={scissorStroke("1.2s", 2.5)} />
          </g>
        </svg>
      </div>

      <BookingSection />
    </div>
  );
}