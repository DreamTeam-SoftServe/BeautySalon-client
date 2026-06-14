import { BookingSection } from "../../widgets/BookingSection/BookingSection";
import { useI18n } from "../../shared/i18n";
import {
  pageStyle,
  containerStyle,
  headerWrapStyle,
  eyebrowStyle,
  titleStyle,
  subtitleStyle,
  dividerStyle,
  formWrapStyle
} from "./BookingPage.styles";

export function BookingPage() {
  const { t } = useI18n();

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        
        {/* ЗАГОЛОВОК */}
        <div style={headerWrapStyle}>
          <p style={eyebrowStyle}>
            Prestige Studio
          </p>
          
          <h1 style={titleStyle}>
            {t.lang === "en" ? "Online Booking" : "Онлайн-запис"}
          </h1>
          
          <p style={subtitleStyle}>
            {t.lang === "en" 
              ? "Book your appointment or training course in a few simple steps" 
              : "Запишіться на процедуру або навчальний курс за кілька простих кроків"}
          </p>
          
          <div style={dividerStyle} />
        </div>
        
        {/* КОНТЕЙНЕР ПОКРОКОВОЇ ФОРМИ */}
        <div style={formWrapStyle}>
          <BookingSection />
        </div>
        
      </div>
    </div>
  );
}