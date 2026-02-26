import { useState } from "react";
import { useI18n } from "../../shared/i18n";
import { useAuth } from "../../shared/auth/context";
import { Button } from "../../shared/ui/Button";
import { UserAvatar } from "../../entities/user/ui/UserAvatar/UserAvatar";
import { BookingHistory } from "../../features/user-profile/ui/BookingHistory/BookingHistory";
import { ProfileForm } from "../../features/user-profile/ui/ProfileForm/ProfileForm";
import { SecuritySection } from "../../features/user-profile/ui/SecuritySection/SecuritySection";
import { useNavigate, Link } from "react-router-dom";
import {
  pageStyle, loadingStyle, loadingTextStyle, headerStyle, headerInnerStyle,
  userRowStyle, userInfoStyle, eyebrowStyle, nameStyle, emailStyle,
  actionsStyle, adminLinkStyle, masterLinkStyle, tabsRowStyle,
  getTabStyle, contentStyle,
} from "./AccountPage.styles";

type Tab = "profile" | "bookings" | "security";

export function AccountPage() {
  const { t } = useI18n();
  const { user, logout, isLoading } = useAuth();
  const [tab, setTab] = useState<Tab>("profile");
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  if (isLoading || !user) {
    return (
      <div style={loadingStyle}>
        <div style={loadingTextStyle}>…</div>
      </div>
    );
  }

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    navigate("/");
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <div style={headerInnerStyle}>
          <div style={userRowStyle}>
            <div style={userInfoStyle}>
              <UserAvatar user={user} size={64} />
              <div>
                <p style={eyebrowStyle}>{t.account.pageEyebrow}</p>
                <h1 style={nameStyle}>{user.name}</h1>
                <p style={emailStyle}>{user.email}</p>
              </div>
            </div>

            <div style={actionsStyle}>
              {user.role === "Admin" && (
                <Link to="/admin" style={adminLinkStyle}>
                  {t.account.adminButton}
                </Link>
              )}
              {user.role === "Master" && (
                <Link to="/master" style={masterLinkStyle}>
                  {t.account.masterButton}
                </Link>
              )}
              <Button
                variant="outline"
                onClick={handleLogout}
                disabled={loggingOut}
                style={{ padding: "10px 20px", fontSize: "0.75rem" }}
              >
                {loggingOut ? t.account.loggingOut : t.account.logout}
              </Button>
            </div>
          </div>

          <div style={tabsRowStyle}>
            <button style={getTabStyle(tab === "profile")} onClick={() => setTab("profile")}>
              {t.account.tabProfile}
            </button>
            <button style={getTabStyle(tab === "bookings")} onClick={() => setTab("bookings")}>
              {t.account.tabBookings}
            </button>
            <button style={getTabStyle(tab === "security")} onClick={() => setTab("security")}>
              {t.account.tabSecurity}
            </button>
          </div>
        </div>
      </div>

      <div style={contentStyle}>
        {tab === "profile" && <ProfileForm />}
        {tab === "bookings" && <BookingHistory />}
        {tab === "security" && <SecuritySection />}
      </div>
    </div>
  );
}