import { IAirports } from "api/airports/airports";

export interface IEditModalProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  visible: boolean;
  callback: (data: IAirports) => void;
  airport: IAirports;
}
