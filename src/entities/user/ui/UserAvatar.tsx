import { THEME } from "../../../shared/config/theme";
import type { User } from "../model";

interface UserAvatarProps {
  user: User;
  size?: number;
}

export function UserAvatar({ user, size = 40 }: UserAvatarProps) {
  const initials = user.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (user.avatarUrl) {
    return (
      <img
        src={user.avatarUrl}
        alt={user.name}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          border: `2px solid ${THEME.colors.gold}`,
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${THEME.colors.gold}, ${THEME.colors.goldLight})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        border: `2px solid ${THEME.colors.gold}`,
      }}
    >
      <span
        style={{
          fontFamily: THEME.fonts.sans,
          fontSize: size * 0.35,
          fontWeight: 500,
          color: THEME.colors.charcoal,
          lineHeight: 1,
        }}
      >
        {initials}
      </span>
    </div>
  );
}
