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
  getPilot: async (id: string): Promise<IPilots> => {
    return (await api.get(`/pilots/${id}`)).data;
  },
  updatePilot: async (id: string, data: IPilots): Promise<boolean> => {
    return await api.put(`/pilots/${id}`, data);
  },
  deletePilot: async (id: string): Promise<boolean> => {
    return await api.delete(`/pilots/${id}`);
  },
  createPilot: async (data: IPilots): Promise<boolean> => {
    return await api.post("/pilots", data);
  },
}
