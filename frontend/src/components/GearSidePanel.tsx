import SidePanel from "./SidePanel";
import "./GearSidePanel.css";
import { useAppContext } from "../hooks/useAppContext";
import { useState } from "react";

export default function GearSidePanel() {
  const { secondsBetweenCalls, setSecondsBetweenCalls } = useAppContext();
  const [tempSeconds, setTempSeconds] = useState<number>(secondsBetweenCalls);

  return (
    <SidePanel>
      <div className="inputGroup">
        <label htmlFor="secondsFetch">Interval between data calls</label>
        <div className="rowDiv">
          <input
            type="range"
            id="secondsFetch"
            min={1}
            max={120}
            value={tempSeconds}
            onChange={(event) => setTempSeconds(parseInt(event.target.value))}
            onMouseUp={() => setSecondsBetweenCalls(tempSeconds)}
          />
          <label htmlFor="secondsFetch">
            {tempSeconds}
            <br />
            seconds
          </label>
        </div>
      </div>
    </SidePanel>
  );
}
