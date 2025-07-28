import axios from 'axios';
import { z } from 'zod';

export enum ProtocolEnum {
  HTTP = 'http',
  HTTPS = 'https'
};

export type Protocol = ProtocolEnum | null;

export type Api = {
  id?: number;
  name: string;
  protocol: Protocol;
  domain: string;
  endpoint: string;
  accessInterval: number;
  running: boolean;
};

export type Log = {
  id: number;
  statusCode: number;
  responseTime: number;
  timestamp: Date;
  apiId: number;
};

export const CreateApiSchema = z.object({
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
      /^\/[A-Za-z0-9_\-.\/]*$/,
      "Endpoint must start with '/' and contain only letters, numbers, '-', '.', '_' or '/'.",
    ),
  accessInterval: z.coerce.number(),
});

export type CreateApiInput = z.infer<typeof CreateApiSchema>;

export const EditApiSchema = z.object({
  id: z.coerce.number(),
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
      /^\/[A-Za-z0-9_\-.\/]*$/,
      "Endpoint must start with '/' and contain only letters, numbers, '-', '.', '_' or '/'.",
    ),
  accessInterval: z.coerce.number(),
});

export type EditApiInput = z.infer<typeof EditApiSchema>;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000
});

export const fetchApiList = async (): Promise<Api[]> => {
  const response = await api.get<Api[]>('/apis');
  return response.data;
};

export const createApi = async (apiData: CreateApiInput): Promise<Api> => {
  const response = await api.post<Api>('/api', apiData);
  return response.data;
};

export const deleteApi = async (apiId: number): Promise<boolean> => {
  try {
    await api.delete<boolean>(`/api/${apiId}`);
    return true;
  } catch(error) {
    return false;
  }
};

export const editApi = async (apiData: EditApiInput): Promise<Api> => {
  const response = await api.put<Api>('/api', apiData);
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

export const getLastLog = async (apiData: Api): Promise<Log | null> => {
  try {
    const response = await api.get(`/log/last/${apiData.id}`);
    return response.data;
  } catch (error) {
    return null;
  }
}