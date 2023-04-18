import { IModels } from "api/models/models";
import { IDefaultResponse, api } from "../server";

export interface IPilots {
  id?: string;
  name: string;
  password?: string;
  abbleToFligh: IModels[];
}

export const pilotsApi = {
  getPilots: async (): Promise<IDefaultResponse<IPilots[]>> => {
    try{
      const response = await api.get("/pilots");
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  getPilot: async (id: string): Promise<IDefaultResponse<IPilots>> => {
    try{
      const response = await api.get(`/pilots/${id}`);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  updatePilot: async (id: string, pilot: IPilots): Promise<IDefaultResponse<boolean>> => {
    try{
      const response = await api.put(`/pilots/${id}`, pilot);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  deletePilot: async (id: string): Promise<IDefaultResponse<boolean>> => {
    try{
      const response = await api.delete(`/pilots/${id}`);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  createPilot: async (pilot: IPilots): Promise<IDefaultResponse<IPilots>> => {
    try{
      const response = await api.post("/pilots", pilot);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
}
