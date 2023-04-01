import { api } from "../server";

export interface IPilots {
  id: string;
  name: string;
  password: string;
  planes: string | string[];
}

export const pilotsApi = {
  getPilots: async (): Promise<IPilots[]> => {
    return (await api.get("/pilots")).data;
  },
}
