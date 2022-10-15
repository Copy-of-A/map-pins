import { configureStore } from '@reduxjs/toolkit'
import balloonReducer from './components/MapContainer/components/Balloon/models/balloons.slice'
import currentBalloonReducer from './components/MapContainer/components/Balloon/models/currentBalloon.slice'
import sidebarReducer from './components/SideBar/sidebar.slice'

export const store = configureStore({
  reducer: {
    balloons: balloonReducer,
    currentBalloon: currentBalloonReducer,
    sidebar: sidebarReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch