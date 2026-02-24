import { THEME } from "../shared/config/theme";
import { useI18n } from "../shared/i18n";
import { SectionTitle } from "../shared/ui/SectionTitle";
import { ContactsSection } from "../widgets/ContactsSection";

export function ContactsPage() {
  const { t } = useI18n();
  return (
    <div style={{ paddingTop: "80px" }}>
      <div
        style={{
          padding: "80px 5% 60px",
          background: THEME.colors.cream,
          textAlign: "center",
        }}
      >
        <SectionTitle
          subtitle={t.contacts.pageEyebrow}
          title={t.contacts.pageTitle}
          align="center"
        />
      </div>
      <ContactsSection />
    </div>
  );
}
