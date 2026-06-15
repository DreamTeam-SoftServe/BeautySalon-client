import { useI18n } from "../../shared/i18n";
import { SectionTitle } from "../../shared/ui/SectionTitle";
import { Button } from "../../shared/ui/Button";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "../../shared/hooks/useScrollAnimation";
import { useMobile } from "../../shared/hooks/useMobile";
import { getAboutStyles } from "./AboutSection.styles";

const S3_URL = "https://beautysalon-dreamteam.s3.eu-north-1.amazonaws.com";
const aboutImg = `${S3_URL}/about/about1.png`;

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

  const [imgRef, imgVisible] = useScrollAnimation(0.1);
  const [contentRef, contentVisible] = useScrollAnimation(0.1);

  const isMobile = useMobile();
  const styles = getAboutStyles(isMobile);

  const FEATURES = [
    { icon: "✦", title: t.about.features.f1title, desc: t.about.features.f1desc },
    { icon: "✦", title: t.about.features.f2title, desc: t.about.features.f2desc },
    { icon: "✦", title: t.about.features.f3title, desc: t.about.features.f3desc },
    { icon: "✦", title: t.about.features.f4title, desc: t.about.features.f4desc },
  ];

  return (
    <section style={styles.sectionStyle}>
      <div style={styles.aboutDecor1} />
      <div style={styles.aboutDecor2} />
      <div style={styles.containerStyle}>

        <div
          ref={imgRef as React.RefObject<HTMLDivElement>}
          style={{ ...styles.imageBlockStyle, ...anim(imgVisible, "left", "0s") }}
        >
          <img src={aboutImg} alt="About Prestige Studio" style={styles.mainImgStyle} />
          <div style={{ ...styles.accentCardStyle, ...anim(imgVisible, "up", "0.4s") }}>
            <p style={styles.accentNumberStyle}>12+</p>
            <p style={styles.accentLabelStyle}>років{"\n"}досвіду</p>
          </div>
        </div>

        <div
          ref={contentRef as React.RefObject<HTMLDivElement>}
          style={styles.contentStyle}
        >
          <div style={anim(contentVisible, "right", "0s")}>
            <SectionTitle
              subtitle={t.gallery.eyebrow}
              title={t.about?.title ?? "Prestige Studio"}
              align="left"
            />
          </div>

          <p style={{ ...styles.bodyStyle, ...anim(contentVisible, "up", "0.15s") }}>
            {t.about?.body ??
              "Ми — команда закоханих у свою справу майстрів. Кожна деталь у нашій студії продумана для того, щоб ви відчували себе особливими."}
          </p>

          <div style={{ ...styles.featuresGridStyle, ...anim(contentVisible, "up", "0.3s") }}>
            {FEATURES.map((f) => (
              <div key={f.title} style={styles.featureItemStyle}>
                <span style={styles.featureIconStyle}>{f.icon}</span>
                <p style={styles.featureTitleStyle}>{f.title}</p>
                <p style={styles.featureDescStyle}>{f.desc}</p>
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