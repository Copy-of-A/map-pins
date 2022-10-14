import { useRef, useState } from "react";
import {
    YMaps,
    Map,
    Placemark,
    YMapsApi,
} from "react-yandex-maps";
import { Balloon } from "./components/Balloon/Balloon";


const mapState = {
    center: [55.751574, 37.573856],
    zoom: 10
};

export const MapContainer = () => {
    const handleClick = () => console.log("BaloonClick")
    const [mapRef, setMapRef] = useState<any>(null);
    const [mapInstanceRef, setMapInstanceRef] = useState<YMapsApi | null>(null)

    const createTemplateLayoutFactory = (ymaps: YMapsApi) => {
        setMapInstanceRef(ymaps)
    }

    return (
        <YMaps
            instanceRef={(ref: any) => {
                if (ref) {
                    setMapRef(ref);
                }
            }}
        >
            <Map
                onLoad={createTemplateLayoutFactory}
                style={{ width: "100%", height: "100vh", padding: 0 }}
                defaultState={mapState}
                modules={['templateLayoutFactory']}
            >
                <Balloon id={"myId"} onClick={handleClick} mapInstanceRef={mapInstanceRef} />
            </Map>
        </YMaps>
    )
}

