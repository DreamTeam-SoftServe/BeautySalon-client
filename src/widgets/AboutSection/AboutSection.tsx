import { useI18n } from "../../shared/i18n";
import { SectionTitle } from "../../shared/ui/SectionTitle";
import { Button } from "../../shared/ui/Button";
import { useNavigate } from "react-router-dom";
import aboutImg from "../../shared/assets/heroImg2.jpg";
import { useScrollAnimation } from "../../shared/hooks/useScrollAnimation";
import {
  sectionStyle,
  containerStyle,
  imageBlockStyle,
  mainImgStyle,
  accentCardStyle,
  accentNumberStyle,
  accentLabelStyle,
  contentStyle,
  bodyStyle,
  featuresGridStyle,
  featureItemStyle,
  featureIconStyle,
  featureTitleStyle,
  featureDescStyle,
  aboutDecor1,
  aboutDecor2,
} from "./AboutSection.styles";

// Хелпер для анімації: початковий стан → фінальний
const anim = (
  visible: boolean,
  direction: "left" | "right" | "up" = "up",
  delay = "0s"
): React.CSSProperties => {
  const transforms = {
    left:  visible ? "translateX(0)"   : "translateX(-50px)",
    right: visible ? "translateX(0)"   : "translateX(50px)",
    up:    visible ? "translateY(0)"   : "translateY(40px)",
  };
  return {
    opacity: visible ? 1 : 0,
    transform: transforms[direction],
    transition: `opacity 0.8s ease, transform 0.8s ease`,
    transitionDelay: delay,
  };
};

export function AboutSection() {
  const { t } = useI18n();
  const navigate = useNavigate();

  // Окремі ref-и для лівого та правого блоків
  const [imgRef, imgVisible] = useScrollAnimation(0.1);
  const [contentRef, contentVisible] = useScrollAnimation(0.1);

  const FEATURES = [
    { icon: "✦", title: t.about.features.f1title, desc: t.about.features.f1desc },
    { icon: "✦", title: t.about.features.f2title, desc: t.about.features.f2desc },
    { icon: "✦", title: t.about.features.f3title, desc: t.about.features.f3desc },
    { icon: "✦", title: t.about.features.f4title, desc: t.about.features.f4desc },
  ];

  return (
    <section style={sectionStyle}>
      <div style={aboutDecor1} />
      <div style={aboutDecor2} />
      <div style={containerStyle}>

        {/* Ліва частина — фото з'являється зліва */}
        <div
          ref={imgRef as React.RefObject<HTMLDivElement>}
          style={{ ...imageBlockStyle, ...anim(imgVisible, "left", "0s") }}
        >
          <img src={aboutImg} alt="About Prestige Studio" style={mainImgStyle} />
          <div style={{ ...accentCardStyle, ...anim(imgVisible, "up", "0.4s") }}>
            <p style={accentNumberStyle}>12+</p>
            <p style={accentLabelStyle}>років{"\n"}досвіду</p>
          </div>
        </div>

        {/* Права частина — текст з'являється справа зі stagger */}
        <div
          ref={contentRef as React.RefObject<HTMLDivElement>}
          style={contentStyle}
        >
          <div style={anim(contentVisible, "right", "0s")}>
            <SectionTitle
              subtitle={t.gallery.eyebrow}
              title={t.about?.title ?? "Prestige Studio"}
              align="left"
            />
          </div>

          <p style={{ ...bodyStyle, ...anim(contentVisible, "up", "0.15s") }}>
            {t.about?.body ??
              "Ми — команда закоханих у свою справу майстрів. Кожна деталь у нашій студії продумана для того, щоб ви відчували себе особливими."}
          </p>

          <div style={{ ...featuresGridStyle, ...anim(contentVisible, "up", "0.3s") }}>
            {FEATURES.map((f) => (
              <div key={f.title} style={featureItemStyle}>
                <span style={featureIconStyle}>{f.icon}</span>
                <p style={featureTitleStyle}>{f.title}</p>
                <p style={featureDescStyle}>{f.desc}</p>
              </div>
            ))}
          </div>

          <div style={anim(contentVisible, "up", "0.45s")}>
            <Button onClick={() => navigate("/masters")}>
              {t.about?.cta ?? "Познайомитись з командою"}
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}