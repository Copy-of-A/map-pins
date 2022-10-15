import { createSlice } from '@reduxjs/toolkit'

export interface SideBarState {
  isActive: boolean
}

const initialState: SideBarState = {
    isActive: false,
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setIsActive: (state) => {
      state.isActive = !state.isActive
    },
  },
})

export const { setIsActive} = sidebarSlice.actions
export default sidebarSlice.reducer