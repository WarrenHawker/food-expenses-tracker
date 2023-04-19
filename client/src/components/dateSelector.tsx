import { getMonthName, dateToString } from '../misc/functions';
import { DateSelectorProps } from '../misc/interfaces';

//prettier-ignore
function DateSelector({ currentWeek, currentMonth, changeWeek }: DateSelectorProps) {
  return (
    <>
      <h3>{getMonthName(currentMonth)}</h3>
      <button onClick={() => changeWeek('prev')}>Prev</button>
      <p>
        {`${dateToString(currentWeek.weekBeginning)} - ${dateToString(
          currentWeek.weekEnding
        )}`}
      </p>
      <button onClick={() => changeWeek('next')}>Next</button>
    </>
  );
}

export default DateSelector;
