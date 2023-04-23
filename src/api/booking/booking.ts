import { IFlights } from "api/flights/flights";
import { IDefaultResponse, api } from "../server";
import { IPilots } from "api/pilots/pilots";

export interface IBooking {
  id?: string;
  flight: IFlights;
  pilot: IPilots;
  date: string;
}

export const bookingApi = {
  getBookings: async (): Promise<IDefaultResponse<IBooking[]>> => {
    try{
      const response = await api.get("/booking");
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  getBooking: async (id: string): Promise<IDefaultResponse<IBooking>> => {
    try{
      const response = await api.get(`/booking/${id}`);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  updateBooking: async (id: string, Booking: IBooking): Promise<IDefaultResponse<boolean>> => {
    try{
      const response = await api.put(`/booking/${id}`, Booking);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  deleteBooking: async (id: string): Promise<IDefaultResponse<boolean>> => {
    try{
      const response = await api.delete(`/booking/${id}`);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
  createBooking: async (Booking: IBooking): Promise<IDefaultResponse<IBooking>> => {
    try{
      const response = await api.post("/booking", Booking);
      const {data, status} = response;
      return {data, status: status === 200};
    }catch(e){
      return {data: null, status: false};
    }
  },
}
