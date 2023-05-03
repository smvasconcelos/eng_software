import { IPassenger } from "api/passenger/passenger";

export interface ICreateModalProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  visible: boolean;
  callback: (data: IPassenger) => void
}
