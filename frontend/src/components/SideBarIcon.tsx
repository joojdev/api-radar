import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { MouseEventHandler } from "react";

export default function SideBarIcon({
  icon,
  onClick,
  className,
}: {
  icon: IconProp;
  onClick: MouseEventHandler<HTMLLIElement>;
  className: string;
}) {
  return (
    <li onClick={onClick} className={className}>
      <FontAwesomeIcon icon={icon} />
    </li>
  );
}
