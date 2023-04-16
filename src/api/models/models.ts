import { IDefaultResponse, api } from "../server";

export interface IModels {
  id?: string;
  description: string;
  manufacturer: string;
}

export const modelsApi = {
  getModels: async (): Promise<IDefaultResponse<IModels[]>> => {
    try{
      const response = await api.get("/models");
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  getModel: async (id: string): Promise<IDefaultResponse<IModels>> => {
    try{
      const response = await api.get(`/models/${id}`);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  updateModel: async (id: string, model: IModels): Promise<IDefaultResponse<boolean>> => {
    try{
      const response = await api.put(`/models/${id}`, model);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  deleteModel: async (id: string): Promise<IDefaultResponse<boolean>> => {
    try{
      const response = await api.delete(`/models/${id}`);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  createModel: async (model: IModels): Promise<IDefaultResponse<IModels>> => {
    try{
      const response = await api.post("/models", model);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
}
