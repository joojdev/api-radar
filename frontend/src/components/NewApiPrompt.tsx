import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlackScreen from "./BlackScreen";
import "./NewApiPrompt.css";
import { useAppContext, Popup } from "../hooks/useAppContext";
import { useState } from "react";
import {
  createApi,
  CreateApiSchema,
  fetchApiList,
  ProtocolEnum,
  type CreateApiInput,
  type Protocol,
} from "../api";
import { toast } from "react-toastify";

export default function NewApiPrompt() {
  const { setCurrentPopup, setApiList } = useAppContext();
  const [name, setName] = useState<string>("");
  const [protocol, setProtocol] = useState<Protocol>(null);
  const [domain, setDomain] = useState<string>("");
  const [endpoint, setEndpoint] = useState<string>("");
  const [accessInterval, setAccessInterval] = useState<number>(5);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateApiInput, string>>
  >({});

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const data: CreateApiInput = {
      name,
      protocol: protocol as ProtocolEnum,
      domain,
      endpoint,
      accessInterval,
    };
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

    try {
      await createApi(data);
      toast.success("API created successfully!");
      setErrors({});
      handleClose();

      const list = await fetchApiList();
      setApiList(list);
    } catch (error: any) {
      const message = error.response?.data?.message || "There was an error!";
      toast.error(message);
    }
  }

  function handleClose() {
    setCurrentPopup(Popup.NONE);
  }

  return (
    <BlackScreen>
      <form className="newApiForm" onSubmit={handleSubmit}>
        <h2>New API</h2>

        <div className="formGroup">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            placeholder="Example API"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="formGroup">
          <label htmlFor="protocol">Protocol</label>
          <select
            defaultValue={protocol || ""}
            id="protocol"
            onChange={(event) => setProtocol(event.target.value as Protocol)}
          >
            <option value="">Select a protocol</option>
            <option value="http">HTTP</option>
            <option value="https">HTTPS</option>
          </select>
          {errors.protocol && <span className="error">{errors.protocol}</span>}
        </div>

        <div className="formGroup">
          <label htmlFor="domain">Domain</label>
          <input
            type="text"
            id="domain"
            value={domain}
            onChange={(event) => setDomain(event.target.value)}
            autoComplete="off"
            placeholder="example.com"
          />
          {errors.domain && <span className="error">{errors.domain}</span>}
        </div>

        <div className="formGroup">
          <label htmlFor="endpoint">Endpoint</label>
          <input
            type="text"
            id="endpoint"
            value={endpoint}
            onChange={(event) => setEndpoint(event.target.value)}
            autoComplete="off"
            placeholder="/api/health"
          />
          {errors.endpoint && <span className="error">{errors.endpoint}</span>}
        </div>

        <div className="formGroup">
          <label htmlFor="accessInterval">Access Interval</label>
          <span className="rangeInput">
            <input
              value={accessInterval}
              type="range"
              id="accessInterval"
              min="1"
              max="20"
              step="1"
              onChange={(event) =>
                setAccessInterval(parseInt(event.target.value))
              }
            />
            <span>
              {accessInterval}
              <br />
              minutes
            </span>
          </span>
          {errors.accessInterval && (
            <span className="error">{errors.accessInterval}</span>
          )}
        </div>

        <button type="submit" className="submitButton">
          Create
        </button>
        <button type="button" className="closeButton" onClick={handleClose}>
          <FontAwesomeIcon icon={["facr", "x"]} />
        </button>
      </form>
    </BlackScreen>
  );
}
