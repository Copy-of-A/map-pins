import { AddButton } from "./components/MapContainer/AddButton/AddButton";
import { MapContainer } from "./components/MapContainer/MapContainer";

import "./App.scss"

export const App = () => {
    const handleClick = () => {
        
    }

    return (
        <>
            <MapContainer />
            <AddButton
                handleClick={handleClick}
                className="addButton" title={"Добавить Адрес"}
            />
        </>
    )
}