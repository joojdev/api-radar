import type { ReactNode } from "react";
import "./SidePanel.css";

export default function SidePanel({ children }: { children: ReactNode }) {
  return <div className="sidePanel">{children}</div>;
}
