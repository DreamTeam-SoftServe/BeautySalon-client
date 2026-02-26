import type { CSSProperties } from "react";

export const getSkeletonStyle = (height: string): CSSProperties => ({
  width: "100%",
  height,
  background: "linear-gradient(90deg, #f0ece4 25%, #e4ddd2 50%, #f0ece4 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.5s infinite",
});