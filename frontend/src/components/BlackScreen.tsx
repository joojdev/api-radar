import type { ReactNode } from "react";
import './BlackScreen.css';

export default function BlackScreen({ children }: { children: ReactNode }) {
  return (
    <div className="blackScreen">{children}</div>
  );
}