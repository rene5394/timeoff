export interface IBalanceTransaction {
  id: number;
  balanceId: number;
  typeId: number;
  operation: number;
  amount: number;
  updatedBy: number;
  createdAt: Date;
  updatedAt: Date;
}