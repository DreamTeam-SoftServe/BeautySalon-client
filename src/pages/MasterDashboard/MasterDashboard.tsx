import { useEffect, useState } from "react";
import { api } from "../../shared/api/api";
import { useI18n } from "../../shared/i18n";
import { autoCompleteBookings } from "../../shared/lib/autoCompleteBookings";
import {
  containerStyle, loadingStyle, titleStyle, emptyStyle,
  tableWrapStyle, tableStyle, theadRowStyle, thStyle,
  tdStyle, trStyle, datePrimaryStyle, dateSecondaryStyle,
  clientNameStyle, clientPhoneStyle, selectStyle,
} from "./MasterDashboard.styles";

export function MasterDashboard() {
  const { t } = useI18n();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const res = await api.getMasterBookings();
        let bookingsArr = Array.isArray(res) ? res : (res as any).data || [];

        const completedIds = await autoCompleteBookings(bookingsArr);
        if (completedIds.length > 0) {
          bookingsArr = (bookingsArr as any[]).map((b) =>
            completedIds.includes(b.id) ? { ...b, status: "COMPLETED" } : b
          );
        }

        setBookings(bookingsArr);
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
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
      );
    } catch {
      alert(t.masters.dashboard.errors.cantUpdateStatus);
    }
  };

  const { scheduleStatus, status } = t.masters.dashboard;

  if (loading) return <div style={loadingStyle}>{status.loading}</div>;

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>{t.masters.dashboard.mySchedule}</h2>

      {bookings.length === 0 ? (
        <div style={emptyStyle}>{t.masters.dashboard.noSchedule}</div>
      ) : (
        <div style={tableWrapStyle}>
          <table style={tableStyle}>
            <thead>
              <tr style={theadRowStyle}>
                <th style={thStyle}>{scheduleStatus.time}</th>
                <th style={thStyle}>{scheduleStatus.client}</th>
                <th style={thStyle}>{scheduleStatus.service}</th>
                <th style={thStyle}>{t.admin.columns.notes}</th>
                <th style={thStyle}>{scheduleStatus.status}</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} style={trStyle}>
                  <td style={tdStyle}>
                    <div style={datePrimaryStyle}>{b.date}</div>
                    <div style={dateSecondaryStyle}>{b.time}</div>
                  </td>
                  <td style={tdStyle}>
                    <div style={clientNameStyle}>{b.clientName}</div>
                    <div style={clientPhoneStyle}>{b.clientPhone}</div>
                  </td>
                  <td style={tdStyle}>{b.serviceName}</td>

                  <td style={tdStyle}>
                    <div style={{ 
                      fontSize: "0.85rem", 
                      color: "#7A7A7A", 
                      maxWidth: "200px", 
                      overflowWrap: "break-word" 
                    }}>
                      {b.notes || "—"}
                    </div>
                  </td>

                  <td style={tdStyle}>
                    <select
                      value={b.status}
                      onChange={(e) => handleStatusChange(b.id, e.target.value)}
                      style={selectStyle}
                    >
                      <option value="IN_PROGRESS">{status.inProgress}</option>
                      <option value="CONFIRMED">{status.confirmed}</option>
                      <option value="COMPLETED">{status.completed}</option>
                      <option value="CANCELLED">{status.canceled}</option>
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