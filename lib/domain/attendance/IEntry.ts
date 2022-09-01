export interface IRequest {
  id: number;
  employee_id: number;
  team_id: number;
  date: Date;
  comment: string;
  user_id: number;
  attendance_status: number;
  days: number;
  update_by: number;
  paid: number;
  created_at: Date;
  updated_at: Date;
}
