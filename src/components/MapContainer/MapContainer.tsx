import {
    YMaps,
    Map,
} from "react-yandex-maps";
import { Balloon } from "./components/Balloon/Balloon";
import { useMapContainer } from "./mapContainer.hook";
import styles from "./map.module.scss"

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
        currentPin,
        onMapClick,
    } = useMapContainer();

    return (
        <>
            {pins.length === 0 && hideSideBar && <div className={styles.overlay}><h1>Пусто</h1></div>}
            <YMaps
                query={{ load: "package.full", apikey: "25ee6f03-e8c6-4612-96ea-e0d817effe5a" }}
            >
                <Map
                    onLoad={createTemplateLayoutFactory}
                    style={{ width: "100%", height: "100vh", padding: 0 }}
                    defaultState={mapState}
                    modules={['templateLayoutFactory']}
                    onClick={onMapClick}
                >
                    {currentPin && <Balloon pin={currentPin} key={currentPin.id} onClick={() => { }} mapInstanceRef={mapInstanceRef} isNewPin={true} />}
                    {pins && pins.map((_) => <Balloon pin={_} key={_.id} onClick={handleClickPin} mapInstanceRef={mapInstanceRef} isNewPin={false} />)}
                </Map>
            </YMaps>
        </>
    )
}

