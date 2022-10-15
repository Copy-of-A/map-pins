import { ChangeEvent, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../store"
import { DropDownOption } from "./components/DropDown/DropDown"
import { changeTitle, changeDescription, resetCurrentBaloon } from "../MapContainer/components/Balloon/models/currentBalloon.slice"
import { addBalloon } from "../MapContainer/components/Balloon/models/balloons.slice"

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
                console.log(response)
                return response.json();
            })
            .then((myJson) => {
                console.log(myJson);
                setData(myJson)
            });
    }

    useEffect(() => {
        getData()
    }, [])

    const handleAddClick = () => {
        if (currentBalloon) dispatch(addBalloon(currentBalloon))
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