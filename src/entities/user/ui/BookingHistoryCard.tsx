import { THEME } from "../../../shared/config/theme";
import type { UserBooking } from "../model";
import { useI18n } from "../../../shared/i18n";

const STATUS_STYLES: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  pending: { bg: "#FFF9EC", text: "#B8860B", border: "#F0D080" },
  confirmed: { bg: "#EDF7F0", text: "#2D7A4F", border: "#A8D8B8" },
  in_progress: { bg: "#EBF5FB", text: "#2E86C1", border: "#AED6F1" },
  completed: { bg: "#F8F9F9", text: "#717D7E", border: "#D5DBDB" },
  cancelled: { bg: "#FDF2F2", text: "#C0392B", border: "#FADBD8" },
};

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
    <div
      style={{
        padding: "24px 28px",
        background: statusKey === "completed" ? "#FCFCFC" : THEME.colors.white,
        border: `1px solid #E8E0D0`,
        display: "flex",
        gap: "20px",
        alignItems: "flex-start",
        transition: "all 0.2s",
        marginBottom: "12px",
        opacity: statusKey === "cancelled" ? 0.7 : 1,
      }}
    >
      {/* Календарний блок */}
      <div
        style={{
          minWidth: "80px",
          textAlign: "center",
          paddingRight: "20px",
          borderRight: `1px solid #E8E0D0`,
          flexShrink: 0,
        }}
      >
        <p
          style={{
            fontFamily: THEME.fonts.display,
            fontSize: "2rem",
            fontWeight: 400,
            color:
              statusKey === "completed"
                ? THEME.colors.muted
                : THEME.colors.charcoal,
            margin: 0,
            lineHeight: 1,
          }}
        >
          {dayNumber}
        </p>
        <p
          style={{
            fontFamily: THEME.fonts.sans,
            fontSize: "0.65rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: THEME.colors.muted,
            margin: "4px 0 0",
          }}
        >
          {monthShort}
        </p>
      </div>

      {/* Інфо блок */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "8px",
          }}
        >
          <h4
            style={{
              fontFamily: THEME.fonts.display,
              fontSize: "1.15rem",
              fontWeight: 400,
              color:
                statusKey === "completed"
                  ? THEME.colors.muted
                  : THEME.colors.charcoal,
              margin: 0,
            }}
          >
            {booking.serviceName}
          </h4>

          <span
            style={{
              fontFamily: THEME.fonts.sans,
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "4px 12px",
              background: colors.bg,
              color: colors.text,
              border: `1px solid ${colors.border}`,
              flexShrink: 0,
              borderRadius: "2px",
            }}
          >
            {(t.account.status as Record<string, string>)[statusKey] ||
              statusKey}
          </span>
        </div>

        <p
          style={{
            fontFamily: THEME.fonts.sans,
            fontSize: "0.8rem",
            color: THEME.colors.muted,
            margin: "0 0 4px",
          }}
        >
          {booking.masterName || "Master"} · {displayTime} · {formattedDate}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "12px",
          }}
        >
          <span
            style={{
              fontFamily: THEME.fonts.display,
              fontSize: "1.1rem",
              color:
                statusKey === "completed"
                  ? THEME.colors.muted
                  : THEME.colors.gold,
            }}
          >
            ${booking.price || 0}
          </span>

          {/* Кнопка скасування */}
          {canCancel ? (
            <button
              onClick={() => onCancel?.(booking.id)}
              style={{
                background: "none",
                border: `1px solid #E8E0D0`,
                fontFamily: THEME.fonts.sans,
                fontSize: "0.7rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: THEME.colors.muted,
                cursor: "pointer",
                padding: "6px 14px",
                transition: "all 0.2s",
              }}
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
            <span
              style={{
                fontFamily: THEME.fonts.sans,
                fontSize: "0.6rem",
                color: "#4CAF50",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              ✓ {t.account.completedNote}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
