//prettier-ignore
const dateToString = (date: Date | undefined, reversed:boolean = false): string => {
  if (!date) {
    return '';
  }
  const year: string = date.getFullYear().toString();

  let month: string;
  if (date.getMonth() < 10) {
    month = `0${date.getMonth() + 1}`;
  } else month = (date.getMonth() + 1).toString();

  let day: string;
  if (date.getDate() < 10) {
    day = `0${date.getDate()}`;
  } else day = date.getDate().toString();

  if(reversed) {
    return `${year}-${month}-${day}`;
  } else return `${day}-${month}-${year}`
 
  
};

const getMonthName = (month: number): string => {
  switch (month) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
    default:
      return '';
  }
};

const getWeekBeginning = (date: string = 'today') => {
  if (date == 'today') {
    const newDate = new Date();
    const day = newDate.getDay();

    const diff = newDate.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(newDate.setDate(diff));
  } else {
    const newDate = new Date(date);
    const day = newDate.getDay();

    const diff = newDate.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(newDate.setDate(diff));
  }
};

export { dateToString, getMonthName, getWeekBeginning };
