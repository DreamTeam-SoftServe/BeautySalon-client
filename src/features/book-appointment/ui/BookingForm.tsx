import { api } from "../../../shared/api/api";
import { useEffect, useState, type FormEvent } from "react";
import { Input } from "../../../shared/ui/Input";
import { Select } from "../../../shared/ui/Select";
import { Button } from "../../../shared/ui/Button";
import "react-datepicker/dist/react-datepicker.css";
import type { Service, Master, BookingData } from "../../../shared/api/api";
import { useI18n } from "../../../shared/i18n";
import { useAuth } from "../../../shared/auth/context";
import { useLocation } from "react-router-dom";
import DatePicker, { registerLocale } from "react-datepicker";
import { THEME } from "../../../shared/config/theme";
import {
  successWrapStyle,
  successIconStyle,
  successTitleStyle,
  datePickerLabelStyle,
} from "./BookingForm.styles";
import { uk, enUS } from "date-fns/locale";

interface BookingFormProps {
  services: Service[];
  masters: Master[];
}

const ALL_SLOTS = [
  "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00", "18:00",
];

registerLocale("uk", uk);
registerLocale("en", enUS);

type FormStatus = "idle" | "loading" | "success" | "error";
type BookingMode = "PROCEDURE" | "TRAINING";

export function BookingForm({ services, masters }: BookingFormProps) {
  const location = useLocation();
  const { t } = useI18n();
  const { user } = useAuth();

  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const minBookableDate = new Date();
  if (now.getHours() >= 18) {
    minBookableDate.setDate(minBookableDate.getDate() + 1);
  }

  const [step, setStep] = useState<number>(1);
  const [bookingMode, setBookingMode] = useState<BookingMode>("PROCEDURE");

  const [formData, setFormData] = useState<BookingData>({
    name: "",
    email: "",
    phone: "",
    serviceId: location.state?.selectedServiceId || "",
    masterId: location.state?.selectedMasterId || "",
    date: "",
    time: "",
    notes: "",
  });
  const [busySlots, setBusySlots] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    if (user)
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
  }, [user]);

  useEffect(() => {
    const fetchBusyTime = async () => {
      if (formData.masterId && formData.date) {
        try {
          const busy = await api.getBusySlots(formData.masterId, formData.date);
          setBusySlots(Array.isArray(busy) ? busy : (busy as any).data || []);
        } catch {
          setBusySlots([]);
        }
      } else {
        setBusySlots([]);
      }
    };
    fetchBusyTime();
  }, [formData.masterId, formData.date]);

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const availableSlots = ALL_SLOTS.filter((slot) => {
    if (busySlots.includes(slot)) return false;
    if (formData.date === today) {
      const [slotHour, slotMinute] = slot.split(":").map(Number);
      if (
        slotHour < currentHour ||
        (slotHour === currentHour && slotMinute <= currentMinute)
      )
        return false;
    }
    return true;
  });

  useEffect(() => {
    if (formData.time && formData.date && !availableSlots.includes(formData.time)) {
      setFormData((prev) => ({ ...prev, time: "" }));
    }
  }, [formData.date, availableSlots, formData.time]);

  const availableServices = services.filter((s: any) =>
    bookingMode === "TRAINING" ? s.isTraining : !s.isTraining
  );

  const handleChange = (e: any) => {
    const name = e?.target?.name ?? e?.name;
    const value = e?.target?.value ?? e?.value;
    if (!name) return;
    if (name === "date" && value && value < today) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

const handleModeSelect = (mode: BookingMode) => {
    setBookingMode(mode);
    setFormData((prev) => ({ 
      ...prev, 
      serviceId: "", 
      masterId: mode === "TRAINING" ? "" : prev.masterId 
    }));
    setStep(2); 
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await api.submitBooking(
        {
          ...formData,
          start_date: `${formData.date}T${formData.time}:00`,
        } as any,
        user?.id,
      );
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{ display: "flex", justifyContent: "center", width: "100%", padding: "40px 0" }}>
        <div style={successWrapStyle}>
          <div style={successIconStyle}>✓</div>
          <h3 style={successTitleStyle}>{t.booking.success.title}</h3>
          <Button onClick={() => window.location.reload()}>
            {t.booking.success.again}
          </Button>
        </div>
      </div>
    );
  }

  const isTimeDisabled = !formData.date || (formData.date !== "" && availableSlots.length === 0);
  const isStep2Valid = formData.name.trim() !== "" && formData.phone.trim() !== "";
  const isStep3Valid = formData.serviceId !== "" && formData.date >= today && formData.time !== "";

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      
      {/* 1. ПРОГРЕС-БАР - Звичайна полоска вгорі екрана (під хедером) */}
      <div style={{ 
        position: "fixed", 
        top: "80px", // Відступ для хедера (за потреби можна скоригувати)
        left: 0, 
        width: "100%", 
        height: "3px", 
        backgroundColor: "rgba(0,0,0,0.05)", 
        zIndex: 999 
      }}>
        <div style={{ 
          width: `${(step / 4) * 100}%`, 
          height: "100%", 
          backgroundColor: THEME.colors.gold, 
          transition: "width 0.4s ease-in-out" 
        }} />
      </div>

      {/* ФОРМА (без білого фону, щоб зливалася з кремовим фоном сторінки як у AuthPage) */}
      <form 
        onSubmit={handleSubmit} 
        style={{ 
          width: "100%", 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center",
          minHeight: "300px"
        }}
      >
        {/* КРОК 1: Вибір типу */}
        {step === 1 && (
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "16px", 
            width: "100%",
            animation: "fadeIn 0.2s ease"
          }}>
            <button
              type="button"
              onClick={() => handleModeSelect("PROCEDURE")}
              style={{
                width: "100%",
                padding: "18px 24px",
                border: `1px solid ${THEME.colors.gold}`,
                borderRadius: "4px",
                backgroundColor: "transparent",
                color: THEME.colors.charcoal,
                fontSize: "0.95rem",
                fontFamily: THEME.fonts.sans,
                fontWeight: 500,
                letterSpacing: "0.5px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                textTransform: "uppercase"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = THEME.colors.gold;
                e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = THEME.colors.charcoal;
              }}
            >
              {t.lang === "en" ? "Book a Procedure" : "Запис на процедуру"}
            </button>

            <button
              type="button"
              onClick={() => handleModeSelect("TRAINING")}
              style={{
                width: "100%",
                padding: "18px 24px",
                border: `1px solid ${THEME.colors.gold}`,
                borderRadius: "4px",
                backgroundColor: "transparent",
                color: THEME.colors.charcoal,
                fontSize: "0.95rem",
                fontFamily: THEME.fonts.sans,
                fontWeight: 500,
                letterSpacing: "0.5px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                textTransform: "uppercase"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = THEME.colors.gold;
                e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = THEME.colors.charcoal;
              }}
            >
              {t.lang === "en" ? "Book a Training" : "Запис на навчання"}
            </button>
          </div>
        )}

        {/* КРОК 2: Контактні дані */}
        {step === 2 && (
          <div style={{ animation: "fadeIn 0.2s ease", display: "flex", flexDirection: "column", gap: "20px" }}>
            <Input
              label={t.booking.fields.name}
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t.booking.fields.namePh}
            />
            <Input
              label={t.booking.fields.phone}
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t.booking.fields.phonePh}
            />
            <Input
              label={t.booking.fields.email}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t.booking.fields.emailPh}
            />
          </div>
        )}

        {/* КРОК 3: Послуга, Майстер, Час */}
        {step === 3 && (
          <div style={{ animation: "fadeIn 0.2s ease", display: "flex", flexDirection: "column", gap: "20px" }}>
            <Select
              label={t.booking.fields.service}
              name="serviceId"
              value={formData.serviceId}
              onChange={handleChange}
              options={[
                { value: "", label: t.booking.fields.selectPh },
                ...availableServices.map((s) => ({
                  value: String(s.id),
                  label: `${s.title} — ${s.servicePrice}`,
                })),
              ]}
            />
            {bookingMode === "PROCEDURE" && (
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
            )}
            
            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ flex: 1 }}>
                <label style={datePickerLabelStyle}>{t.booking.fields.date}</label>
                <DatePicker
                  locale={t.lang === "en" ? "en" : "uk"}
                  selected={formData.date ? new Date(formData.date) : null}
                  onChange={(date: Date | null) => {
                    if (date) {
                      const year = date.getFullYear();
                      const month = String(date.getMonth() + 1).padStart(2, "0");
                      const day = String(date.getDate()).padStart(2, "0");
                      handleChange({ target: { name: "date", value: `${year}-${month}-${day}` } });
                    } else {
                      handleChange({ target: { name: "date", value: "" } });
                    }
                  }}
                  minDate={minBookableDate}
                  dateFormat="dd.MM.yyyy"
                  placeholderText={t.booking.fields.datePh}
                  autoComplete="off"
                />
              </div>

              <div style={{ flex: 1 }}>
                <label style={datePickerLabelStyle}>{t.booking.fields.time}</label>
                <DatePicker
                  locale={t.lang === "en" ? "en" : "uk"}
                  selected={
                    formData.time
                      ? (() => {
                          const d = new Date();
                          const [h, m] = formData.time.split(":");
                          d.setHours(Number(h), Number(m), 0, 0);
                          return d;
                        })()
                      : null
                  }
                  onChange={(date: Date | null) => {
                    if (date) {
                      const hours = String(date.getHours()).padStart(2, "0");
                      const minutes = String(date.getMinutes()).padStart(2, "0");
                      handleChange({ target: { name: "time", value: `${hours}:${minutes}` } });
                    } else {
                      handleChange({ target: { name: "time", value: "" } });
                    }
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={60}
                  timeCaption={t.booking.fields.time}
                  dateFormat="HH:mm"
                  timeFormat="HH:mm"
                  placeholderText={formData.date ? t.booking.fields.selectPh : (t.lang === "en" ? "Select date" : "Оберіть дату")}
                  disabled={isTimeDisabled}
                  minTime={new Date(new Date().setHours(9, 0, 0, 0))}
                  maxTime={new Date(new Date().setHours(18, 0, 0, 0))}
                  filterTime={(time) => {
                    const h = String(time.getHours()).padStart(2, "0");
                    const m = String(time.getMinutes()).padStart(2, "0");
                    return availableSlots.includes(`${h}:${m}`);
                  }}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        )}

        {/* КРОК 4: Нотатки */}
        {step === 4 && (
          <div style={{ animation: "fadeIn 0.2s ease" }}>
            <Input
              label={t.booking.fields.notes}
              name="notes"
              as="textarea"
              value={formData.notes || ""}
              onChange={handleChange}
              placeholder={t.lang === "en" ? "Any special preferences?" : "Чи є у вас особливі побажання до запису?"}
            />
          </div>
        )}

        {/* НАВІГАЦІЯ ФОРМИ */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "50px", gap: "16px" }}>
          {step > 1 ? (
            <button 
              type="button" 
              onClick={prevStep} 
              style={{ 
                flex: 1, 
                padding: "12px 24px", 
                backgroundColor: "transparent", 
                border: `1px solid ${THEME.colors.gold}`, 
                color: THEME.colors.gold, 
                borderRadius: "4px", 
                cursor: "pointer",
                fontFamily: THEME.fonts.sans,
                fontWeight: 500,
                fontSize: "0.9rem",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = THEME.colors.gold;
                e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = THEME.colors.gold;
              }}
            >
              {t.lang === "en" ? "Back" : "Назад"}
            </button>
          ) : (
            <div style={{ flex: 1 }} />
          )}

          {step > 1 && step < 4 && (
            <Button 
              type="button" 
              onClick={nextStep} 
              disabled={(step === 2 && !isStep2Valid) || (step === 3 && !isStep3Valid)}
              style={{ flex: 1 }}
            >
              {t.lang === "en" ? "Next" : "Далі"}
            </Button>
          )}

          {step === 4 && (
            <Button type="submit" disabled={status === "loading"} style={{ flex: 1 }}>
              {status === "loading" ? t.booking.sending : t.booking.submit}
            </Button>
          )}
        </div>
      </form>

    </div>
  );
}