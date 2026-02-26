import { HeroSection } from "../../widgets/HeroSection/HeroSection";
import { GallerySection } from "../../widgets/GallerySection/GallerySection";
import { AboutSection } from "../../widgets/AboutSection/AboutSection";
import { PromoStrip } from "../../widgets/PromoStrip/PromoStrip";
import { Divider } from "../../shared/ui/Divider";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <Divider />
      <GallerySection />
      <Divider />
      <PromoStrip />
      <Divider />
      <AboutSection />
    </>
  );
}
