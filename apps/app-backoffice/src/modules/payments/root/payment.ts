import { Enrollment } from "../enrollment";

export class Payment {
  paymentId: number;
  amount: number;
  paymentDate: Date;
  paymentMethod: string;
  enrollment: Enrollment;
}
