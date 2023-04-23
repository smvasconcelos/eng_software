import { IPlanes } from "api/planes/planes";
import { IDefaultResponse, api } from "../server";
import { IAirports } from "api/airports/airports";

export interface IFlights {
  flightNumber?: string;
  plane: IPlanes;
  source: IAirports;
  destination: IAirports;
  daysOfWeek: string[];
  time: string[];
  tileLenght: string;
}

export const flightsApi = {
  getflights: async (): Promise<IDefaultResponse<IFlights[]>> => {
    try{
      const response = await api.get("/flights");
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  getFlight: async (id: string): Promise<IDefaultResponse<IFlights>> => {
    try{
      const response = await api.get(`/flights/${id}`);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  updateFlights: async (id: string, Flights: IFlights): Promise<IDefaultResponse<boolean>> => {
    try{
      const response = await api.put(`/flights/${id}`, Flights);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  deleteFlights: async (id: string): Promise<IDefaultResponse<boolean>> => {
    try{
      const response = await api.delete(`/flights/${id}`);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  createFlights: async (Flights: IFlights): Promise<IDefaultResponse<IFlights>> => {
    try{
      const response = await api.post("/flights", Flights);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
}
