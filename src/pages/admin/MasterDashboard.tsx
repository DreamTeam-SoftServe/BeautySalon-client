import { useEffect, useState } from "react";
import { api } from "../../shared/api/api";
import { THEME } from "../../shared/config/theme";
import { useI18n } from "../../shared/i18n";

export function MasterDashboard() {
  const { t } = useI18n();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const res = await api.getMasterBookings();
        setBookings(Array.isArray(res) ? res : (res as any).data || []);
      } catch (error: any) {
        console.error("Error:", error);
        if (error.response?.status === 400) {
          alert(t.masters.dashboard.errors.noMasterAccount);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMyBookings();
  }, []);

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      await api.updateBookingStatus(bookingId, newStatus);
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b)),
      );
    } catch (error) {
      alert(t.masters.dashboard.errors.cantUpdateStatus);
    }
  };

  if (loading)
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        {t.masters.dashboard.status.loading}
      </div>
    );

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "1000px",
        margin: "0 auto",
        minHeight: "80vh",
      }}
    >
      <h2
        style={{
          fontFamily: THEME.fonts.display,
          color: THEME.colors.charcoal,
          marginBottom: "24px",
        }}
      >
        {t.masters.dashboard.mySchedule}
      </h2>

      {bookings.length === 0 ? (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            background: THEME.colors.white,
            borderRadius: "8px",
            border: "1px solid #E8E0D0",
          }}
        >
          {t.masters.dashboard.noSchedule}
        </div>
      ) : (
        <div
          style={{
            overflowX: "auto",
            background: THEME.colors.white,
            border: "1px solid #E8E0D0",
            borderRadius: "8px",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#F8F5F0",
                  borderBottom: `2px solid #E8E0D0`,
                }}
              >
                <th style={{ padding: "16px", color: THEME.colors.muted }}>
                  {t.masters.dashboard.scheduleStatus.time}
                </th>
                <th style={{ padding: "16px", color: THEME.colors.muted }}>
                  {t.masters.dashboard.scheduleStatus.client}
                </th>
                <th style={{ padding: "16px", color: THEME.colors.muted }}>
                  {t.masters.dashboard.scheduleStatus.service}
                </th>
                <th style={{ padding: "16px", color: THEME.colors.muted }}>
                  {t.masters.dashboard.scheduleStatus.status}
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} style={{ borderBottom: "1px solid #E8E0D0" }}>
                  <td style={{ padding: "16px" }}>
                    <div style={{ fontWeight: 500 }}>{b.date}</div>
                    <div style={{ color: THEME.colors.gold }}>{b.time}</div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div style={{ fontWeight: 500 }}>{b.clientName}</div>
                    <div
                      style={{ fontSize: "0.85rem", color: THEME.colors.muted }}
                    >
                      {b.clientPhone}
                    </div>
                  </td>
                  <td style={{ padding: "16px" }}>{b.serviceName}</td>
                  <td style={{ padding: "16px" }}>
                    <select
                      value={b.status}
                      onChange={(e) => handleStatusChange(b.id, e.target.value)}
                      style={{
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #E8E0D0",
                      }}
                    >
                      <option value="IN_PROGRESS">
                        {t.masters.dashboard.status.inProgress}
                      </option>
                      <option value="CONFIRMED">
                        {t.masters.dashboard.status.confirmed}
                      </option>
                      <option value="COMPLETED">
                        {t.masters.dashboard.status.completed}
                      </option>
                      <option value="CANCELLED">
                        {t.masters.dashboard.status.canceled}
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
