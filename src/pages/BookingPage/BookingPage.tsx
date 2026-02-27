import { BookingSection } from "../../widgets/BookingSection/BookingSection";
import { pageWrapStyle } from "./BookingPage.styles";

export function BookingPage() {
  return (
    <div style={pageWrapStyle}>
      <BookingSection />
    </div>
  );
}