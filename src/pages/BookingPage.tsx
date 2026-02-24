import { THEME } from '../shared/config/theme';
import { BookingSection } from '../widgets/BookingSection';
import { SectionTitle } from '../shared/ui/SectionTitle';
import { useI18n } from '../shared/i18n';

export function BookingPage() {
  const { t } = useI18n();
  return (
    <div style={{ paddingTop: "80px" }}>
      <div style={{ padding: "80px 5% 60px", background: THEME.colors.cream, textAlign: "center" }}>
        <SectionTitle subtitle={t.booking.pageEyebrow} title={t.booking.pageTitle} align="center" />
      </div>
      <div style={{ padding: "80px 5%", background: THEME.colors.white }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <BookingSection />
        </div>
      </div>
    </div>
  );
}