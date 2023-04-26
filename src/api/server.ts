import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:3000",
  timeout: 1000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

export interface IDefaultResponse<T> {
  data?:T | null;
  status: boolean;
}
