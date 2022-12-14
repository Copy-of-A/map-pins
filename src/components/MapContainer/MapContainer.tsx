import {
    YMaps,
    Map,
} from "react-yandex-maps";
import { Balloon } from "./components/Balloon/Balloon";
import { useMapContainer } from "./mapContainer.hook";
import styles from "./map.module.scss"
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { AddButton } from "../AddButton/AddButton";
import { SideBar } from "../SideBar/SideBar";

const mapState = {
    center: [55.751574, 37.573856],
    zoom: 10
};

export const MapContainer = () => {
    const {
        createTemplateLayoutFactory,
        handleClickPin,
        mapInstanceRef,
        pins,
        hideSideBar,
        currentBalloon,
        onMapClick,
        progress,
        handleClickAddButton,
    } = useMapContainer();

    return (
        <>
            {progress < 100 ? <ProgressBar progressPercentage={progress} /> :
                pins.length === 0 && hideSideBar && <div className={styles.overlay}><h1>Пусто</h1></div>}
            <YMaps
                query={{ load: "package.search", apikey: process.env.YANDEX_API_KEY }}
            >
                <Map
                    onLoad={createTemplateLayoutFactory}
                    style={{ width: "100%", height: "100vh", padding: 0 }}
                    defaultState={mapState}
                    modules={['templateLayoutFactory']}
                    onClick={onMapClick}
                >
                    {currentBalloon.currentBalloon && <Balloon pin={currentBalloon.currentBalloon} key={currentBalloon.currentBalloon.id} onClick={() => { }} mapInstanceRef={mapInstanceRef} isNewPin={true} />}
                    {hideSideBar && pins && pins.map((_) => <Balloon pin={_} key={_.id} onClick={handleClickPin} mapInstanceRef={mapInstanceRef} isNewPin={false} />)}
                </Map>
            </YMaps>
            {hideSideBar ?
                progress >= 100 && <AddButton
                    handleClick={handleClickAddButton}
                    className="addButton" title={"Добавить Адрес"}
                />
                : <SideBar />}
        </>
    )
}

