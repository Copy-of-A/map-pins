import { useRef, useState } from "react";
import {
    YMaps,
    Map,
    Placemark,
    YMapsApi,
} from "react-yandex-maps";
import { Balloon } from "./components/Balloon/Balloon";
import type { RootState } from '../../app/store'
import { useSelector, useDispatch } from 'react-redux'
import { addBalloon } from './components/Balloon/models/balloons.slice'

const mapState = {
    center: [55.751574, 37.573856],
    zoom: 10
};

export const MapContainer = () => {
    const handleClick = () => console.log("BaloonClick")
    const [mapRef, setMapRef] = useState<any>(null);
    const [mapInstanceRef, setMapInstanceRef] = useState<YMapsApi | null>(null)
    const pins = useSelector((state: RootState) => state.baloons);
    console.log("pins", pins)
    const dispatch = useDispatch()

    const createTemplateLayoutFactory = (ymaps: any) => {
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
                {pins.map((_) => <Balloon pin={_} key={_.id} onClick={handleClick} mapInstanceRef={mapInstanceRef} />)}
            </Map>
        </YMaps>
    )
}

