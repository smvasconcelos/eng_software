import { IPlanes } from "api/planes/planes";

export interface ICreateModalProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  visible: boolean;
  callback: (data: IPlanes) => void
}
