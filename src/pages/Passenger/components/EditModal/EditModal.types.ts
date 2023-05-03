import { IPassenger } from "api/passenger/passenger";

export interface IEditModalProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  visible: boolean;
  callback: (data: IPassenger) => void;
  passenger: IPassenger;
}
