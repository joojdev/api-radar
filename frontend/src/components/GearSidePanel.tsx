import SidePanel from "./SidePanel";
import { useState } from 'react';
import './GearSidePanel.css';

export default function GearSidePanel() {
  const [seconds, setSeconds] = useState<number>(20);

  return (
    <SidePanel>
      <div className="inputGroup">
        <label htmlFor="secondsFetch">Interval between data calls</label>
        <div className="rowDiv">
          <input type="range" id="secondsFetch" min={1} max={120} value={seconds} onChange={(event) => setSeconds(parseInt(event.target.value))} />
          <label htmlFor="secondsFetch">{seconds}<br />seconds</label>
        </div>
      </div>
    </SidePanel>
  );
}
