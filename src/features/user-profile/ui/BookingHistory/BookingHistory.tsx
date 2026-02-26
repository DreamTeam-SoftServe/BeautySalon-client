import { useState, useEffect } from "react";
import { useI18n } from "../../../../shared/i18n";
import { Button } from "../../../../shared/ui/Button";
import { Skeleton } from "../../../../shared/ui/Skeleton";
import { ApiErrorMessage } from "../../../../shared/ui/ApiErrorMessage";
import { BookingHistoryCard } from "../../../../entities/user/ui/BookingHistoryCard/BookingHistoryCard";
import { useAuth } from "../../../../shared/auth/context";
import { userApi } from "../../../../entities/user/api";
import type { UserBooking } from "../../../../entities/user/model";
import { useNavigate } from "react-router";
import { autoCompleteBookings } from "../../../../shared/lib/autoCompleteBookings";
import {
  titleStyle,
  skeletonWrapStyle,
  emptyWrapStyle,
  emptyTitleStyle,
  emptyBodyStyle,
  listStyle,
  getCancellingStyle,
} from "./BookingHistory.styles";

export function BookingHistory() {
  const { t } = useI18n();
  const { user, isLoggedIn, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState<UserBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [cancelling, setCancelling] = useState<string | null>(null);

  const effectiveId = localStorage.getItem("clientId") || user?.id;

  const fetchBookings = async () => {
    if (!effectiveId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await userApi.getMyBookings(effectiveId);
      const data = (response as any).data || response;
      let bookingsArr: UserBooking[] = Array.isArray(data) ? [...data] : [];

      const completedIds = await autoCompleteBookings(bookingsArr);
      if (completedIds.length > 0) {
        bookingsArr = bookingsArr.map((b) =>
          completedIds.includes(b.id)
            ? { ...b, status: "completed" as any }
            : b,
        );
      }

      const sorted = bookingsArr.sort((a, b) => {
        const aStatus = a.status?.toLowerCase();
        const bStatus = b.status?.toLowerCase();
        if (aStatus === "confirmed" && bStatus === "completed") return -1;
        if (aStatus === "completed" && bStatus === "confirmed") return 1;
        return 0;
      });

      setBookings(sorted);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && isLoggedIn && effectiveId) {
      fetchBookings();
    }
  }, [authLoading, isLoggedIn, effectiveId]);

  const handleCancel = async (id: string) => {
    if (!window.confirm(t.account.cancelConfirm)) return;
    setCancelling(id);
    try {
      await userApi.cancelBooking(id);
      await fetchBookings();
      alert(t.booking.success.cancelled);
    } catch (error) {
      console.error("Cancellation error:", error);
    } finally {
      setCancelling(null);
    }
  };

  const isWaiting = authLoading || loading;

  return (
    <div>
      <h3 style={titleStyle}>{t.account.bookingsTitle}</h3>

      {isWaiting && (
        <div style={skeletonWrapStyle}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} height="100px" />
          ))}
        </div>
      )}

      {error && !isWaiting && (
        <ApiErrorMessage error={error} onRetry={fetchBookings} />
      )}

      {!isWaiting && !error && bookings.length === 0 && (
        <div style={emptyWrapStyle}>
          <p style={emptyTitleStyle}>{t.account.bookingsEmpty}</p>
          <p style={emptyBodyStyle}>{t.account.bookingsEmptyBody}</p>
          <Button onClick={() => navigate("/booking")}>
            {t.account.bookNow}
          </Button>
        </div>
      )}

      {!isWaiting && bookings.length > 0 && (
        <div style={listStyle}>
          {bookings.map((b) => (
            <div key={b.id} style={getCancellingStyle(cancelling === b.id)}>
              <BookingHistoryCard booking={b} onCancel={handleCancel} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
