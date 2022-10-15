import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PinData } from "./balloons.slice";

const initialState: PinData = {
    id: "0",
    coordinates: {
        lat: 55.684758,
        lon: 37.738521,
    },
    title: "",
    description: "",
    isActive: false,
    adress: ""
}

export const currentBaloonSlice = createSlice({
    name: "baloons",
    initialState,
    reducers: {
        addPinData: (state, action) => {
            state.coordinates = action.payload
        },
        changeIsActive: (state) => {
            state.isActive = !state.isActive
        },
        changeTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload
        },
        changeDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload
        },
        changeAdress: (state, action: PayloadAction<string>) => {
            state.adress = action.payload
        },
    }
})

export const { addPinData, changeIsActive, changeTitle, changeDescription, changeAdress } = currentBaloonSlice.actions
export default currentBaloonSlice.reducer