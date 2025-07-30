import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlackScreen from "./BlackScreen";
import './NewApiPrompt.css';
import { useAppContext, Popup } from "../hooks/useAppContext";
import { useState } from "react";
import { editApi, EditApiSchema, fetchApiList, ProtocolEnum, type Api, type EditApiInput, type Protocol } from "../api";
import { toast } from 'react-toastify';

export default function EditApiPrompt() {
  const { setCurrentPopup, setApiList, apiList, setSelectedApi, dropDownSelected, setDropDownSelected } = useAppContext();

  if (dropDownSelected == null) return;

  const [name, setName] = useState<string>(apiList[dropDownSelected].name);
  const [protocol, setProtocol] = useState<Protocol>(apiList[dropDownSelected].protocol);
  const [domain, setDomain] = useState<string>(apiList[dropDownSelected].domain);
  const [endpoint, setEndpoint] = useState<string>(apiList[dropDownSelected].endpoint);
  const [accessInterval, setAccessInterval] = useState<number>(apiList[dropDownSelected]?.accessInterval);
  const [errors, setErrors] = useState<Partial<Record<keyof EditApiInput, string>>>({});

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (dropDownSelected == null) return;

    const data: EditApiInput = { id: apiList[dropDownSelected].id!, name, protocol: protocol as ProtocolEnum, domain, endpoint, accessInterval };
    const result = EditApiSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof EditApiInput, string>> = {};
      result.error.issues.forEach((error) => {
        const key = error.path[0] as keyof EditApiInput;
        fieldErrors[key] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      const api: Api = await editApi(data);
      toast.success('API edited successfully!')
      setErrors({});
      setSelectedApi(api);
      setDropDownSelected(null);
      handleClose();
    } catch(error: any) {
      const message = error.response?.data?.message || 'There was an error while editing the API!';
      toast.error(message);
    }
    
    try {
      const list = await fetchApiList();
      setApiList(list);
    } catch (error: any) {
      const message = error.response?.data?.message || 'There was an error!';
      toast.error(message);
    }
  }

  function handleClose() {
    setCurrentPopup(Popup.NONE);
  }

  return (
    <BlackScreen>
      <form className='newApiForm' onSubmit={handleSubmit}>
        <h2>Edit API</h2>

        <div className="formGroup">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" autoComplete="off" placeholder="Example API" value={name} onChange={(event) => setName(event.target.value)} />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="formGroup">
          <label htmlFor="protocol">Protocol</label>
          <select defaultValue={protocol || ''} id="protocol" onChange={(event) => setProtocol(event.target.value as Protocol)}>
            <option value="">Select a protocol</option>
            <option value="http">HTTP</option>
            <option value="https">HTTPS</option>
          </select>
          {errors.protocol && <span className="error">{errors.protocol}</span>}
        </div>

        <div className="formGroup">
          <label htmlFor="domain">Domain</label>
          <input type="text" id="domain" value={domain} onChange={(event) => setDomain(event.target.value)} autoComplete="off" placeholder="example.com" />
          {errors.domain && <span className="error">{errors.domain}</span>}
        </div>

        <div className="formGroup">
          <label htmlFor="endpoint">Endpoint</label>
          <input type="text" id="endpoint" value={endpoint} onChange={(event) => setEndpoint(event.target.value)} autoComplete="off" placeholder="/api/health" />
          {errors.endpoint && <span className="error">{errors.endpoint}</span>}
        </div>

        <div className="formGroup">
          <label htmlFor="accessInterval">Access Interval</label>
          <span className='rangeInput'>
            <input value={accessInterval} type="range" id="accessInterval" min="1" max="20" step="1" onChange={(event) => setAccessInterval(parseInt(event.target.value))} />
            <span>{accessInterval}<br />minutes</span>
          </span>
          {errors.accessInterval && <span className="error">{errors.accessInterval}</span>}
        </div>

        <button type="submit" className="submitButton">Done</button>
        <button type="button" className="closeButton" onClick={handleClose}><FontAwesomeIcon icon={["facr", "x"]} /></button>
      </form>
    </BlackScreen>
  );
}