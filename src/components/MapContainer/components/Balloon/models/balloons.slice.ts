import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PinData {
    id: string;
    coordinates: {
        lat: number
        lon: number,
    },
    title: string,
    description: string,
    isActive: boolean,
    adress: string
}

const initialState: Array<PinData> = [
    {
        id: "0",
        coordinates: {
            lat: 55.684758,
            lon: 37.738521,
        },
        title: "My title",
        description: "My description",
        isActive: false,
        adress: "My adress"
    },
    {
        id: "1",
        coordinates: {
            lat: 55.8,
            lon: 37.8,
        },
        title: "My title 111",
        description: "My description 1111",
        isActive: false,
        adress: "My adress 1111"
    }
]

export const baloonsSlice = createSlice({
    name: "baloons",
    initialState,
    reducers: {
        addBalloon: (state: Array<PinData>, action: PayloadAction<PinData>) => {
            state.push(action.payload)
        }
    }
})

export const { addBalloon } = baloonsSlice.actions
export default baloonsSlice.reducer