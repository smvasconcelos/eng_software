import { IBooking } from "api/booking/booking";

export interface IEditModalProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  visible: boolean;
  callback: (data: IBooking) => void;
  bookings: IBooking;
}
