import { Popup, useAppContext } from "../hooks/useAppContext";

export default function ApiPage() {
  const { selectedApi, setCurrentPopup } = useAppContext();

  async function handleDeleteAPI() {
    setCurrentPopup(Popup.DELETE_API);
  }

  function handleEditAPI() {
    setCurrentPopup(Popup.EDIT_API);
  }

  if (!selectedApi) return;

  return (
    <div className='container'>
      {selectedApi.protocol}://{selectedApi.domain}{selectedApi.endpoint}
      <button onClick={handleDeleteAPI}>Delete API</button>
      <button onClick={handleEditAPI}>Edit API</button>
    </div>
  );
}