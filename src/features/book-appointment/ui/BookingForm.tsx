import { api } from "../../../shared/api/api";
import { useEffect, useState, useRef, type FormEvent } from "react";
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
import { uk, enUS } from "date-fns/locale";

import {
  successWrapStyle,
  successIconStyle,
  successTitleStyle,
  datePickerLabelStyle,
  successContainerStyle,
  mainContainerStyle,
  progressBarWrapStyle,
  getProgressBarFillStyle,
  formStyle,
  stepContainerStyle,
  stepSimpleContainerStyle,
  modeButtonStyle,
  dateRowStyle,
  flexColStyle,
  navRowStyle,
  backButtonStyle,
} from "./BookingForm.styles";

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

// --- АНІМАЦІЯ ТРЯСІННЯ ПРИ ПОМИЛЦІ ---
function shakeElement(el: HTMLElement) {
  el.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-8px)" },
      { transform: "translateX(8px)" },
      { transform: "translateX(-6px)" },
      { transform: "translateX(6px)" },
      { transform: "translateX(-3px)" },
      { transform: "translateX(3px)" },
      { transform: "translateX(0)" },
    ],
    { duration: 450, easing: "ease-in-out" },
  );
}

export function BookingForm({ services, masters }: BookingFormProps) {
  const location = useLocation();
  const { t } = useI18n();
  const { user } = useAuth();
  
  const formRef = useRef<HTMLFormElement>(null); // РЕФ ДЛЯ АНІМАЦІЇ ФОРМИ

  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const minBookableDate = new Date();
  if (now.getHours() >= 18) {
    minBookableDate.setDate(minBookableDate.getDate() + 1);
  }

  const [step, setStep] = useState<number>(1);
  const [bookingMode, setBookingMode] = useState<BookingMode>("PROCEDURE");

  // --- СТАН ДЛЯ АНІМАЦІЇ ПОЯВИ ЕЛЕМЕНТІВ ---
  const [stepMounted, setStepMounted] = useState(false);

  // Перезапускаємо анімацію при кожній зміні кроку
  useEffect(() => {
    setStepMounted(false);
    const timer = setTimeout(() => setStepMounted(true), 60);
    return () => clearTimeout(timer);
  }, [step]);

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
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
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
    let value = e?.target?.value ?? e?.value;
    if (!name) return;

    if (name === "phone") {
      value = value.replace(/[^\d+]/g, ""); 
      if (value.length > 13) {
        value = value.slice(0, 13); 
      }
    }

    if (name === "date" && value && value < today) return;
    
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Очищаємо помилку при введенні
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleModeSelect = (mode: BookingMode) => {
    setBookingMode(mode);
    setFormData((prev) => ({ 
      ...prev, 
      serviceId: "", 
      masterId: mode === "TRAINING" ? "" : prev.masterId 
    }));
    setErrors({});
    setStep(2); 
  };

  const prevStep = () => {
    setErrors({});
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const payload: any = {
        ...formData,
        start_date: `${formData.date}T${formData.time}:00`,
      };

      if (!payload.masterId) {
        payload.masterId = null;
      }

      await api.submitBooking(payload, user?.id);
      setStatus("success");
    } catch {
      setStatus("error");
      if (formRef.current) shakeElement(formRef.current); // Трясемо форму при помилці сервера
    }
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone: string) => {
    const digitsOnly = phone.replace(/\D/g, ""); 
    return digitsOnly.length >= 10; 
  };

  // --- ВАЛІДАЦІЯ ТА ТРЯСІННЯ ПРИ ПОМИЛЦІ ---
  const handleNextStepClick = () => {
    const newErrors: Record<string, string> = {};

    if (step === 2) {
      if (formData.name.trim().length < 2) {
        newErrors.name = t.lang === "en" ? "Please enter a valid name" : "Введіть коректне ім'я";
      }
      if (!isValidPhone(formData.phone)) {
        newErrors.phone = t.lang === "en" ? "Please enter a valid phone number" : "Введіть коректний номер телефону";
      }
      if (!isValidEmail(formData.email)) {
        newErrors.email = t.lang === "en" ? "Please enter a valid email address" : "Введіть коректний email";
      }
    }

    if (step === 3) {
      if (!formData.serviceId) {
        newErrors.serviceId = t.lang === "en" ? "Please select a service" : "Будь ласка, оберіть послугу";
      }
      if (bookingMode === "PROCEDURE" && !formData.masterId) {
        newErrors.masterId = t.lang === "en" ? "Please select a master" : "Будь ласка, оберіть майстра";
      }
      if (!formData.date || formData.date < today) {
        newErrors.date = t.lang === "en" ? "Please select a date" : "Будь ласка, оберіть дату";
      }
      if (!formData.time) {
        newErrors.time = t.lang === "en" ? "Please select time" : "Будь ласка, оберіть час";
      }
    }

    // Якщо є помилки — зберігаємо їх і ТРЯСЕМО форму
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (formRef.current) shakeElement(formRef.current);
      return;
    }

    setErrors({});
    setStep((prev) => prev + 1);
  };

  if (status === "success") {
    return (
      <div style={successContainerStyle}>
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

  // --- ФУНКЦІЯ АНІМАЦІЇ ДЛЯ КОЖНОГО ПОЛЯ ---
  const fieldAnim = (index: number): React.CSSProperties => {
    return {
      opacity: stepMounted ? 1 : 0,
      transform: stepMounted ? "translateY(0)" : "translateY(22px)",
      transition: "opacity 0.5s ease, transform 0.5s ease",
      transitionDelay: `${index * 0.07}s`,
    };
  };

  return (
    <div style={mainContainerStyle}>
      
      {/* ПРОГРЕС-ВАР */}
      <div style={progressBarWrapStyle}>
        <div style={getProgressBarFillStyle(step)} />
      </div>

      {/* ФОРМА З REF ДЛЯ АНІМАЦІЇ */}
      <form ref={formRef} onSubmit={handleSubmit} style={formStyle}>
        
        {/* КРОК 1: Вибір типу */}
        {step === 1 && (
          <div style={{ ...stepContainerStyle, gap: "16px" }}>
            <div style={fieldAnim(0)}>
              <button
                type="button"
                onClick={() => handleModeSelect("PROCEDURE")}
                style={modeButtonStyle}
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
            </div>

            <div style={fieldAnim(1)}>
              <button
                type="button"
                onClick={() => handleModeSelect("TRAINING")}
                style={modeButtonStyle}
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
          </div>
        )}

        {/* КРОК 2: Контактні дані */}
        {step === 2 && (
          <div style={stepContainerStyle}>
            <div style={fieldAnim(0)}>
              <Input
                label={t.booking.fields.name}
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t.booking.fields.namePh}
                error={errors.name} 
              />
            </div>
            <div style={fieldAnim(1)}>
              <Input
                label={t.booking.fields.phone}
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+380"
                maxLength={13}
                error={errors.phone} 
              />
            </div>
            <div style={fieldAnim(2)}>
              <Input
                label={t.booking.fields.email}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t.booking.fields.emailPh}
                error={errors.email} 
              />
            </div>
          </div>
        )}

        {/* КРОК 3: Послуга, Майстер, Час */}
        {step === 3 && (
          <div style={stepContainerStyle}>
            <div style={fieldAnim(0)}>
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
                error={errors.serviceId} 
              />
            </div>
            
            {bookingMode === "PROCEDURE" && (
              <div style={fieldAnim(1)}>
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
                  error={errors.masterId} 
                />
              </div>
            )}
            
            <div style={dateRowStyle}>
              <div style={{ ...flexColStyle, ...fieldAnim(bookingMode === "PROCEDURE" ? 2 : 1) }}>
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
                {errors.date && (
                  <span style={{ color: "#E74C3C", fontSize: "12px", marginTop: "6px", display: "block" }}>
                    {errors.date}
                  </span>
                )}
              </div>

              <div style={{ ...flexColStyle, ...fieldAnim(bookingMode === "PROCEDURE" ? 3 : 2) }}>
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
                {errors.time && (
                  <span style={{ color: "#E74C3C", fontSize: "12px", marginTop: "6px", display: "block" }}>
                    {errors.time}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* КРОК 4: Нотатки */}
        {step === 4 && (
          <div style={stepSimpleContainerStyle}>
            <div style={fieldAnim(0)}>
              <Input
                label={t.booking.fields.notes}
                name="notes"
                as="textarea"
                value={formData.notes || ""}
                onChange={handleChange}
                placeholder={t.lang === "en" ? "Any special preferences?" : "Чи є у вас особливі побажання до запису?"}
              />
            </div>
          </div>
        )}

        {/* НАВІГАЦІЯ ФОРМИ */}
        <div style={{ ...navRowStyle, ...fieldAnim(4) }}>
          {step > 1 ? (
            <button 
              type="button" 
              onClick={prevStep} 
              style={backButtonStyle}
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
            <div style={flexColStyle} />
          )}

          {step > 1 && step < 4 && (
            <div style={flexColStyle}>
              <Button 
                type="button" 
                onClick={handleNextStepClick} 
                style={{ width: "100%" }}
              >
                {t.lang === "en" ? "Next" : "Далі"}
              </Button>
            </div>
          )}

          {step === 4 && (
            <div style={flexColStyle}>
              <Button type="submit" disabled={status === "loading"} style={{ width: "100%" }}>
                {status === "loading" ? t.booking.sending : t.booking.submit}
              </Button>
            </div>
          )}
        </div>
      </form>

    </div>
  );
}