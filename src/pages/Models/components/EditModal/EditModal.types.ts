import { IModels } from "api/models/models";
import { IPlanes } from "api/planes/planes";

export interface IEditModalProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  visible: boolean;
  callback: (data: IModels) => void;
  model: IModels | undefined;
}
