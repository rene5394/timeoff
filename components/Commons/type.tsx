import React from "react";
import { diffrenceBetweenDates, diffrenceBetweenDatesNoWeekends } from "../../common/utils/timeValidation";
import { findOneType } from "../../lib/api/timeoff/type";
import { IType } from "../../lib/domain/timeoff/IType";


export const countDaysbyType = (TypeId: number, startDate: Date, endDate: Date) => {
  const daysBetween = TypeId == 1 ? (
    diffrenceBetweenDatesNoWeekends(startDate,endDate)
  ):(
    diffrenceBetweenDates(startDate,endDate)
  );
  return daysBetween;
}