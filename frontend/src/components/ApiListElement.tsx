import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProtocolEnum, type Api } from "../api";
import { useAppContext } from "../hooks/useAppContext";
import { useEffect } from "react";

export default function ApiListElement({ api }: { api: Api }) {
  const { setSelectedApi, selectedApi } = useAppContext();

  useEffect(() => {
    console.log(1, selectedApi);
    console.log(2, api);
  }, [api, selectedApi]);

  return (
    <li
      onClick={() => setSelectedApi(api)}
      className={JSON.stringify(selectedApi) == JSON.stringify(api) ? 'selected' : ''}>
        {api.protocol == ProtocolEnum.HTTP ? <FontAwesomeIcon icon={['facr', 'triangle-exclamation']} /> : api.protocol == ProtocolEnum.HTTPS ? <FontAwesomeIcon icon={['facr', 'lock']} /> : ''} {api.domain}{api.endpoint != '/' && api.endpoint}
      </li>
  );
}