import { getMonthName, dateToString } from '../misc/functions';
import { DateSelectorProps } from '../misc/interfaces';

//prettier-ignore
function DateSelector({ currentWeek, currentMonth, nextWeek, prevWeek }: DateSelectorProps) {
  return (
    <>
      <h3>{getMonthName(currentMonth)}</h3>
      <button onClick={prevWeek}>Prev</button>
      <p>
        {`${dateToString(currentWeek.weekBeginning)} - ${dateToString(
          currentWeek.weekEnding
        )}`}
      </p>
      <button onClick={nextWeek}>Next</button>
    </>
  );
}

export default DateSelector;
