import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useAppContext } from "../hooks/useAppContext";

export default function PlayPauseButton() {
  const { selectedApi } = useAppContext();

  if (!selectedApi) return;

  const [running, setRunning] = useState<boolean | undefined>(selectedApi.running);

  function handleClick() {
    setRunning(!running);
  }

  if (running == undefined) return;

  return (
    <button className="playPauseButton" onClick={handleClick}><FontAwesomeIcon icon={running ? 'pause' : 'play'} /></button>
  );
}