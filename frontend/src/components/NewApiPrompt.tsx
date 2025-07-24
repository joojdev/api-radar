import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlackScreen from "./BlackScreen";
import './NewApiPrompt.css';
import { useAppContext, Popup } from "../hooks/useAppContext";
import { useState } from "react";
import { ProtocolEnum, type Protocol } from "../api";
import { z } from 'zod';

const CreateApiSchema = z.object({
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

type CreateApiInput = z.infer<typeof CreateApiSchema>;

export default function NewApiPrompt() {
  const { setCurrentPopup } = useAppContext();
  const [protocol, setProtocol] = useState<Protocol>(undefined);
  const [domain, setDomain] = useState<string>('');
  const [endpoint, setEndpoint] = useState<string>('');
  const [accessInterval, setAccessInterval] = useState<number>(5);
  const [errors, setErrors] = useState<Partial<Record<keyof CreateApiInput, string>>>({});

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const data = { protocol, domain, endpoint, accessInterval };
    const result = CreateApiSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof CreateApiInput, string>> = {};
      result.error.issues.forEach((error) => {
        const key = error.path[0] as keyof CreateApiInput;
        fieldErrors[key] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    handleClose();
  }

  function handleClose() {
    setCurrentPopup(Popup.NONE);
  }
  
  return (
    <BlackScreen>
      <form className='newApiForm' onSubmit={handleSubmit}>
        <h2>New API</h2>

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
          <input type="text" id="endpoint" value={endpoint} onChange={(event) => setEndpoint(event.target.value)} autoComplete="off" placeholder="/api/posts" />
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

        <button type="submit" className="submitButton">Create</button>
        <button type="button" className="closeButton" onClick={handleClose}><FontAwesomeIcon icon={["facr", "x"]} /></button>
      </form>
    </BlackScreen>
  );
}