import { IAirports } from "api/airports/airports";

export interface ICreateModalProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  visible: boolean;
  callback: (data: IAirports) => void
}
