import { api } from "../server";

export interface IPlanes {
  id: string;
  model: string;
  date: string;
  registration: string;
}

export const planesApi = {
  getPlanes: async (): Promise<IPlanes[]> => {
    return (await api.get("/planes")).data;
  },
  getPlane: async (id: string): Promise<IPlanes> => {
    return (await api.get(`/planes/${id}`)).data;
  },
  updatePlane: async (id: string, data: IPlanes): Promise<boolean> => {
    return await api.put(`/planes/${id}`, data);
  },
  deletePlane: async (id: string): Promise<boolean> => {
    return await api.delete(`/planes/${id}`);
  },
  createPlane: async (data: IPlanes): Promise<boolean> => {
    return await api.post("/planes", data);
  },
}
