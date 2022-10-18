import { ChangeEvent, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../app/store"
import { DropDownOption } from "./components/DropDown/DropDown"
import { changeTitle, changeDescription, resetCurrentBaloon } from "../../app/features/currentBalloon.slice"
import { addBalloon } from "../../app/features/balloons.slice"
import { setIsActive } from "../../app/features/sidebar.slice"

export interface JsonObject {
    reference: {
        titles: Array<DropDownOption>,
        descriptions: Array<DropDownOption>
    }
}

export const useSideBar = () => {
    const currentBalloon = useSelector((state: RootState) => state.currentBalloon)
    const dispatch = useDispatch()
    const [data, setData] = useState<JsonObject | null>(null)

    const getData = () => {
        fetch('./data.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                setData(myJson)
            });
    }

    useEffect(() => {
        getData()
    }, [])

    const handleAddClick = () => {
        if (currentBalloon.currentBalloon) {
            dispatch(addBalloon(currentBalloon.currentBalloon))
            dispatch(resetCurrentBaloon())
            dispatch(setIsActive())
        }
    }

    const handleTitleChange = (e: ChangeEvent) => {
        if (!currentBalloon || !data) return;
        const optionId = (e.target as HTMLSelectElement).value;
        dispatch(changeTitle(
            data.reference.titles.find((el) => el.id === +optionId)!.name
        ))
    }

    const handleDescriptionChange = (e: ChangeEvent) => {
        if (!currentBalloon || !data) return;
        const optionId = (e.target as HTMLSelectElement).value;
        dispatch(changeDescription(
            data.reference.descriptions.find((el) => el.id === +optionId)!.name
        ))
    }

    return {
        currentBalloon,
        data,
        handleAddClick,
        handleTitleChange,
        handleDescriptionChange,
    }
}