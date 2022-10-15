import { configureStore } from '@reduxjs/toolkit'
import balloonReducer from '../components/MapContainer/components/Balloon/models/balloons.slice'

export const store = configureStore({
  reducer: {
    baloons: balloonReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch