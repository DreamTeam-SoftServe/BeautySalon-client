import type { UserBooking } from "../../model";
import { useI18n } from "../../../../shared/i18n";
import {
  STATUS_STYLES,
  getCardStyle,
  calendarBlockStyle,
  getDayStyle,
  monthStyle,
  infoBlockStyle,
  infoHeaderStyle,
  getServiceNameStyle,
  getStatusBadgeStyle,
  metaStyle,
  footerRowStyle,
  getPriceStyle,
  cancelBtnStyle,
  completedNoteStyle,
  notesStyle,
} from "./BookingHistoryCard.styles";
import { THEME } from "../../../../shared/config/theme";

interface BookingHistoryCardProps {
  booking: UserBooking;
  onCancel?: (id: string) => void;
}

export function BookingHistoryCard({
  booking,
  onCancel,
}: BookingHistoryCardProps) {
  const { t } = useI18n();

  const rawDate = (booking as any).start_date || booking.date;
  const appointmentDate = new Date(rawDate);
  const isValidDate = !isNaN(appointmentDate.getTime());

  const statusKey = (booking.status || "pending").toLowerCase();
  const colors = STATUS_STYLES[statusKey] || STATUS_STYLES.pending;

  const dayNumber = isValidDate ? appointmentDate.getDate() : "--";
  const monthShort = isValidDate
    ? appointmentDate.toLocaleDateString(t.lang, { month: "short" })
    : "INV";
  const formattedDate = isValidDate
    ? appointmentDate.toLocaleDateString(t.lang, {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Invalid Date";
  const displayTime =
    booking.time ||
    (isValidDate
      ? appointmentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : "--:--");

  const canCancel = ["pending", "confirmed", "scheduled"].includes(statusKey);

  return (
    <div style={getCardStyle(statusKey)}>
      <div style={calendarBlockStyle}>
        <p style={getDayStyle(statusKey)}>{dayNumber}</p>
        <p style={monthStyle}>{monthShort}</p>
      </div>

      <div style={infoBlockStyle}>
        <div style={infoHeaderStyle}>
          <h4 style={getServiceNameStyle(statusKey)}>{booking.serviceName}</h4>
          <span style={getStatusBadgeStyle(colors)}>
            {(t.account.status as Record<string, string>)[statusKey] ||
              statusKey}
          </span>
        </div>

        <p style={metaStyle}>
          {booking.masterName || "Master"} · {displayTime} · {formattedDate}
        </p>

        {booking.notes && <div style={notesStyle}>{booking.notes}</div>}

        <div style={footerRowStyle}>
          <span style={getPriceStyle(statusKey)}>
            {booking.price || 0} {t.services.unit.cost}
          </span>

          {canCancel ? (
            <button
              onClick={() => onCancel?.(booking.id)}
              style={cancelBtnStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = THEME.colors.errorText;
                e.currentTarget.style.color = THEME.colors.errorText;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#E8E0D0";
                e.currentTarget.style.color = THEME.colors.muted;
              }}
            >
              {t.account.cancelBooking}
            </button>
          ) : statusKey === "completed" ? (
            <span style={completedNoteStyle}>✓ {t.account.completedNote}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
