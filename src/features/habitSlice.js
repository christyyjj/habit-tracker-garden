import { createSlice } from '@reduxjs/toolkit'
import { DAILY, basis, stages } from '../constants'

// Date Parsing
const parseDate = (dateString) => {
    const [day, month, year] = dateString.split(' ')
    return new Date(`${month} ${day} ${year}`)
}

// Find Days Apart
const getDaysApart = (prevDate, currentDate) => {
    currentDate = parseDate(currentDate)
    prevDate = parseDate(prevDate)
    return Math.floor(currentDate - prevDate) / (1000 * 60 * 60 * 24)
}

// Update Plant Stage
const updatePlantStage = (habit) => {
    const currentBasis = basis.find((b) => b.name === habit.plant.basis)
    habit.plant.stage = stages[Math.floor(habit.points / currentBasis.cycle)] ?? habit.plant.stage

    console.log(stages[Math.floor(habit.points / currentBasis.cycle)])
}

// Update Habit (Check for necessary point or stage updates)
const updateHabit = (habit, currentCheckin, point) => {
    if (habit.checkins.length > 1) {

        // Sorting for new checkins
        if (point === 1) {
            const totalCheckins = habit.checkins.length
            const recentCheckin = habit.checkins[totalCheckins - 2]

            console.log("Recent Checkin: ", recentCheckin)
            console.log("Current Checkin: ", currentCheckin)

            if (currentCheckin < recentCheckin) {
                console.log("Sorting")
                habit.checkins.sort((a, b) => getDaysApart(a, b) > 0 ? -1 : 1)
            }
        }
        
        const currentIndex = habit.checkins.indexOf(currentCheckin)
        const previousCheckin = habit.checkins[currentIndex - 1]
        const nextCheckin = habit.checkins[currentIndex + 1]
        const currentBasis = basis.find((b) => b.name === habit.plant.basis)

        if (previousCheckin && getDaysApart(previousCheckin, currentCheckin) === currentBasis.daysApart) {
            habit.points += point
        }
            
        if (nextCheckin && getDaysApart(currentCheckin, nextCheckin) === currentBasis.daysApart)
            habit.points += point

        updatePlantStage(habit)

    } else {
        habit.points += point
        habit.plant.stage = stages[0]
    }

    console.log("After Updating Points: ", habit.points)
    console.log("After Updating Stage: ", habit.plant.stage)
}

// Load habits from local storage
const data = localStorage.getItem('habits') 
    ? JSON.parse(localStorage.getItem('habits')) 
    : [
        { 
            title: "Drink 2L of water", 
            description: "Get hydrated", 
            plant: { basis: DAILY, stage: stages[0] }, 
            points: 0,
            checkins: []
        }
      ]

let habits = [...data]

const initialState = {
    habits: habits,
}

const habitSlice = createSlice({
    name: 'habits',
    initialState,
    reducers: {
        addHabit: (state, { payload }) => {
            console.log("Adding Habit Reducer")
            const { title, description, basis } = payload
            const newHabit = {
                title,
                description,
                plant: { basis, stage: stages[0] },
                points: 0,
                checkins: []
            }
            state.habits = [...state.habits, newHabit]
            habits = [...habits, newHabit]
            localStorage.setItem('habits', JSON.stringify(habits))
        },
        deleteHabit: (state, { payload }) => {
            state.habits = state.habits.filter(habit => habit.title !== payload)
            habits = habits.filter(habit => habit.id !== payload)
            localStorage.setItem('habits', JSON.stringify(habits))
        },
        toggleStatus: (state, { payload }) => {
            const { title, date } = payload

            state.habits.forEach((habit) => {
                if (habit.title === title) {

                    if (habit.checkins.includes(date)) {
                        
                        updateHabit(habit, date, -1)

                        habit.checkins = habit.checkins.filter((checkin) => checkin !== date)

                        console.log("After Uncheck length: ", habit.checkins.length)
                    } else {
                        console.log("New Checkin")

                        habit.checkins = [...habit.checkins, date]

                        console.log("New checkins length: ", habit.checkins.length)

                        updateHabit(habit, date, 1)
                    }
                }
            })

            habits = state.habits
            localStorage.setItem('habits', JSON.stringify(habits))
        },
        // toggleStatus: (state, { payload }) => {
        //     const { title, date } = payload
        //     const habitIndex = state.habits.findIndex((h) => h.title === title)
        //     const habit = state.habits[habitIndex]

        //     if (habit.checkins.includes(date)) {
        //         updateHabit(habit, date, -1);
        //         habit.checkins = habit.checkins.filter((checkin) => checkin !== date)
        //     } else {
        //         habit.checkins = [...habit.checkins, date];
        //         updateHabit(habit, date, 1);
        //     }

        //     // Update Habit in State
        //     state.habits[habitIndex] = habit
        //     habits[habitIndex] = habit

        //     // Update Habit in Local Storage
        //     localStorage.setItem('habits', JSON.stringify(habits))
        // },
    }
})

export const { addHabit, deleteHabit, toggleStatus, toggleView } = habitSlice.actions

export default habitSlice.reducer