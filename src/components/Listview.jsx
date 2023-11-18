// map calendar dates to render day cells (7-days starting from Monday)
// find the first date with Monday as the day
// slice the calendar array from that index to get the first 7 days
// remove remaining dates by removing calendar array.length % 7 (remainder) from the end of the array

import { useDispatch, useSelector } from "react-redux"
import { dates } from "../constants"
import { toggleStatus } from "../features/habitSlice"

// for each 7 days, render a day cell with the date and day of the week
// by default, current week of today's date is rendered
// if user switch to prev week, render calendar array[current date index - 7] to array[current date index - 1
// if user switch to next week, render calendar array[current date index + 1] to array[current date index + 7]
// check if current date index is the first or last index of the calendar array
// if so, disable prev or next button
export default function Listview() {
    const dispatch = useDispatch()
    const { habits } = useSelector(state => state.habits)

    const statusHandler = (title, date) => {
        dispatch(toggleStatus({title, date}))
    }

    return (
        <div className="listview">
            <button>New Habit</button>
            <table className="habit-table">
                <thead>
                    <tr>
                        <th>Habits</th>
                        {
                            dates.map((date, index) => {
                                const month = new Date(date.date).getMonth() + 1
                                const day = new Date(date.date).getDate()
                                return <th key={index}>{date.day} {day}/{month}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    { 
                        habits.map((habit, habitIdx) => (
                            <tr key={habitIdx}>
                                <td className="habit-title">
                                    {habit.title}
                                    {habit.points}
                                </td>
                                {
                                    dates.map((date, dateIdx) => (
                                        <td key={dateIdx} className="habit-cells" onClick={() => statusHandler(habit.title, date.date)}>
                                            {habit.checkins.includes(date.date) ? "/" : ""}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}