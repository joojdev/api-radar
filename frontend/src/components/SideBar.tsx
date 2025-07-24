import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SideBar.css';
import { useState } from 'react';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import SideBarIcon from './SideBarIcon';

export enum Tab {
  LIST,
  GEAR,
  NONE
};

const tabs: { symbol: IconProp, tab: Tab }[] = [
  {
    symbol: "list",
    tab: Tab.LIST
  },
  {
    symbol: "gear",
    tab: Tab.GEAR
  }
];

export default function SideBar() {
  const [selectedTab, setSelectedTab] = useState(Tab.LIST);

  return (
    <>
      <ul className="collapsedSidebar">
        {tabs && tabs.map(({ symbol, tab }) => (
          <SideBarIcon icon={symbol} onClick={() => setSelectedTab(tab)} />
        ))}   
      </ul>
      {selectedTab == Tab.LIST && <>list</>}
      {selectedTab == Tab.GEAR && <>gear</>}
    </>
  );
}