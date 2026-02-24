import { useState } from "react";
import { api, type ChangePasswordData } from "../../../shared/api/api";
import { THEME } from "../../../shared/config/theme";
import { Button } from "../../../shared/ui/Button";
import { Input } from "../../../shared/ui/Input";
import { useI18n } from "../../../shared/i18n";

export function SecuritySection() {
  const { t } = useI18n();
  const [formData, setFormData] = useState<ChangePasswordData>({
    oldPassword: "",
    newPassword: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const [status, setStatus] = useState({ msg: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== confirmPassword) {
      setStatus({ msg: t.security.passwordNotMatch, type: "error" });
      return;
    }

    setLoading(true);
    setStatus({ msg: "", type: "" });

    try {
      await api.changePassword(formData);
      setStatus({ msg: t.security.passwordChanged, type: "success" });
      setFormData({ oldPassword: "", newPassword: "" });
      setConfirmPassword("");
    } catch (err: any) {
      setStatus({
        msg: err.response?.data?.message || t.security.oldPasswordIncorect,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px" }}>
      <h2
        style={{
          fontFamily: THEME.fonts.display,
          fontSize: "1.5rem",
          marginBottom: "30px",
          fontWeight: 400,
          color: THEME.colors.charcoal,
        }}
      >
        {t.security.title}
      </h2>

      <form
        onSubmit={handleUpdate}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <Input
          name="oldPassword"
          label={t.security.buttons.oldPassword}
          type="password"
          value={formData.oldPassword}
          onChange={(e) =>
            setFormData({ ...formData, oldPassword: e.target.value })
          }
          placeholder="••••••••"
        />

        <div
          style={{
            height: "1px",
            background: "rgba(201,168,76,0.1)",
            margin: "10px 0",
          }}
        />

        <Input
          name="newPassword"
          label={t.security.buttons.newPassword}
          type="password"
          value={formData.newPassword}
          onChange={(e) =>
            setFormData({ ...formData, newPassword: e.target.value })
          }
          placeholder="••••••••"
        />

        <Input
          name="confirmPassword"
          label={t.security.buttons.confirmPassword}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
        />

        {status.msg && (
          <p
            style={{
              color: status.type === "success" ? "#2ecc71" : "#e74c3c",
              fontSize: "0.8rem",
            }}
          >
            {status.msg}
          </p>
        )}

        <Button type="submit" disabled={loading} style={{ marginTop: "10px" }}>
          {loading
            ? t.security.status.Updating
            : t.security.buttons.updatePassword}
        </Button>
      </form>
    </div>
  );
}
