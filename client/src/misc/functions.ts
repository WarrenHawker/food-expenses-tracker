import { Expense } from './interfaces';

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

//prettier-ignore
const dateToWordString = (date: Date | undefined, includeDay:boolean = true): string => {
  if (!date) {
    return '';
  }
  let day: string;
  if (date.getDate() == 1 || date.getDate() == 21 || date.getDate() == 31) {
    day = `${date.getDate().toString()}st`;
  } else if (date.getDate() == 2 || date.getDate() == 22) {
    day = `${date.getDate().toString()}nd`;
  } else if (date.getDate() == 3 || date.getDate() == 23) {
    day = `${date.getDate().toString()}rd`;
  } else {
    day = `${date.getDate().toString()}th`;
  }
  const month = getMonthName(date.getMonth());
  const year = date.getFullYear()
  let weekDay = '';
  if(includeDay) {
    weekDay = getWeekDay(date.getDay())
    return `${weekDay} ${day} ${month} ${year}`
  } else {
    return `${day} ${month} ${year}`
  }
};

const getWeekDay = (day: number): string => {
  switch (day) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return '';
  }
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

const resetTimeZero = (date: Date): Date => {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

const resetTimeEnd = (date: Date): Date => {
  date.setHours(24);
  date.setMinutes(59);
  date.setSeconds(59);
  date.setMilliseconds(0);
  return date;
};

//prettier-ignore
const getSelectedExpenses = (expenses: Expense[], dateBegin: Date, dateEnd: Date): Expense[] => {
  const newWeeklyExpenses = expenses.filter((item) => {
    const date = new Date(item.date!);
    return (
      date.getTime() >= dateBegin.getTime() &&
      date.getTime() <= dateEnd.getTime()
    );
  });
  return newWeeklyExpenses;
};

const getMoneySpent = (expenses: Expense[]): number => {
  return expenses
    .map((item) => {
      return parseFloat(item.amount);
    })
    .reduce((next, number) => {
      return next + number;
    }, 0);
};

const calcRemainingBudget = (budget: number, moneySpent: number): number => {
  if (moneySpent > budget) {
    //prettier-ignore
    return Math.abs(budget-moneySpent);
  } else return budget - moneySpent;
};

const getLastDayOfMonth = (month: number): number => {
  const dayMonth30 = [3, 5, 8, 10];
  const dayMonth31 = [0, 2, 4, 6, 7, 9, 11];
  dayMonth30.forEach((item) => {
    if (item == month) {
      return 30;
    }
  });
  dayMonth31.forEach((item) => {
    if (item == month) {
      return 31;
    }
  });

  return 28;
};

export {
  dateToString,
  getMonthName,
  getWeekBeginning,
  resetTimeZero,
  resetTimeEnd,
  getSelectedExpenses,
  getMoneySpent,
  dateToWordString,
  calcRemainingBudget,
  getLastDayOfMonth,
};
