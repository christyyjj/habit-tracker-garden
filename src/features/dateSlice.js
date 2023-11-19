import { createSlice } from "@reduxjs/toolkit"
import { NEXTWEEK, calendar } from "../constants"

const firstMonday = calendar.findIndex((d) => d.day === "Mon")

const initialState = {
    dates: calendar.slice(firstMonday, firstMonday + 7),
}

const dateSlice = createSlice({
    name: "dates",
    initialState,
    reducers: {
        setDateRange: (state, action) => {
            if (action.payload === NEXTWEEK) {
                const lastDateIndex = calendar.findIndex(d => d.date === state.dates[state.dates.length - 1].date);
                const nextWeek = calendar.slice(lastDateIndex + 1, lastDateIndex + 8);
                state.dates = nextWeek;
            } else {
                const firstDateIndex = calendar.findIndex(d => d.date === state.dates[0].date);
                const prevWeek = calendar.slice(firstDateIndex - 7, firstDateIndex);
                state.dates = prevWeek;
            }
        },
    }
})

export const { setDateRange } = dateSlice.actions

export default dateSlice.reducer