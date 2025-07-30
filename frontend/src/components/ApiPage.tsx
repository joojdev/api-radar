import type { Api } from "../api";
import { useAppContext } from "../hooks/useAppContext";
import InlineDropDown from "./InlineDropDown";
import PlayPauseButton from "./PlayPauseButton";
import './ApiPage.css';
import ResponseTimeChart from "./ResponseTimeChart";

enum HTTP_RESPONSE_TYPE {
  UNKNOWN = 'Unknown',
  INFORMATIONAL = 'Up and informing',
  SUCCESSFUL = 'Up',
  REDIRECTION = 'Up and redirecting',
  CLIENT_ERROR = 'Client error',
  SERVER_ERROR = 'Server error'
};

export default function ApiPage() {
  const { selectedApi, currentStatus, currentResponseTime } = useAppContext();

  function returnFullURL(api: Api) {
    return `${api.protocol}://${api.domain}${api.endpoint}`
  }

  function handleClickURL(url: string) {
    window.open(url);
  }

  function getHttpResponseType(statusCode: number) {
    if (statusCode >= 100 && statusCode <= 199) {
      return HTTP_RESPONSE_TYPE.INFORMATIONAL;
    } else if (statusCode >= 200 && statusCode <= 299) {
      return HTTP_RESPONSE_TYPE.SUCCESSFUL;
    } else if (statusCode >= 300 && statusCode <= 399) {
      return HTTP_RESPONSE_TYPE.REDIRECTION;
    } else if (statusCode >= 400 && statusCode <= 499) {
      return HTTP_RESPONSE_TYPE.CLIENT_ERROR;
    } else if (statusCode >= 500 && statusCode <= 599) {
      return HTTP_RESPONSE_TYPE.SERVER_ERROR;
    } else {
      return HTTP_RESPONSE_TYPE.UNKNOWN;
    }
  }

  if (!selectedApi) return;

  return (
    <div className='apiContainer'>
      <div className="title">
        <h2>{selectedApi.name}</h2>
        <small onClick={() => handleClickURL(returnFullURL(selectedApi))}>{returnFullURL(selectedApi)}</small>
      </div>

      {(currentStatus != null || currentResponseTime != null) && <div className="apiData">
        {currentResponseTime != null &&
        <InlineDropDown
          name={<>
            <span className="bold">Current Response Time:</span> {currentResponseTime}ms
          </>}>
          <ResponseTimeChart />
        </InlineDropDown>}

        {currentStatus != null && 
        <InlineDropDown
          name={<>
            <span className="bold">Current Status:</span> {getHttpResponseType(currentStatus)}
          </>}
        >
          <h3>hello, world!</h3>
        </InlineDropDown>}
      </div>}

      {(currentStatus == null &&currentResponseTime == null) && <div className="message">
        There's no data for this API yet.  
      </div>}

      <PlayPauseButton />
    </div>
  );
}