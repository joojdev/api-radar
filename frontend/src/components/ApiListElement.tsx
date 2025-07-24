import type { Api } from "../api";
import { useAppContext } from "../hooks/useAppContext";

export default function ApiListElement({ api }: { api: Api }) {
  const { setSelectedApi, selectedApi } = useAppContext();

  return (
    <li onClick={() => setSelectedApi(api)} className={selectedApi == api ? 'selected' : ''}>{api.domain}{api.endpoint != '/' && api.endpoint}</li>
  );
}