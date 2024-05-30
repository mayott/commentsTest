import { configureStore } from '@reduxjs/toolkit'
import commentsReducer from './commentsSlice.js'

const store = configureStore({
  reducer: {
    comments: commentsReducer,
  },
})

export default store
