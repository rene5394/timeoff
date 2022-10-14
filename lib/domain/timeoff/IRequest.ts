import { ITransaction } from "./ITransaction";

export interface IRequest {
  id: number;
  userId: number;
  createdBy: number;
  typeId: number;
  statusId: number;
  amount: number;
  startDate: Date;
  endDate: Date;
  coachApproval: number;
  hrApproval: number;
  transactions: ITransaction[];
  createdAt: Date;
  updatedAt: Date;
}
