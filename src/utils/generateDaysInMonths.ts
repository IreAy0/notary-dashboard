function getAllDaysInMonth(year, month) {
  const date:any = new Date(year, month, 1);
  
  const dates:any = [];
  
  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  
  return dates;
}

export default getAllDaysInMonth;
