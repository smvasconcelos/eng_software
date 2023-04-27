import { IPlanes } from "api/planes/planes";
import { IDefaultResponse, api } from "../server";
import { IAirports } from "api/airports/airports";

export interface IFlights {
  flightNumber?: number;
  plane: IPlanes;
  source: IAirports;
  destination: IAirports;
  daysOfWeek: string[];
  times: string[];
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
  getFlight: async (id: string, origin: string, destination: string): Promise<IDefaultResponse<IFlights | IFlights[]>> => {
    try{
      var response;
      if(origin && destination){
        response = await api.get(`/flights?source=${origin}&destination=${destination}`);
      }else{
        response = await api.get(`/flights/${id}`);
      }
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  updateFlights: async (id: number, Flights: IFlights): Promise<IDefaultResponse<boolean>> => {
    try{
      const response = await api.put(`/flights/${id}`, Flights);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  deleteFlights: async (id: number): Promise<IDefaultResponse<boolean>> => {
    try{
      const response = await api.delete(`/flights/${id}`);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  createFlights: async (flights: IFlights): Promise<IDefaultResponse<IFlights>> => {
    try{
      const response = await api.post("/flights", flights);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      console.log(e);
      return {data: null, status: false};
    }
  },
}
