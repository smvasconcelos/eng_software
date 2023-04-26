import { IDefaultResponse, api } from "../server";

export interface IAirports {
  icao?: string;
  name: string;
  location: number[];
  altitude: number;
  id?: string;
}

export const airportApi = {
  getAirports: async (): Promise<IDefaultResponse<IAirports[]>> => {
    try{
      const response = await api.get("/airports");
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  getAirport: async (id: string): Promise<IDefaultResponse<IAirports>> => {
    try{
      const response = await api.get(`/airports/${id}`);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  updateAirport: async (id: string, Airport: IAirports): Promise<IDefaultResponse<boolean>> => {
    try{
      const response = await api.put(`/airports/${id}`, Airport);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  deleteAirport: async (id: string): Promise<IDefaultResponse<boolean>> => {
    try{
      const response = await api.delete(`/airports/${id}`);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  createAirport: async (Airport: IAirports): Promise<IDefaultResponse<IAirports>> => {
    try{
      const response = await api.post("/airports", Airport);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
}
