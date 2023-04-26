import { IFlights } from "api/flights/flights";

export interface ICreateModalProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  visible: boolean;
  callback: (data: IFlights) => void
}
