import { THEME } from '../shared/config/theme';
import { SectionTitle } from '../shared/ui/SectionTitle';
import { MastersSection } from '../widgets/MastersSection';
import type { PageName } from '../shared/api/routes';

interface MastersPageProps {
  onNavigate: (page: PageName) => void; 
}

export function MastersPage({ onNavigate }: MastersPageProps) {
  return (
    <div style={{ paddingTop: "80px" }}>
      <div style={{ padding: "80px 5% 60px", background: THEME.colors.cream, textAlign: "center" }}>
        <SectionTitle subtitle="Our Team" title={"The Masters"} align="center" />
        <p style={{ fontFamily: THEME.fonts.body, fontSize: "1.1rem", color: THEME.colors.muted, maxWidth: "560px", margin: "0 auto" }}>
          Each master is a trained artisan with a unique perspective. Together, we cover every aspect of hair care and transformation.
        </p>
      </div>
      <MastersSection onNavigate={onNavigate} />
    </div>
  );
}
