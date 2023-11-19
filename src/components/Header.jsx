import { useDispatch, useSelector } from "react-redux"
import { GARDEN, LISTVIEW, NEXTWEEK, PREVWEEK } from "../constants"
import { getNextWeek, getPrevWeek, setDateRange } from "../features/dateSlice"

export default function Header({ view, toggleView }) {
  const dispatch = useDispatch()
  const { dates } = useSelector(state => state.dates)

  // const [date1, month1, year1] = dateRange[0].date.split(' ')
  // const [date2, month2, year2] = dateRange[6].date.split(' ')

  const noMorePrevDates = (date) => getPrevWeek(date).length < 7
  const noMoreNextDates = (date) => getNextWeek(date).length < 7
  const switchWeek = (action) => dispatch(setDateRange(action))
 
  return(
    <nav className="header">
      <p className="header__name">Habit Tracker Garden</p>
      <button onClick={() => switchWeek(PREVWEEK)} disabled={noMorePrevDates(dates[0].date)}>
        Back
      </button>
      <p className="header__date">
        {/* {`${month1} ${date1} ${year1} - ${month2} ${date2} ${year2}`} */}
        {dates[0].date} - {dates[6].date}
      </p>
      <button onClick={() => switchWeek(NEXTWEEK)} disabled={noMoreNextDates(dates[6].date)}>
        Next
      </button>
      <button className="header__view-toggle" onClick={() => toggleView()}>
        {view === LISTVIEW ? GARDEN : LISTVIEW}
      </button>
    </nav>
  )
}