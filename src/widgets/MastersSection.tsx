import { THEME } from '../shared/config/theme';
import { useState, useEffect } from 'react';
import { api } from '../shared/api/api';
import { SectionTitle } from '../shared/ui/SectionTitle';
import { Button } from '../shared/ui/Button';
import { MasterCard } from '../entities/service/ui/MasterCard';
import type { PageName } from '../shared/api/routes';

interface MastersSectionProps {
  onNavigate: (page: PageName) => void; 
}

export function MastersSection({ onNavigate }: MastersSectionProps) {
  const [masters, setMasters] = useState<any[]>([]);
  useEffect(() => { api.getMasters().then(setMasters);}, []);

  return (
    <section style={{ padding: "120px 5%", background: THEME.colors.cream }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionTitle subtitle="Our Team" title={"Meet the Masters"} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "48px 32px" }}>
          {masters.map((m) => <MasterCard key={m.id} master={m} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: "64px" }}>
          <Button onClick={() => onNavigate("booking")} variant="outline">Book with a Master</Button>
        </div>
      </div>
    </section>
  );
}