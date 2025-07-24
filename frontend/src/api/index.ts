import axios from 'axios';

export enum ProtocolEnum {
  HTTP = 'http',
  HTTPS = 'https'
};

export type Protocol = ProtocolEnum | undefined;

export type Api = {
  id: number;
  protocol: string;
  domain: string;
  endpoint: string;
  accessInterval: number;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000
});

export const fetchApiList = async (): Promise<Api[]> => {
  const response = await api.get<Api[]>('/apis');
  return response.data;
};