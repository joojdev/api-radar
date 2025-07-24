import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { MouseEventHandler } from "react";
import { Tab } from './SideBar';

export default function SideBarIcon({ icon, onClick }: { icon: IconProp, onClick: MouseEventHandler<HTMLLIElement> }) {
  return (
    <li onClick={onClick}><FontAwesomeIcon icon={icon} /></li>
  );
}