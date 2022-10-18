import { combineReducers, configureStore } from '@reduxjs/toolkit'
import balloonReducer from './features/balloons.slice'
import currentBalloonReducer from './features/currentBalloon.slice'
import sidebarReducer from './features/sidebar.slice'
import storage from 'redux-persist/lib/storage'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['sidebar', 'currentBalloon'],
}

export const rootReducers = combineReducers({
  balloons: balloonReducer,
  currentBalloon: currentBalloonReducer,
  sidebar: sidebarReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch