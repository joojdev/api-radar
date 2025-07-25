import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlackScreen from "./BlackScreen";
import './NewApiPrompt.css';
import { useAppContext, Popup } from "../hooks/useAppContext";
import { useState } from "react";
import { editApi, fetchApiList, ProtocolEnum, type Api, type Protocol } from "../api";
import { z } from 'zod';
import { toast } from 'react-toastify';

const EditApiSchema = z.object({
  name: z.string().nonempty(),
  protocol: z
    .enum(ProtocolEnum),
  domain: z
    .string()
    .regex(
      /^(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/,
      "Must be a valid domain."
    ),
  endpoint: z
    .string()
    .regex(
      /^\/[A-Za-z0-9_\-\/]*$/,
      "Endpoint must start with '/' and contain only letters, numbers, '-', '_' or '/'.",
    ),
  accessInterval: z.coerce.number(),
});

type EditApiInput = z.infer<typeof EditApiSchema>;

export default function EditApiPrompt() {
  const { setCurrentPopup, setApiList, selectedApi, setSelectedApi } = useAppContext();

  if (!selectedApi) return;

  const [name, setName] = useState<string>(selectedApi.name);
  const [protocol, setProtocol] = useState<Protocol>(selectedApi.protocol);
  const [domain, setDomain] = useState<string>(selectedApi.domain);
  const [endpoint, setEndpoint] = useState<string>(selectedApi.endpoint);
  const [accessInterval, setAccessInterval] = useState<number>(selectedApi?.accessInterval);
  const [errors, setErrors] = useState<Partial<Record<keyof EditApiInput, string>>>({});

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const data: Api = { id: selectedApi?.id, name, protocol, domain, endpoint, accessInterval };
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