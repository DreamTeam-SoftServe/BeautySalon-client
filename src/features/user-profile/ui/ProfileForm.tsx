import { useState, useEffect } from "react";
import { useI18n } from "../../../shared/i18n";
import { useAuth } from "../../../shared/auth/context";
import { THEME } from "../../../shared/config/theme";
import { Button } from "../../../shared/ui/Button";
import { Input } from "../../../shared/ui/Input";
import { userApi } from "../../../entities/user/api";

export function ProfileForm() {
  const { t } = useI18n();
  const { user, refreshUser } = useAuth();
  const ac = t.account;

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
  });

  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
      });
    }
  }, [user]);

  if (!user) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
    setSaveStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving");

    try {
      const response = await userApi.updateMe({
        name: form.name,
        phone: form.phone,
        email: form.email,
      });

      const { accessToken } = response as any;

      if (accessToken) {
        localStorage.setItem("prestige_token", accessToken);
        await refreshUser();
        setSaveStatus("saved");
      }
    } catch (error) {
      console.error("Update failed", error);
      setSaveStatus("error");
    }
  };

  const rawDate = user.createdAt;
  const memberDateObj = rawDate ? new Date(rawDate) : null;
  const isValidDate = memberDateObj && !isNaN(memberDateObj.getTime());

  const memberDate = isValidDate
    ? memberDateObj.toLocaleDateString(t.lang, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown date";

  return (
    <div>
      <h3
        style={{
          fontFamily: THEME.fonts.display,
          fontSize: "1.5rem",
          fontWeight: 400,
          color: THEME.colors.charcoal,
          marginBottom: "32px",
        }}
      >
        {ac.profileTitle}
      </h3>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "560px",
        }}
      >
        <Input
          label={ac.nameLabel}
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />

        {}
        <Input
          label={ac.emailLabel}
          name="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Input
          label={ac.phoneLabel}
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        <p
          style={{
            fontFamily: THEME.fonts.sans,
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            color: THEME.colors.muted,
            margin: 0,
          }}
        >
          {ac.memberSince}: {memberDate}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Button type="submit" disabled={saveStatus === "saving"}>
            {saveStatus === "saving" ? ac.profileSaving : ac.profileSave}
          </Button>
          {saveStatus === "saved" && (
            <span
              style={{
                fontFamily: THEME.fonts.sans,
                fontSize: "0.8rem",
                color: "#2D7A4F",
              }}
            >
              ✓ {ac.profileSaved}
            </span>
          )}
          {saveStatus === "error" && (
            <span
              style={{
                fontFamily: THEME.fonts.sans,
                fontSize: "0.8rem",
                color: "#C0392B",
              }}
            >
              Error saving profile
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
