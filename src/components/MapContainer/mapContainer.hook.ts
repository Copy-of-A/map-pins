import { useState } from "react";
import {
    YMapsApi,
} from "react-yandex-maps";
import type { RootState } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import { changeAdress, addPinData } from './components/Balloon/models/currentBalloon.slice'
import { changeIsActive } from "./components/Balloon/models/balloons.slice";

export const useMapContainer = () => {
    const handleClickPin = (id: string) => {
        dispatch(changeIsActive(id));
    }
    const [mapInstanceRef, setMapInstanceRef] = useState<YMapsApi | null>(null)
    const pins = useSelector((state: RootState) => state.balloons);
    const dispatch = useDispatch()

    const hideSideBar = !useSelector((state: RootState) => state.sidebar.isActive)

    const currentPin = useSelector((state: RootState) => state.currentBalloon)

    const createTemplateLayoutFactory = (ymaps: any) => {
        setMapInstanceRef(ymaps)
    }

    // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords: [number, number]) {
        dispatch(addPinData({
            coordinates: {
                lat: coords[0], lon: coords[1]
            },
            adress: "поиск...",
        }))

        // if (mapInstanceRef) {
        //     mapInstanceRef.geocode(coords)
        //         .then((res: any) => {
        //             const firstGeoObject = res.geoObjects.get(0);
        //             dispatch(changeAdress(firstGeoObject.getAddressLine()))
        //         });
        // }
    }

    const onMapClick = (e: any) => {
        !hideSideBar && getAddress(e.get('coords'))
    }

    return {
        createTemplateLayoutFactory,
        handleClickPin,
        mapInstanceRef,
        pins,
        hideSideBar,
        currentPin,
        getAddress,
        onMapClick,
    }
}