import { THEME } from '../../../shared/config/theme';
import { api } from '../../../shared/api/api';
import { useState, type ChangeEvent, type FormEvent } from 'react'; 
import { Input } from '../../../shared/ui/Input';
import { Select } from '../../../shared/ui/Select';
import { Button } from '../../../shared/ui/Button';
import { validators } from '../../../shared/lib/validators';
import type { Master } from '../../../entities/service/ui/MasterCard';
import type { Service } from '../../../shared/api/api';

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  serviceId: string;
  date: string;
  time: string;
  masterId?: string;
  notes?: string;
}

interface BookingFormProps {
  services: Service[]; 
  masters: Master[];  
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function BookingForm({ services, masters }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "", email: "", phone: "",
    serviceId: "", masterId: "", date: "", time: "", notes: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>("idle"); 

  const validate = () => {
    const e: Record<string, string> = {};
    if (validators.required && validators.required(formData.name)) e.name = validators.required(formData.name) as string;
    if (validators.email && validators.email(formData.email)) e.email = validators.email(formData.email) as string;
    if (validators.phone && validators.phone(formData.phone)) e.phone = validators.phone(formData.phone) as string;
    
    if (!formData.serviceId) e.serviceId = "Please select a service";
    if (!formData.date) e.date = "Please pick a date";
    if (!formData.time) e.time = "Please pick a time";
    return e;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { 
      setErrors(errs); 
      return; 
    }
    
    setStatus("loading");
    try {
      await api.submitBooking(formData); 
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", serviceId: "", masterId: "", date: "", time: "", notes: "" }); 
    } catch {
      setStatus("error");
    }
  };

  const timeSlots = ["09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00","18:00"];

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "80px 40px" }}>
        <div style={{ fontSize: "3rem", marginBottom: "24px", color: THEME.colors.gold }}>✓</div>
        <h3 style={{ fontFamily: THEME.fonts.display, fontSize: "2rem", fontWeight: 400, marginBottom: "16px" }}>Appointment Confirmed</h3>
        <p style={{ fontFamily: THEME.fonts.body, fontSize: "1.1rem", color: THEME.colors.muted, marginBottom: "32px" }}>
          We've received your booking and will reach out within 2 hours to confirm.
        </p>
        <Button onClick={() => setStatus("idle")}>Book Another</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
        <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} placeholder="Your name" />
        <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="your@email.com" />
        <Input label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} error={errors.phone} placeholder="+380 00 000 00 00" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
        <Select
          label="Service"
          name="serviceId"
          value={formData.serviceId}
          onChange={handleChange}
          error={errors.serviceId}
          options={[
            { value: '', label: 'Select a service...' },
            ...services.map((s) => ({ value: String(s.id), label: `${s.title} — ${s.price}` }))
          ]}
        />
        <Select
          label="Preferred Master (optional)"
          name="masterId"
          value={formData.masterId || ''}
          onChange={handleChange}
          options={[
            { value: '', label: 'Any master' },
            ...masters.map((m) => ({ value: String(m.id), label: m.name }))
          ]}
        />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
        <Input label="Preferred Date" name="date" type="date" value={formData.date} onChange={handleChange} error={errors.date} />
        <Select
          label="Preferred Time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          error={errors.time}
          options={[
            { value: '', label: 'Select time...' },
            ...timeSlots.map((t) => ({ value: t, label: t }))
          ]}
        />
      </div>
      <Input label="Notes (optional)" name="notes" as="textarea" rows={3} value={formData.notes || ''} onChange={handleChange} placeholder="Allergies, special requests..." />
      
      {status === "error" && (
        <p style={{ fontFamily: THEME.fonts.sans, fontSize: "0.85rem", color: "#C0392B", padding: "12px 16px", background: "#f90000", border: "1px solid #FADBD8" }}>
          Something went wrong. Please try again or call us directly.
        </p>
      )}
      
      <div>
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Reserve Appointment"}
        </Button>
      </div>
    </form>
  );
}