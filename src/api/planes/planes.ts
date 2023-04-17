import { IModels } from "api/models/models";
import { IDefaultResponse, api } from "../server";

export interface IPlanes {
  registration?: string;
  model: IModels;
  manufacturingDate: string;
}

export const planesApi = {
  getPlanes: async (): Promise<IDefaultResponse<IPlanes[]>> => {
    try{
      const response = await api.get("/planes");
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  getPlane: async (id: string): Promise<IDefaultResponse<IPlanes>> => {
    try{
      const response = await api.get(`/planes/${id}`);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  updatePlane: async (id: string, plane: IPlanes): Promise<IDefaultResponse<boolean>> => {
      try{
      const response = await api.put(`/planes/${id}`, plane);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      console.log(e);
      return {data: null, status: false};
    }
  },
  deletePlane: async (registration: string): Promise<IDefaultResponse<boolean>> => {
    try{
      const response = await api.delete(`/planes/${registration}`);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  createPlane: async (plane: IPlanes): Promise<IDefaultResponse<boolean>> => {
    try{
      const response = await api.post("/planes", plane);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
}
