import { FC } from "react";
import { AddButton } from "../AddButton/AddButton";
import { BalloonData } from "../MapContainer/components/Balloon/models/balloons.slice";
import { DropDown } from "./components/DropDown/DropDown";
import { useSideBar } from "./sideBar.hook";
import styles from "./sideBar.module.scss"

export const SideBar = () => {

    const {
        currentBalloon,
        data,
        handleAddClick,
        handleTitleChange,
        handleDescriptionChange,
    } = useSideBar();

    return (
        <div className={styles.sidebar}>
            <div>
                <h1 className={styles.sidebar__heading}>Выберете адрес на карте</h1>
                <h4>Адрес: {currentBalloon.currentBalloon === null ? "Не выбран" : currentBalloon.currentBalloon.adress}</h4>
                <DropDown options={data?.reference.titles || []} selectId={"title"} handleChange={handleTitleChange} />
                <DropDown options={data?.reference.descriptions || []} selectId={"description"} handleChange={handleDescriptionChange} />
            </div>
            <AddButton
                title={"Добавить"}
                className={styles.sidebar__button}
                handleClick={handleAddClick}
                disabled={currentBalloon.currentBalloon === null || currentBalloon.currentBalloon.title === "" || currentBalloon.currentBalloon.description === "" || !currentBalloon.currentBalloon.coordinates}
            />
        </div>
    )
}

