export interface IBalanceTransaction {
  id: number;
  balanceId: number;
  comp_Days: number;
  typeId: number;
  operation: number;
  amount: number;
  updatedBy: number;
  createdAt: Date;
  updatedAt: Date;
}