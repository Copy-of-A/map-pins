import { AddButton } from "../components/AddButton/AddButton";
import { MapContainer } from "../components/MapContainer/MapContainer";
import { ProgressBar } from "../components/ProgressBar/ProgressBar";
import { SideBar } from "../components/SideBar/SideBar";
import { useApp } from "./App.hook";

import "./App.scss"

export const App = () => {

    const {
        handleClick,
        hideSideBar,
        progress,
    } = useApp();

    return (
        <>
            {progress < 100 ? <ProgressBar progressPercentage={progress} /> :
                <>
                    <MapContainer />
                    {hideSideBar ?
                        <AddButton
                            handleClick={handleClick}
                            className="addButton" title={"Добавить Адрес"}
                        />
                        : <SideBar />}
                </>
            }
        </>
    )
}