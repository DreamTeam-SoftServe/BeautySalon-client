import { useState } from "react";
import { api, type ChangePasswordData } from "../../../../shared/api/api";
import { Button } from "../../../../shared/ui/Button";
import { Input } from "../../../../shared/ui/Input";
import { useI18n } from "../../../../shared/i18n";
import {
  wrapStyle,
  titleStyle,
  formStyle,
  dividerStyle,
  getStatusStyle,
} from "./SecuritySection.styles";

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
    <div style={wrapStyle}>
      <h2 style={titleStyle}>{t.security.title}</h2>
      <form onSubmit={handleUpdate} style={formStyle}>
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
        <div style={dividerStyle} />
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
        {status.msg && <p style={getStatusStyle(status.type)}>{status.msg}</p>}
        <Button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "10px",
            width: "108%",
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {loading
            ? t.security.status.Updating
            : t.security.buttons.updatePassword}
        </Button>
      </form>
    </div>
  );
}
