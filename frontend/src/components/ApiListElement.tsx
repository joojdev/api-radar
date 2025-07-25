import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProtocolEnum, type Api } from "../api";
import { useAppContext } from "../hooks/useAppContext";

export default function ApiListElement({ api }: { api: Api }) {
  const { setSelectedApi, selectedApi } = useAppContext();

  return (
    <li onClick={() => setSelectedApi(api)} className={selectedApi == api ? 'selected' : ''}>{api.protocol == ProtocolEnum.HTTP ? <FontAwesomeIcon icon={['facr', 'triangle-exclamation']} /> : api.protocol == ProtocolEnum.HTTPS ? <FontAwesomeIcon icon={['facr', 'lock']} /> : ''} {api.domain}{api.endpoint != '/' && api.endpoint}</li>
  );
}