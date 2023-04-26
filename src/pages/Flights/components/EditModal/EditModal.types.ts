import { IFlights } from "api/flights/flights";

export interface IEditModalProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  visible: boolean;
  callback: (data: IFlights) => void;
  flights: IFlights;
}
