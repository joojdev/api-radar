import { useAppContext } from "../hooks/useAppContext";

export default function ApiPage() {
  const { selectedApi } = useAppContext();

  if (!selectedApi) return;

  return (
    <>{selectedApi.protocol}://{selectedApi.domain}{selectedApi.endpoint}</>
  );
}