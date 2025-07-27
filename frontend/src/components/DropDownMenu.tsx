import { Popup, useAppContext } from "../hooks/useAppContext";

export default function DropDownMenu() {
  const { setDropDownSelected, setCurrentPopup } = useAppContext();

  function handleClickCurtain(event: React.MouseEvent) {
    event.stopPropagation();
    setDropDownSelected(null);
  }

  function handleDropDownClick(event: React.MouseEvent) {
    event.stopPropagation();
  }

  function handleEdit() {
    setCurrentPopup(Popup.EDIT_API);
  }

  function handleDelete() {
    setCurrentPopup(Popup.DELETE_API);
  }

  return (
    <>
      <ul onClick={handleDropDownClick} className='dropDownMenu'>
        <li onClick={handleEdit}>Edit API</li>
        <li onClick={handleDelete}>Delete API</li>
      </ul>
      <div className="clickCurtain" onClick={handleClickCurtain}></div>
    </>
  );
}