import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getLogs, ProtocolEnum, type Api, type Log } from "../api";
import { useAppContext } from "../hooks/useAppContext";
import DropDownMenu from "./DropDownMenu";

export default function ApiListElement({
  api,
  index,
}: {
  api: Api;
  index: number;
}) {
  const {
    setSelectedApi,
    selectedApi,
    dropDownSelected,
    setDropDownSelected,
    setCurrentLogList,
    socket,
  } = useAppContext();

  function checkIfApiIsSelected() {
    return JSON.stringify(selectedApi) == JSON.stringify(api);
  }

  async function handleClick() {
    if (checkIfApiIsSelected()) {
      socket?.emit("leaveRoom");
      return setSelectedApi(null);
    }
    setSelectedApi(api);

    const logs: Log[] = await getLogs(api);

    setCurrentLogList(logs);

    socket?.emit("joinRoom", `api_${api.id}`);
  }

  function handleDropdownClick(event: React.MouseEvent) {
    event.stopPropagation();
    setDropDownSelected(index);
  }

  return (
    <div className="wrapper">
      <li
        onClick={handleClick}
        className={checkIfApiIsSelected() ? "selected" : ""}
      >
        {api.protocol == ProtocolEnum.HTTP ? (
          <FontAwesomeIcon icon={["facr", "triangle-exclamation"]} />
        ) : api.protocol == ProtocolEnum.HTTPS ? (
          <FontAwesomeIcon icon={["facr", "lock"]} />
        ) : (
          ""
        )}
        <div className="liContent">{api.name}</div>
      </li>
      <button onClick={handleDropdownClick}>
        <FontAwesomeIcon icon="ellipsis" />
      </button>
      {dropDownSelected == index && <DropDownMenu />}
    </div>
  );
}
