import { IPlanes } from "api/planes/planes";

export interface IEditModalProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  visible: boolean;
  callback: (data: IPlanes) => void;
  plane: IPlanes | undefined;
}
