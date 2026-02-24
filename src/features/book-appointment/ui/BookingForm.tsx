import { THEME } from "../../../shared/config/theme";
import { api } from "../../../shared/api/api";
import { useEffect, useState, type FormEvent } from "react";
import { Input } from "../../../shared/ui/Input";
import { Select } from "../../../shared/ui/Select";
import { Button } from "../../../shared/ui/Button";
import type { Service, Master, BookingData } from "../../../shared/api/api";
import { useI18n } from "../../../shared/i18n";
import { useAuth } from "../../../shared/auth/context";

interface BookingFormProps {
  services: Service[];
  masters: Master[];
}

const ALL_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

type FormStatus = "idle" | "loading" | "success" | "error";

export function BookingForm({ services, masters }: BookingFormProps) {
  const { t } = useI18n();
  const { user } = useAuth();
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState<BookingData>({
    name: "",
    email: "",
    phone: "",
    serviceId: "",
    masterId: "",
    date: "",
    time: "",
    notes: "",
  });

  const [busySlots, setBusySlots] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    const fetchBusyTime = async () => {
      if (formData.masterId && formData.date) {
        try {
          const busy = await api.getBusySlots(formData.masterId, formData.date);
          const slotsArray = Array.isArray(busy)
            ? busy
            : (busy as any).data || [];
          setBusySlots(slotsArray);
        } catch (e) {
          console.error("Slot loading error", e);
          setBusySlots([]);
        }
      } else {
        setBusySlots([]);
      }
    };
    fetchBusyTime();
  }, [formData.masterId, formData.date]);

  const availableSlots = ALL_SLOTS.filter((slot) => !busySlots.includes(slot));

  const handleChange = (e: any) => {
    if (e?.target) {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    } else if (e?.name !== undefined && e?.value !== undefined) {
      setFormData((prev) => ({ ...prev, [e.name]: e.value }));
      if (errors[e.name]) setErrors((prev) => ({ ...prev, [e.name]: "" }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rawDateTime = `${formData.date}T${formData.time}:00`;

    const payload = {
      ...formData,
      start_date: rawDateTime,
    };

    try {
      await api.submitBooking(payload, user?.id);
      setStatus("success");
    } catch (e) {
      setStatus("error");
    }
  };

  const handleBookAgain = () => {
    window.location.reload();
  };

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "80px 40px" }}>
        <div
          style={{
            fontSize: "3rem",
            marginBottom: "24px",
            color: THEME.colors.gold,
          }}
        >
          ✓
        </div>
        <h3
          style={{
            fontFamily: THEME.fonts.display,
            fontSize: "2rem",
            fontWeight: 400,
          }}
        >
          {t.booking.success.title}
        </h3>
        <Button onClick={handleBookAgain}>{t.booking.success.again}</Button>
      </div>
    );
  }

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.serviceId !== "" &&
    formData.date !== "" &&
    formData.time !== "";

  return (
    <form onSubmit={handleSubmit} className="booking-section-appointment">
      <div className="booking-section-appointment">
        <Input
          label={t.booking.fields.name}
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t.booking.fields.namePh}
        />
        <Input
          label={t.booking.fields.email}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t.booking.fields.emailPh}
        />
        <Input
          label={t.booking.fields.phone}
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder={t.booking.fields.phonePh}
        />
      </div>

      <div className="booking-section-grid">
        <Select
          label={t.booking.fields.service}
          name="serviceId"
          value={formData.serviceId}
          onChange={handleChange}
          options={[
            { value: "", label: t.booking.fields.selectPh },
            ...services.map((s) => ({
              value: String(s.id),
              label: `${s.title} — ${s.servicePrice}`,
            })),
          ]}
        />
        <Select
          label={t.booking.fields.master}
          name="masterId"
          value={formData.masterId || ""}
          onChange={handleChange}
          options={[
            { value: "", label: t.booking.fields.masterPh },
            ...(masters || []).map((m) => ({
              value: String(m.id || (m as any)._id),
              label: m.name,
            })),
          ]}
        />
      </div>

      <div className="booking-section-grid">
        <Input
          label={t.booking.fields.date}
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          min={today}
        />
        <Select
          label={t.booking.fields.time}
          name="time"
          value={formData.time}
          onChange={handleChange}
          disabled={!formData.date || !formData.masterId}
          options={[
            {
              value: "",
              label: formData.date
                ? t.booking.fields.selectPh
                : "Select master & date",
            },
            ...availableSlots.map((slot) => ({ value: slot, label: slot })),
          ]}
        />
      </div>

      <div className="booking-full">
        <Input
          label={t.booking.fields.notes}
          name="notes"
          as="textarea"
          value={formData.notes || ""}
          onChange={handleChange}
        />
      </div>

      <div className="booking-button">
        <Button type="submit" disabled={status === "loading" || !isFormValid}>
          {status === "loading" ? t.booking.sending : t.booking.submit}
        </Button>
      </div>
    </form>
  );
}
