import { api } from "../server";

export interface IModels {
  id: string;
  model: string;
  manufacturer: string;
}

export const modelsApi = {
  getModels: async (): Promise<IModels[]> => {
    return (await api.get("/models")).data;
  },
  getModel: async (id: string): Promise<IModels> => {
    return (await api.get(`/models/${id}`)).data;
  },
  updateModel: async (id: string, data: IModels): Promise<boolean> => {
    return await api.put(`/models/${id}`, data);
  },
  deleteModel: async (id: string): Promise<boolean> => {
    return await api.delete(`/models/${id}`);
  },
  createModel: async (data: IModels): Promise<boolean> => {
    return await api.post("/models", data);
  },
}
