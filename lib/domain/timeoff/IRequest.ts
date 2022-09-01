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
  createdAt: Date;
  updatedAt: Date;
}
