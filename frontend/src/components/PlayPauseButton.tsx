import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { turnOffApi, turnOnApi } from "../api";

export default function PlayPauseButton() {
  const { selectedApi, setLoading } = useAppContext();

  if (!selectedApi) return;

  const [running, setRunning] = useState<boolean>(selectedApi.running);

  useEffect(() => {
    setRunning(selectedApi.running);
  }, [selectedApi])

  async function handleClick() {
    if (!selectedApi) return;

    setLoading(true);
    const success = running ? await turnOffApi(selectedApi) : await turnOnApi(selectedApi);
    setLoading(false);

    if (success) setRunning(!running);
  }

  return (
    <button className="playPauseButton" onClick={handleClick}><FontAwesomeIcon icon={running ? 'pause' : 'play'} /></button>
  );
}