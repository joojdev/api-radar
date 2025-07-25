import type { Api } from "../api";
import { Popup, useAppContext } from "../hooks/useAppContext";
import InlineDropDown from "./InlineDropDown";
import PlayPauseButton from "./PlayPauseButton";
import './ApiPage.css';

export default function ApiPage() {
  const { selectedApi, setCurrentPopup } = useAppContext();

  async function handleDeleteAPI() {
    setCurrentPopup(Popup.DELETE_API);
  }

  function handleEditAPI() {
    setCurrentPopup(Popup.EDIT_API);
  }

  function returnFullURL(api: Api) {
    return `${api.protocol}://${api.domain}${api.endpoint}`
  }

  if (!selectedApi) return;

  return (
    <div className='apiContainer'>
      <div className="title">
        <h2>{selectedApi.name}</h2>
        <small>{returnFullURL(selectedApi)}</small>
      </div>

      <div className="apiData">
        <InlineDropDown name="Latency: 100ms">
          <h3>hello, world!</h3>
        </InlineDropDown>

        <InlineDropDown name="Response Time: 350ms">
          <h3>hello, world!</h3>
        </InlineDropDown>

        <InlineDropDown name="Status: UP">
          <h3>hello, world!</h3>
        </InlineDropDown>
      </div>

      <div className="buttonGroup">
        <button onClick={handleDeleteAPI}>Delete API</button>
        <button onClick={handleEditAPI}>Edit API</button>
      </div>
      <PlayPauseButton />
    </div>
  );
}