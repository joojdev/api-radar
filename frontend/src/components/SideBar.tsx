import "./SideBar.css";
import { useState } from "react";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import SideBarIcon from "./SideBarIcon";
import ListSidePanel from "./ListSidePanel";
import GearSidePanel from "./GearSidePanel";

enum EnumTab {
  LIST,
  GEAR,
  NONE,
}

type Tab = { symbol: IconProp; tab: EnumTab };

const tabs: Tab[] = [
  {
    symbol: "list",
    tab: EnumTab.LIST,
  },
  {
    symbol: "gear",
    tab: EnumTab.GEAR,
  },
];

export default function SideBar() {
  const [selectedTab, setSelectedTab] = useState(EnumTab.LIST);

  return (
    <>
      <ul className="collapsedSidebar">
        {tabs &&
          tabs.map(({ symbol, tab }: Tab, index) => (
            <SideBarIcon
              key={index}
              className={selectedTab == tab ? "selected" : ""}
              icon={symbol}
              onClick={() =>
                setSelectedTab(selectedTab == tab ? EnumTab.NONE : tab)
              }
            />
          ))}
      </ul>
      {selectedTab == EnumTab.LIST && <ListSidePanel />}
      {selectedTab == EnumTab.GEAR && <GearSidePanel />}
    </>
  );
}
