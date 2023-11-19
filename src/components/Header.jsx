import { useDispatch, useSelector } from "react-redux"
import { NEXTWEEK, PREVWEEK } from "../constants"
import { setDateRange } from "../features/dateSlice"

export default function Header({ view, toggleView }) {
  const dispatch = useDispatch()
  const { dates } = useSelector(state => state.dates)

  // const [date1, month1, year1] = dateRange[0].date.split(' ')
  // const [date2, month2, year2] = dateRange[6].date.split(' ')

  const switchWeek = (action) => dispatch(setDateRange(action))
 
  return(
    <nav className="header">
      <p className="header__name">Habit Tracker Garden</p>
      <button onClick={() => switchWeek(PREVWEEK)}>Back</button>
      <p className="header__date">
        {/* {`${month1} ${date1} ${year1} - ${month2} ${date2} ${year2}`} */}
        {dates[0].date} - {dates[6].date}
      </p>
      <button onClick={() => switchWeek(NEXTWEEK)}>Next</button>
      <button className="header__view-toggle" onClick={() => toggleView()}>{view}</button>
    </nav>
  )
}