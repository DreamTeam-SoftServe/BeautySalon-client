import { SectionTitle } from "../SectionTitle";
import { wrapStyle, bodyStyle } from "./PageHeader.styles";
import type { ReactNode } from "react";

interface PageHeaderProps {
  subtitle: string;
  title: string;
  body?: string;
  children?: ReactNode;
}

export function PageHeader({ subtitle, title, body, children }: PageHeaderProps) {
  return (
    <div style={wrapStyle}>
      <SectionTitle subtitle={subtitle} title={title} align="center" />
      {body && <p style={bodyStyle}>{body}</p>}
      {children}
    </div>
  );
}