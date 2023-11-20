import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IoIosAdd } from "react-icons/io"
import { FaCheck } from "react-icons/fa6"
import { toggleStatus } from "../features/habitSlice"
import NewHabit from "./NewHabit"
import HabitDetails from "./HabitDetails"

export default function Listview() {
    const [modalShow, setModalShow] = useState(false)
    const [detailShow, setDetailShow] = useState(false)
    const [selectedHabit, setSelectedHabit] = useState(null)

    const dispatch = useDispatch()
    const { habits } = useSelector(state => state.habits)
    const { dates } = useSelector(state => state.dates)

    const statusHandler = (title, date) => {
        dispatch(toggleStatus({title, date}))
    }

    const showDetailModal = (habit) => {
        setSelectedHabit(habit)
        setDetailShow(true)
    }

    const hideDetailModal = () => {
        setSelectedHabit(null)
        setDetailShow(false)
    }

    return (
        <div className="listview">
            <table className="habit-table">
                <thead>
                    <tr>
                        {/* Habits */}
                        <th className="habit-list habit-list__header"></th>
                        {
                            dates.map((date, index) => {
                                // const month = new Date(date.date).getMonth() + 1
                                const day = new Date(date.date).getDate()
                                return (
                                    <th key={index} className="habit-dates__label">
                                        <p className="habit-dates__label--day">{day}</p>
                                        {date.day} 
                                    </th>
                                )
                            })
                        }
                        <th className="habit-points habit-points__header">Points</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        habits.map((habit, habitIdx) => (
                            <tr key={habitIdx}>
                                <td onClick={() => showDetailModal(habit)} className="habit-list habit-list__title">
                                    {habit.title}
                                </td>

                                {
                                    dates.map((date, dateIdx) => (
                                        <td key={dateIdx} className="habit-dates__cells" onClick={() => statusHandler(habit.title, date.date)}>
                                            {habit.checkins.includes(date.date) && <FaCheck className="habit-checkin" />}
                                        </td>
                                    ))
                                }

                                <td className="habit-list__points">{habit.points}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                selectedHabit && 
                <HabitDetails 
                    show={detailShow} 
                    onHide={hideDetailModal}
                    habit={selectedHabit}
                />
            }
            <button className="new-habit-ctrl" onClick={() => setModalShow(true)}>
                <IoIosAdd className="ctrl-btn btn--add" />
                New Habit
            </button>
            <NewHabit show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    )
}