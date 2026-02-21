import { THEME } from '../shared/config/theme';
import { SectionTitle } from '../shared/ui/SectionTitle';
import { MastersSection } from '../widgets/MastersSection';
import { useI18n } from '../shared/i18n';
import { useNavigate } from 'react-router-dom';

export function MastersPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  
  return (
    <div style={{ paddingTop: "80px" }}>
      <div style={{ padding: "80px 5% 60px", background: THEME.colors.cream, textAlign: "center" }}>
        <SectionTitle subtitle={t.masters.pageEyebrow} title={t.masters.pageTitle} align="center" />
        <p style={{ fontFamily: THEME.fonts.body, fontSize: "1.1rem", color: THEME.colors.muted, maxWidth: "560px", margin: "0 auto" }}>
          {t.masters.pageBody}
        </p>
      </div>
      <MastersSection onNavigate={navigate} />
    </div>
  );
}
