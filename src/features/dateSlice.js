import { createSlice } from "@reduxjs/toolkit"
import { NEXTWEEK, PREVWEEK, calendar } from "../constants"

const getPrevWeek = (date) => {
    const dateIndex = calendar.findIndex(d => d.date === date)
    const prevWeek = calendar.slice(dateIndex - 7, dateIndex)
    return prevWeek
}

const getNextWeek = (date) => {
    const dateIndex = calendar.findIndex(d => d.date === date)
    const nextWeek = calendar.slice(dateIndex + 1, dateIndex + 8)
    return nextWeek
}

const firstMonday = calendar.findIndex((d) => d.day === "Mon")

const initialState = {
    dates: calendar.slice(firstMonday, firstMonday + 7),
}

const dateSlice = createSlice({
    name: "dates",
    initialState,
    reducers: {
        setDateRange: (state, action) => {
            switch (action.payload) {
                case NEXTWEEK:
                    state.dates = getNextWeek(state.dates[state.dates.length - 1].date)
                    break
                case PREVWEEK:
                    state.dates = getPrevWeek(state.dates[0].date)
                    break
            }
        },
    }
})

export const { setDateRange } = dateSlice.actions

export { getNextWeek, getPrevWeek }

export default dateSlice.reducer