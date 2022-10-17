import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BalloonData } from "./balloons.slice";
import { v4 } from 'uuid';

export interface CurrentBalloonState {
    currentBalloon: BalloonData | null;
    titleFutureBalloon: string;
    descriptionFutureBalloon: string;
}

const initialState: CurrentBalloonState = {
    currentBalloon: null,
    titleFutureBalloon: "",
    descriptionFutureBalloon: "",
};

export type PinData = Omit<BalloonData, "title" | "id" | "description" | "isActive">

export const currentBalloonSlice = createSlice({
    name: "currentBalloon",
    initialState,
    reducers: {
        addPinData: (state: CurrentBalloonState, action: PayloadAction<PinData>) => {
            const { coordinates, adress } = action.payload
            if (state.currentBalloon) {
                state.currentBalloon.coordinates = coordinates;
                state.currentBalloon.adress = adress
            } else {
                state.currentBalloon = {
                    coordinates,
                    adress,
                    id: v4(),
                    title: state.titleFutureBalloon,
                    description: state.descriptionFutureBalloon,
                    isActive: true,
                }
            }
        },
        resetCurrentBaloon: (state: CurrentBalloonState) => {
            state.currentBalloon = null;
            state.descriptionFutureBalloon = ""
            state.titleFutureBalloon = ""
        },
        changeTitle: (state: CurrentBalloonState, action: PayloadAction<string>) => {
            if (state.currentBalloon) {
                state.currentBalloon.title = action.payload
            } 
            else {
                state.titleFutureBalloon = action.payload
            }
        },
        changeDescription: (state: CurrentBalloonState, action: PayloadAction<string>) => {
            if (state.currentBalloon) {
                state.currentBalloon.description = action.payload
            }
            else {
                state.descriptionFutureBalloon = action.payload
            }
        },
        changeAdress: (state: CurrentBalloonState, action: PayloadAction<string>) => {
            if (state.currentBalloon) {
                state.currentBalloon.adress = action.payload
            }
        },
    }
})

export const { addPinData, resetCurrentBaloon, changeTitle, changeDescription, changeAdress } = currentBalloonSlice.actions
export default currentBalloonSlice.reducer