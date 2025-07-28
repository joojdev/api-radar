import type { Api } from "../api";
import { useAppContext } from "../hooks/useAppContext";
import InlineDropDown from "./InlineDropDown";
import PlayPauseButton from "./PlayPauseButton";
import './ApiPage.css';

export default function ApiPage() {
  const { selectedApi, currentStatus, currentResponseTime } = useAppContext();

  function returnFullURL(api: Api) {
    return `${api.protocol}://${api.domain}${api.endpoint}`
  }

  function handleClickURL(url: string) {
    window.open(url);
  }

  if (!selectedApi) return;

  return (
    <div className='apiContainer'>
      <div className="title">
        <h2>{selectedApi.name}</h2>
        <small onClick={() => handleClickURL(returnFullURL(selectedApi))}>{returnFullURL(selectedApi)}</small>
      </div>

      <div className="apiData">
        <InlineDropDown name={`Current Response Time: ${currentResponseTime}ms`}>
          <h3>hello, world!</h3>
        </InlineDropDown>

        <InlineDropDown name={`Current Status: ${currentStatus}`}>
          <h3>hello, world!</h3>
        </InlineDropDown>
      </div>

      <PlayPauseButton />
    </div>
  );
}