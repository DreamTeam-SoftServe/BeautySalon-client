import { useEffect, useState } from "react";
import { api, type Service } from "../../../shared/api/api";
import { THEME } from "../../../shared/config/theme";
import { useI18n } from "../../../shared/i18n";

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

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    loadServices();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm(t.services.deleteService)) return;
    try {
      await api.deleteService(id);
      setServices(services.filter((s) => s.id !== id));
    } catch (err) {
      alert(t.services.error.deletingError);
    }
  };

  if (loading) return <div>{t.services.loading}</div>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px",
      }}
    >
      {services.map((service) => (
        <div
          key={service.id}
          style={{
            background: THEME.colors.white,
            borderRadius: "8px",
            overflow: "hidden",
            border: `1px solid ${THEME.colors.cream}`,
          }}
        >
          <div
            style={{
              height: "120px",
              background: service.imageUrl
                ? `url(${service.imageUrl}) center/cover`
                : THEME.colors.cream,
            }}
          />
          <div style={{ padding: "15px" }}>
            <h4 style={{ margin: "0 0 5px", fontSize: "1rem" }}>
              {service.title}
            </h4>
            <p
              style={{
                fontSize: "0.8rem",
                color: THEME.colors.muted,
                margin: "0 0 10px",
              }}
            >
              {service.duration} {t.services.unit.min}
            </p>
            <button
              onClick={() => handleDelete(service.id)}
              style={{
                color: "#e74c3c",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "0.75rem",
                padding: 0,
              }}
            >
              {t.services.buttons.deleteButton}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
