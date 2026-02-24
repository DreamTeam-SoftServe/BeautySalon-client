import { THEME } from '../shared/config/theme';
import { useState, useEffect } from 'react';
import { api } from '../shared/api/api';
import { SectionTitle } from '../shared/ui/SectionTitle';
import { Button } from '../shared/ui/Button';
import { MasterCard } from '../entities/service/ui/MasterCard';
import type { PageName } from '../shared/api/routes';
import { useI18n } from '../shared/i18n';

interface MastersSectionProps {
  onNavigate: (page: PageName) => void; 
}

export function MastersSection({ onNavigate }: MastersSectionProps) {
  const [masters, setMasters] = useState<any[]>([]);
  const { t } = useI18n();

  useEffect(() => { api.getMasters().then(setMasters);}, []);

  return (
    <section style={{ padding: "120px 5%", background: THEME.colors.cream }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionTitle subtitle={t.masters.sectionEyebrow} title={t.masters.sectionTitle} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "48px 32px" }}>
          {masters.map((m) => <MasterCard key={m.id} master={m} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: "64px" }}>
          <Button onClick={() => onNavigate("booking")} variant="outline">{t.masters.bookCta}</Button>
        </div>
      </div>
    </section>
  );
}