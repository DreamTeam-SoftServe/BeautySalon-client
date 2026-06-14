import { useEffect, useState } from "react";
import { api, type Service, type Master } from "../../shared/api/api";
import { BookingForm } from "../../features/book-appointment/ui/BookingForm";
import { useI18n } from "../../shared/i18n";

export function BookingSection() {
  const { t } = useI18n();
  const [services, setServices] = useState<Service[]>([]);
  const [masters, setMasters] = useState<Master[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getServices(), api.getMasters()])
      .then(([servicesRes, mastersRes]) => {
        setServices(Array.isArray(servicesRes) ? servicesRes : (servicesRes as any).data || []);
        setMasters(Array.isArray(mastersRes) ? mastersRes : (mastersRes as any).data || []);
      })
      .catch(err => console.error("Помилка при отриманні списків бронювання:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        padding: "100px 0", 
        color: "#B3B3B3",
        fontSize: "1rem",
        letterSpacing: "0.5px"
      }}>
        {t.lang === "en" ? "LOADING..." : "ЗАВАНТАЖЕННЯ ДАНИХ..."}
      </div>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <BookingForm services={services} masters={masters} />
    </div>
  );
}