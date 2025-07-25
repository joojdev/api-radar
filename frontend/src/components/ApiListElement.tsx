import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProtocolEnum, type Api } from "../api";
import { useAppContext } from "../hooks/useAppContext";

export default function ApiListElement({ api }: { api: Api }) {
  const { setSelectedApi, selectedApi } = useAppContext();

  function checkIfApiIsSelected() {
    return JSON.stringify(selectedApi) == JSON.stringify(api);
  }

  function handleClick() {
    if (checkIfApiIsSelected()) return setSelectedApi(null);
    setSelectedApi(api);
  }

  return (
    <li
      onClick={handleClick}
      className={checkIfApiIsSelected() ? 'selected' : ''}>
        {api.protocol == ProtocolEnum.HTTP ? <FontAwesomeIcon icon={['facr', 'triangle-exclamation']} /> : api.protocol == ProtocolEnum.HTTPS ? <FontAwesomeIcon icon={['facr', 'lock']} /> : ''} {api.name}
      </li>
  );
}