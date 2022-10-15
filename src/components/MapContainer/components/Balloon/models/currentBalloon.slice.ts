import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BalloonData } from "./balloons.slice";
import { v4 } from 'uuid';

const initialState: BalloonData | null = {
    coordinates: {
        lat: 55.5, lon: 37.738521
    },
    adress: "dhbvhbv",
    id: "1111",
    title: "",
    description: "",
    isActive: false,
};

export type PinData = Omit<BalloonData, "title" | "id" | "description" | "isActive">

export const currentBalloonSlice = createSlice({
    name: "currentBalloon",
    initialState,
    reducers: {
        addPinData: (state: BalloonData | null, action: PayloadAction<PinData>) => {
            const { coordinates, adress } = action.payload
            state = {
                coordinates,
                adress,
                id: v4(),
                title: "",
                description: "",
                isActive: false,
            }

        },
        resetCurrentBaloon: (state: BalloonData | null) => {
            state = null;
        },
        changeIsActive: (state: BalloonData | null) => {
            if (state) state.isActive = !state.isActive
        },
        changeTitle: (state: BalloonData | null, action: PayloadAction<string>) => {
            if (state) state.title = action.payload
        },
        changeDescription: (state: BalloonData | null, action: PayloadAction<string>) => {
            if (state) state.description = action.payload
        },
    }
})

export const { addPinData, resetCurrentBaloon, changeIsActive, changeTitle, changeDescription } = currentBalloonSlice.actions
export default currentBalloonSlice.reducer