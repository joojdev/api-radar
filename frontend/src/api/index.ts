import axios from "axios";
import { z } from "zod";

export enum ProtocolEnum {
  HTTP = "http",
  HTTPS = "https",
}

export type Protocol = ProtocolEnum | null;

const ApiSchema = z.object({
  id: z.uuidv4().optional(),
  name: z.string().nonempty(),
  protocol: z.enum(ProtocolEnum),
  domain: z
    .string()
    .regex(
      /^(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/,
      "Must be a valid domain.",
    ),
  endpoint: z
    .string()
    .regex(
      /^\/[A-Za-z0-9_\-.\/]*$/,
      "Endpoint must start with '/' and contain only letters, numbers, '-', '.', '_' or '/'.",
    ),
  accessInterval: z.coerce.number(),
  running: z.boolean(),
});

export type Api = z.infer<typeof ApiSchema>;

const LogSchema = z.object({
  id: z.uuidv4(),
  statusCode: z.number(),
  responseTime: z.number(),
  timestamp: z.coerce.date(),
  apiId: z.uuidv4(),
});

export type Log = z.infer<typeof LogSchema>;

export const CreateApiSchema = z.object({
  name: z.string().nonempty(),
  protocol: z.enum(ProtocolEnum),
  domain: z
    .string()
    .regex(
      /^(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/,
      "Must be a valid domain.",
    ),
  endpoint: z
    .string()
    .regex(
      /^\/[A-Za-z0-9_\-.\/]*$/,
      "Endpoint must start with '/' and contain only letters, numbers, '-', '.', '_' or '/'.",
    ),
  accessInterval: z.coerce.number(),
});

export type CreateApiInput = z.infer<typeof CreateApiSchema>;

export const EditApiSchema = z.object({
  id: z.uuidv4(),
  name: z.string().nonempty(),
  protocol: z.enum(ProtocolEnum),
  domain: z
    .string()
    .regex(
      /^(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/,
      "Must be a valid domain.",
    ),
  endpoint: z
    .string()
    .regex(
      /^\/[A-Za-z0-9_\-.\/]*$/,
      "Endpoint must start with '/' and contain only letters, numbers, '-', '.', '_' or '/'.",
    ),
  accessInterval: z.coerce.number(),
});

export type EditApiInput = z.infer<typeof EditApiSchema>;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
});

export const fetchApiList = async (): Promise<Api[]> => {
  const response = await api.get<Api[]>("/apis");
  return response.data;
};

export const createApi = async (apiData: CreateApiInput): Promise<Api> => {
  const response = await api.post<Api>("/api", apiData);
  return response.data;
};

export const deleteApi = async (apiId: string): Promise<boolean> => {
  try {
    await api.delete<boolean>(`/api/${apiId}`);
    return true;
  } catch (error) {
    return false;
  }
};

export const editApi = async (apiData: EditApiInput): Promise<Api> => {
  const response = await api.put<Api>("/api", apiData);
  return response.data;
};

export const turnOffApi = async (apiData: Api): Promise<boolean> => {
  try {
    await api.post<Api>(`/api/off/${apiData.id}`);
    return true;
  } catch (error) {
    return false;
  }
};

export const turnOnApi = async (apiData: Api): Promise<boolean> => {
  try {
    await api.post<Api>(`/api/on/${apiData.id}`);
    return true;
  } catch (error) {
    return false;
  }
};

// export const getLastLog = async (apiData: Api): Promise<Log | null> => {
//   try {
//     const response = await api.get(`/log/last/${apiData.id}`);
//     return response.data;
//   } catch (error) {
//     return null;
//   }
// };

export const getLogs = async (apiData: Api): Promise<Log[]> => {
  try {
    const response = await api.get(`/logs/${apiData.id}`);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const getLastLogs = async (
  apiData: Api,
  lastTimestamp: number,
): Promise<Log[]> => {
  try {
    const response = await api.get(
      `/logs/since/${apiData.id}/${lastTimestamp}`,
    );
    return response.data;
  } catch (error) {
    return [];
  }
};
