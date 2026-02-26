import { useI18n } from "../../shared/i18n";
import { PageHeader } from "../../shared/ui/PageHeader";
import { ContactsSection } from "../../widgets/ContactsSection/ContactsSection";
import { pageWrapStyle } from "./ContactsPage.styles";

export function ContactsPage() {
  const { t } = useI18n();
  return (
    <div style={pageWrapStyle}>
      <PageHeader subtitle={t.contacts.pageEyebrow} title={t.contacts.pageTitle} />
      <ContactsSection />
    </div>
  );
}