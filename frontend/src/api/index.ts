import axios from 'axios';

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

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000
});

export const fetchApiList = async (): Promise<Api[]> => {
  const response = await api.get<Api[]>('/apis');
  return response.data;
};

export const createApi = async (apiData: Api): Promise<Api> => {
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
}

export const editApi = async (apiData: Api): Promise<Api> => {
  const response = await api.put<Api>('/api', apiData);
  return response.data;
}