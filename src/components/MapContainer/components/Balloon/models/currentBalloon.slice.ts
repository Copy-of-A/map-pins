import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BalloonData } from "./balloons.slice";
import { v4 } from 'uuid';

const initialState: BalloonData | null = null;

export type PinData = Omit<BalloonData, "title" | "id" | "description" | "isActive">

export const currentBalloonSlice = createSlice({
    name: "currentBalloon",
    initialState,
    reducers: {
        addPinData: (state: BalloonData | null, action: PayloadAction<PinData>) => {
            const { coordinates, adress } = action.payload
            if (state) {
                return ({
                    ...state,
                    coordinates,
                    adress,
                })
            } else {
                return ({
                    coordinates,
                    adress,
                    id: v4(),
                    title: "",
                    description: "",
                    isActive: false,
                } as any)
            }
        },
        resetCurrentBaloon: () => {
            return null;
        },
        changeTitle: (state: BalloonData | null, action: PayloadAction<string>) => {
            if (state) state.title = action.payload
        },
        changeDescription: (state: BalloonData | null, action: PayloadAction<string>) => {
            if (state) state.description = action.payload
        },
        changeAdress: (state: BalloonData | null, action: PayloadAction<string>) => {
            if (state) state.adress = action.payload
        },
    }
})

export const { addPinData, resetCurrentBaloon, changeTitle, changeDescription, changeAdress } = currentBalloonSlice.actions
export default currentBalloonSlice.reducer