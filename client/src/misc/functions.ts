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

export { dateToString };
