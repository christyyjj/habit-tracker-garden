import { useSelector } from "react-redux"
import { FLOWERING, growth } from "../constants"
import Emoji from "./Emoji"
import { useState } from "react"
import HabitDetails from "./HabitDetails"

export default function Garden() {
    const [detailShow, setDetailShow] = useState(false)
    const [selectedHabit, setSelectedHabit] = useState(null)

    const { habits } = useSelector(state => state.habits)

    const showDetailModal = (habit) => {
        setSelectedHabit(habit)
        setDetailShow(true)
    }

    const hideDetailModal = () => {
        setSelectedHabit(null)
        setDetailShow(false)
    }
    
    return(
        <div className="garden">
            <div className="garden__grid">
                { habits.map((habit, index) => {
                    const stage = growth[habit.plant.stage].stage
                    const emoji = 
                        habit.plant.stage === FLOWERING 
                            ? growth[habit.plant.stage].emoji[habit.plant.basis] 
                            : growth[habit.plant.stage].emoji

                    return (
                        <Emoji  
                            key={index} 
                            label={stage} 
                            symbol={emoji} 
                            onClick={() => showDetailModal(habit)}
                        />
                    )
                })}
            </div>

            { selectedHabit && 
                <HabitDetails 
                    show={detailShow} 
                    onHide={hideDetailModal}
                    habit={selectedHabit}
                />
            }
        </div>
    )
}