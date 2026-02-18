import { THEME } from '../shared/config/theme';
import { SectionTitle } from '../shared/ui/SectionTitle';
import { ContactsSection } from '../widgets/ContactsSection';

export function ContactsPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <div style={{ padding: "80px 5% 60px", background: THEME.colors.cream, textAlign: "center" }}>
        <SectionTitle subtitle="Get in Touch" title={"Contact Us"} align="center" />
      </div>
      <ContactsSection />
    </div>
  );
}