import { getMonthName, dateToWordString } from '../misc/functions';
import { DateSelectorProps } from '../misc/interfaces';

//prettier-ignore
function DateSelector({ currentWeek, currentMonth, currentYear, changeDates }: DateSelectorProps) {
  return (
    <section className='date-selector'>
      <button className='btn btn-secondary' onClick={() => changeDates('prev')}>Prev</button>
      <h3>{currentWeek ? `${dateToWordString(currentWeek.weekBeginning, false)} - ${dateToWordString(
            currentWeek.weekEnding, false
          )}` : `${getMonthName(currentMonth!)} ${currentYear}` }</h3>
      <button className='btn btn-secondary' onClick={() => changeDates('next')}>Next</button>
    </section>
  )
  
}

export default DateSelector;
