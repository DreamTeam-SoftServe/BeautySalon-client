import { useI18n } from "../../shared/i18n";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../shared/ui/PageHeader";
import { MastersSection } from "../../widgets/MasterSection/MastersSection";
import { pageWrapStyle } from "./MastersPage.styles";

export function MastersPage() {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <div style={pageWrapStyle}>
      <PageHeader
        subtitle={t.masters.pageEyebrow}
        title={t.masters.pageTitle}
        body={t.masters.pageBody}
      />
      <MastersSection onNavigate={navigate} />
    </div>
  );
}