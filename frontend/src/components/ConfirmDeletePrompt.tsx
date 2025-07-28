import { toast } from "react-toastify";
import { deleteApi, fetchApiList } from "../api";
import { Popup, useAppContext } from "../hooks/useAppContext";
import BlackScreen from "./BlackScreen";
import './ConfirmDeletePrompt.css';

export default function ConfirmDeletePrompt() {
  const { setLoading, setCurrentPopup, apiList, setDropDownSelected, dropDownSelected, setSelectedApi, setApiList } = useAppContext();

  function handleNo() {
    setCurrentPopup(Popup.NONE);
  }
  
  async function handleYes() {
    if (dropDownSelected == null) return;
    if (!apiList[dropDownSelected]) return;

    setLoading(true);
    const success = await deleteApi(apiList[dropDownSelected].id!);
    setLoading(false);

    if (success) {
      toast.success('API deleted successfully!');
      setSelectedApi(null);
      setDropDownSelected(null);
      setCurrentPopup(Popup.NONE);
    } else {
      toast.error('There was an error while removing the API!');
    }

    try {
      setLoading(true);
      const list = await fetchApiList();
      setApiList(list);
    } catch (error: any) {
      const message = error.response?.data?.message || "There was an error!";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <BlackScreen>
      <div className="confirmDeleteWindow">
        <h2>Are you sure you want to delete this API?</h2>
        <div className="buttonGroup">
          <button onClick={handleNo} className="no">No</button>
          <button onClick={handleYes} className="yes">Yes</button>
        </div>
      </div>
    </BlackScreen>
  );
}