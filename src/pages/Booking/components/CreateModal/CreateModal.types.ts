import { IBooking } from "api/booking/booking";

export interface ICreateModalProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  visible: boolean;
  callback: (data: IBooking) => void
}
