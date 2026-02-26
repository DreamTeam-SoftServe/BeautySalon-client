import { getSkeletonStyle } from "./Skeleton.styles";

export function Skeleton({ height = "200px" }: { height?: string }) {
  return <div style={getSkeletonStyle(height)} />;
}