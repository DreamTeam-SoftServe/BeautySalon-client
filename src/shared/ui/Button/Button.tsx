import { useState } from "react";
import { base, variants, hoverVariants, disabledStyle } from "./Button.styles";
import type { ReactNode, CSSProperties, MouseEvent } from "react";

type ButtonVariant = "primary" | "outline" | "ghost" | "dark";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  style?: CSSProperties;
}

export function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  disabled,
  style: extraStyle,
}: ButtonProps) {
  const [hovered, setHovered] = useState(false);

  const computedStyle: CSSProperties = {
    ...base,
    ...variants[variant],
    ...(hovered && !disabled ? hoverVariants[variant] : {}),
    ...(disabled ? disabledStyle : {}),
    ...extraStyle,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={computedStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}
