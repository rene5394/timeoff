import { differenceInBusinessDays } from "date-fns";
import Moment from 'moment';

export function daysBetweenDates(startDate: Date, endDate: Date): Date[] {
  
  let dates = [];
  var newStartDate = new Date(startDate);
  var newEndDate = new Date(endDate);
  const copyStartDate = new Date(newStartDate.getTime());
  

  while (newEndDate >= copyStartDate) {
    dates.push(copyStartDate);

    copyStartDate.setDate(copyStartDate.getDate() + 1);
  }

  return dates;
}
  
export function daysBetweenDatesNoWeekends(startDate: Date, endDate: Date): Date[] {
  let dates = [];
  const newStartDate = new Date(startDate);
  const newEndDate = new Date(endDate);
  const copyStartDate = new Date(newStartDate.getTime());
  
  while (newEndDate >= copyStartDate) {
    if (copyStartDate.getDay() !== 0 && copyStartDate.getDay() !== 6) {
      const date = new Date(copyStartDate);
      dates.push(date);
    }

    copyStartDate.setDate(copyStartDate.getDate() + 1);
  }

  return dates;
}
  
  
export function diffrenceBetweenDates(startDate: Date, endDate: Date) {
  const newStartDate = new Date(startDate);
  const newEndDate = new Date(endDate);

  return ((newEndDate.getTime() - newStartDate.getTime()) / (1000*60*60*24)) + 1;
}
  
export function diffrenceBetweenDatesNoWeekends(startDate: Date, endDate: Date) {
  const newStartDate = new Date(startDate);
  const newEndDate = new Date(endDate);

  return differenceInBusinessDays(newEndDate,newStartDate) + 1;
}

export function getCurrentDate(separator = ''){

  const newDate = new Date()
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  
  return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
}

export function getFirstDayOfMonth(): string {
  const date = new Date();
  const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);

  return Moment(firstDate).format('YYYY-MM-DD');
}

export function getLastDayOfMonth(): string {
  const date = new Date();
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return Moment(lastDay).format('YYYY-MM-DD');
}