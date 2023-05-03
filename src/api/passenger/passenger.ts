import { IDefaultResponse, api } from "../server";

export interface IPassenger {
  id?: string;
  cpf: string;
  passaport: string;
  country: string;
  name: string;
  surname: string;
  password: string;
  miles: number;
}

export const passengersApi = {
  getPassengers: async (): Promise<IDefaultResponse<IPassenger[]>> => {
    try{
      const response = await api.get("/passengers");
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  getPassenger: async (id: string): Promise<IDefaultResponse<IPassenger>> => {
    try{
      const response = await api.get(`/passengers/${id}`);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  updatePassenger: async (id: string, passenger: IPassenger): Promise<IDefaultResponse<boolean>> => {
    try{
      const response = await api.put(`/passengers/${id}`, passenger);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  deletePassenger: async (id: string): Promise<IDefaultResponse<boolean>> => {
    try{
      const response = await api.delete(`/passengers/${id}`);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  createPassenger: async (passenger: IPassenger): Promise<IDefaultResponse<IPassenger>> => {
    try{
      const response = await api.post("/passengers", passenger);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
}
