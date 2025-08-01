import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { turnOffApi, turnOnApi } from "../api";

export default function PlayPauseButton() {
  const { selectedApi } = useAppContext();

  if (!selectedApi) return;

  const [running, setRunning] = useState<boolean>(selectedApi.running);

  useEffect(() => {
    setRunning(selectedApi.running);
  }, [selectedApi]);

  async function handleClick() {
    if (!selectedApi) return;

    const success = running
      ? await turnOffApi(selectedApi)
      : await turnOnApi(selectedApi);

    if (success) {
      setRunning(!running);
      selectedApi.running = !running;
    }
  }

  return (
    <button className="playPauseButton" onClick={handleClick}>
      <FontAwesomeIcon icon={running ? "pause" : "play"} />
    </button>
  );
}
