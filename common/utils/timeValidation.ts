import { differenceInBusinessDays } from "date-fns";

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
  var newStartDate = new Date(startDate);
  var newEndDate = new Date(endDate);
  const copyStartDate = new Date(newStartDate.getTime());
  while (newEndDate >= copyStartDate) {
    if (copyStartDate.getDay() !== 5 && copyStartDate.getDay() !== 6) {
      const date = new Date(copyStartDate);
      dates.push(date);
    }

    copyStartDate.setDate(copyStartDate.getDate() + 1);
  }

  return dates;
}
  
  
export function diffrenceBetweenDates(startDate: Date, endDate: Date) {
  var newStartDate = new Date(startDate);
  var newEndDate = new Date(endDate);
  return ((newEndDate.getTime() - newStartDate.getTime()) / (1000*60*60*24))+1;
}
  
export function diffrenceBetweenDatesNoWeekends(startDate: Date, endDate: Date) {
  var newStartDate = new Date(startDate);
  var newEndDate = new Date(endDate);
  return differenceInBusinessDays(newEndDate,newStartDate)+1;
}

export function getCurrentDate(separator=''){

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  
  return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
}