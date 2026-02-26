import type { User } from "../../model";
import { getImgStyle, getInitialsWrapStyle, getInitialsTextStyle } from "./UserAvatar.styles";

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
    return <img src={user.avatarUrl} alt={user.name} style={getImgStyle(size)} />;
  }

  return (
    <div style={getInitialsWrapStyle(size)}>
      <span style={getInitialsTextStyle(size)}>{initials}</span>
    </div>
  );
}