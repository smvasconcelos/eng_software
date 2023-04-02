import { IPilots } from "api/pilots/pilots";

export interface IEditModalProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  visible: boolean;
  callback: (data: IPilots) => void;
  pilot?: IPilots;
}
