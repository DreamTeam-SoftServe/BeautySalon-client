import { useEffect, useState } from "react";
import { api, type Service } from "../../../shared/api/api";
import { useI18n } from "../../../shared/i18n";
import {
  gridStyle, cardStyle, getImageStyle, cardBodyStyle,
  cardTitleStyle, cardDurationStyle, deleteBtnStyle,
} from "./ServicesList.styles";

export function ServicesList() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useI18n();

  const loadServices = async () => {
    try {
      const resp = await api.getServices();
      setServices(resp);
    } catch (err) {
      console.error("Download error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadServices(); }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm(t.services.deleteService)) return;
    try {
      await api.deleteService(id);
      setServices(services.filter((s) => s.id !== id));
    } catch {
      alert(t.services.error.deletingError);
    }
  };

  if (loading) return <div>{t.services.loading}</div>;

  return (
    <div style={gridStyle}>
      {services.map((service) => (
        <div key={service.id} style={cardStyle}>
          <div style={getImageStyle(service.imageUrl)} />
          <div style={cardBodyStyle}>
            <h4 style={cardTitleStyle}>{service.title}</h4>
            <p style={cardDurationStyle}>{service.duration} {t.services.unit.min}</p>
            <button onClick={() => handleDelete(service.id)} style={deleteBtnStyle}>
              {t.services.buttons.deleteButton}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}