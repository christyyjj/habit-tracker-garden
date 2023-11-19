import { useDispatch, useSelector } from "react-redux"
import { GARDEN, LISTVIEW, NEXTWEEK, PREVWEEK } from "../constants"
import { getNextWeek, getPrevWeek, setDateRange } from "../features/dateSlice"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { PiPlant } from "react-icons/pi"
import { TbListTree } from "react-icons/tb"

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
      <h5 className="header__name">Habit Tracker Garden</h5>
      
      { view === LISTVIEW && 
        <div className="header__date-ctrl">
          <button 
            className="ctrl-btn btn--back"
            onClick={() => switchWeek(PREVWEEK)} disabled={noMorePrevDates(dates[0].date)}>
            <FaChevronLeft />
          </button>
          <p className="header__date">
            {/* {`${month1} ${date1} ${year1} - ${month2} ${date2} ${year2}`} */}
            {dates[0].date} - {dates[6].date}
          </p>
          <button 
            className="ctrl-btn btn--forward"
            onClick={() => switchWeek(NEXTWEEK)} disabled={noMoreNextDates(dates[6].date)}>
            <FaChevronRight />
          </button>
        </div>
      }
      <button className={`header__view-toggle--${view === LISTVIEW ? "listview" : "garden"}`} onClick={() => toggleView()}>
        {
          view === LISTVIEW
            ? <><PiPlant className="toggle__icon icon--garden-view" />To {GARDEN}</>
            : <><TbListTree className="toggle__icon icon--list-view" />To {LISTVIEW}</>
        }
      </button>
    </nav>
  )
}