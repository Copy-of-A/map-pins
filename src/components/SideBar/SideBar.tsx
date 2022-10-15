import { FC } from "react";
import { AddButton } from "../AddButton/AddButton";
import { BalloonData } from "../MapContainer/components/Balloon/models/balloons.slice";
import { DropDown } from "./components/DropDown/DropDown";
import { useSideBar } from "./sideBar.hook";
import styles from "./sideBar.module.scss"

interface SideBarProps {

}

export const SideBar: FC<SideBarProps> = (props) => {

    const {
        currentBalloon,
        data,
        handleAddClick,
        handleTitleChange,
        handleDescriptionChange,
    } = useSideBar();

    console.log("data", data?.reference.titles)
    return (
        <div className={styles.sidebar}>
            <div>
                <h1 className={styles.sidebar__heading}>Выберете адрес на карте</h1>
                <p>Адрес: {currentBalloon === null ? "Не выбран" : (currentBalloon as BalloonData).adress}</p>
                <DropDown options={data?.reference.titles || []} selectId={"title"} handleChange={handleTitleChange} />
                <DropDown options={data?.reference.descriptions || []} selectId={"description"} handleChange={handleDescriptionChange} />
            </div>
            <AddButton
                title={"Добавить"}
                className={styles.sidebar__button}
                handleClick={handleAddClick}
                disabled={currentBalloon.title === "" || currentBalloon.description === ""}
            />
        </div>
    )
}

