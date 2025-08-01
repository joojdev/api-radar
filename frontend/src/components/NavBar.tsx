import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NavBar.css";
import { Popup, useAppContext } from "../hooks/useAppContext";

export default function NavBar() {
  const { setCurrentPopup } = useAppContext();

  function handleCreateApi() {
    setCurrentPopup(Popup.NEW_API);
  }

  return (
    <nav>
      <h1>API Radar</h1>
      <button onClick={handleCreateApi}>
        <FontAwesomeIcon icon={["fajr", "plus"]} />
      </button>
    </nav>
  );
}
