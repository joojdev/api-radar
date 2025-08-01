import SidePanel from "./SidePanel";
import { useAppContext } from "../hooks/useAppContext";
import type { Api } from "../api";
import ApiListElement from "./ApiListElement";

export default function ListSidePanel() {
  const { apiList } = useAppContext();

  return (
    <SidePanel>
      <ul className="apiList">
        {apiList.map((api: Api, index: number) => (
          <ApiListElement index={index} key={index} api={api} />
        ))}
      </ul>
    </SidePanel>
  );
}
