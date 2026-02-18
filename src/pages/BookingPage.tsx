import { THEME } from '../shared/config/theme';
import { BookingSection } from '../widgets/BookingSection';
import { SectionTitle } from '../shared/ui/SectionTitle';

export function BookingPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <div style={{ padding: "80px 5% 60px", background: THEME.colors.cream, textAlign: "center" }}>
        <SectionTitle subtitle="Reserve Your Visit" title={"Book an Appointment"} align="center" />
      </div>
      <div style={{ padding: "80px 5%", background: THEME.colors.white }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <BookingSection />
        </div>
      </div>
    </div>
  );
}