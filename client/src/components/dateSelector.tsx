import { getMonthName, dateToString } from '../misc/functions';
import { DateSelectorProps } from '../misc/interfaces';

//prettier-ignore
function DateSelector({ currentWeek, currentMonth, currentYear, changeDates }: DateSelectorProps) {
  return (
    <div className='date-selector'>
      <button onClick={() => changeDates('prev')}>Prev</button>
      <h3>{currentWeek ? `${dateToString(currentWeek.weekBeginning)} - ${dateToString(
            currentWeek.weekEnding
          )}` : `${getMonthName(currentMonth!)} ${currentYear}` }</h3>
      <button onClick={() => changeDates('next')}>Next</button>
    </div>
  )
  
}

export default DateSelector;
