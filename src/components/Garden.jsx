import { useSelector } from "react-redux"
import { FLOWERING, growth } from "../constants"
import Emoji from "./Emoji"

export default function Garden() {
    const { habits } = useSelector(state => state.habits)
    return(
        <div className="garden">
            <div className="garden__grid">
                {
                    habits.map((habit, index) => {
                        const stage = growth[habit.plant.stage].stage
                        const emoji = habit.plant.stage === FLOWERING ? growth[habit.plant.stage].emoji[habit.plant.basis] : growth[habit.plant.stage].emoji
                        return (
                            <div key={index} className="garden__habit">
                                <div className="garden__habit-title">{habit.title}</div>
                                <div className="garden__habit-points">{habit.points}</div>
                                <div className="garden__habit-plant">
                                    <Emoji 
                                        label={stage} 
                                        symbol={emoji} 
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}