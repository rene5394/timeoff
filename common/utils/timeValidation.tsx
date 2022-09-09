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
  return ((newEndDate.getTime() - newStartDate.getTime()) / 86400000) + 1;
}
  
export function diffrenceBetweenDatesNoWeekends(startDate: Date, endDate: Date) {
  var newStartDate = new Date(startDate);
  var newEndDate = new Date(endDate);
  let weekdays = 0;
  const copyStartDate = new Date(newStartDate.getTime());

  while (newEndDate >= copyStartDate) {
    if (copyStartDate.getDay() !== 5 && copyStartDate.getDay() !== 6) {
      weekdays++;
  }

  copyStartDate.setDate(copyStartDate.getDate() + 1);
}

  return weekdays;
}

export function getCurrentDate(separator=''){

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  
  return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
}