import { diffrenceBetweenDates, diffrenceBetweenDatesNoWeekends } from "../../common/utils/timeValidation";

export const countDaysbyType = (TypeId: number, startDate: Date, endDate: Date) => {
  const daysBetween = TypeId == 1 ? (
    diffrenceBetweenDatesNoWeekends(startDate,endDate)
  ):(
    diffrenceBetweenDates(startDate,endDate)
  );
  return daysBetween;
}