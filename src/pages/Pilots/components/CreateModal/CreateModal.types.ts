import { IPilots } from "api/pilots/pilots";

export interface ICreateModalProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  visible: boolean;
  callback: (data: IPilots) => void
}
