const generateCurrentMonth = () => {
  const monthNames = ['January', 'February', 'March', 
    'April', 'May', 'June', 'July', 
    'August', 'September', 'October', 'November', 'December'];

  const currentDate = new Date();
  const n = monthNames[currentDate.getMonth()]; 
  
  return Number(monthNames.indexOf(n) + 1);

}

export default generateCurrentMonth;


