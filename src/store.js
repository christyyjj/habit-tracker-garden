import { configureStore } from '@reduxjs/toolkit'
import habitReducer from './features/habitSlice'
import dateReducer from './features/dateSlice'

const store = configureStore({
    reducer: { 
        habits: habitReducer,
        dates: dateReducer,
    }
})

export default store