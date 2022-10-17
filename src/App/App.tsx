import { AddButton } from "../components/AddButton/AddButton";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import { MapContainer } from "../components/MapContainer/MapContainer";
import { SideBar } from "../components/SideBar/SideBar";
import { useApp } from "./App.hook";

import "./App.scss"

export const App = () => {

    const {
        handleClick,
        hideSideBar,
    } = useApp();

    return (
        <>
            <MapContainer />
            {hideSideBar ?
                <AddButton
                    handleClick={handleClick}
                    className="addButton" title={"Добавить Адрес"}
                />
                : <SideBar />}
        </>
    )
}