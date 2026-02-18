import { useState, useEffect } from 'react';
import { THEME } from '../shared/config/theme';
import { api } from '../shared/api/api';
import { SectionTitle } from '../shared/ui/SectionTitle';
import { BookingForm } from '../features/book-appointment/ui/BookingForm';

export function BookingSection() {
  const [services, setServices] = useState([]);
  const [masters, setMasters] = useState([]);

  useEffect(() => {
    api.getServices().then(setServices);
    api.getMasters().then(setMasters);
  }, []);

  return (
    <section 
      className="booking-section" 
      style={{ padding: "120px 5%", background: THEME.colors.charcoal }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <SectionTitle
          subtitle="Reserve Your Visit"
          title={"Book an Appointment"}
        />
        
        <style>{`
          .booking-section h2, 
          .booking-section h3, 
          .booking-section span { 
            color: ${THEME.colors.cream} !important; 
          }
          
          .booking-section p { 
            color: rgba(245,240,232,0.7) !important; 
          }

          .booking-section input, 
          .booking-section select, 
          .booking-section textarea {
            color: ${THEME.colors.cream} !important;
            background-color: rgba(255, 255, 255, 0.05) !important; /* Легкий фон для полей */
            border: 1px solid rgba(245, 240, 232, 0.2) !important;
            padding: 10px;
          }

          .booking-section input::placeholder {
            color: rgba(245, 240, 232, 0.4) !important;
          }

          .booking-section option {
            background-color: ${THEME.colors.charcoal} !important;
            color: ${THEME.colors.cream} !important;
          }

          .booking-section label {
            color: ${THEME.colors.cream} !important;
            margin-bottom: 8px;
            display: block;
          }
        `}</style>

        <BookingForm services={services} masters={masters} />
      </div>
    </section>
  );
}