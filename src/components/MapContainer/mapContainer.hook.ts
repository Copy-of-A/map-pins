import { useEffect, useState } from "react";
import {
    YMapsApi,
} from "react-yandex-maps";
import type { RootState } from '../../app/store'
import { useSelector, useDispatch } from 'react-redux'
import { changeAdress, addPinData } from '../../app/features/currentBalloon.slice'
import { changeIsActive } from "../../app/features/balloons.slice";
import { setIsActive } from "../../app/features/sidebar.slice";

export const useMapContainer = () => {
    const handleClickPin = (id: string) => {
        dispatch(changeIsActive(id));
    }
    const [mapInstanceRef, setMapInstanceRef] = useState<YMapsApi | null>(null)
    const pins = useSelector((state: RootState) => state.balloons);
    const dispatch = useDispatch()

    const hideSideBar = !useSelector((state: RootState) => state.sidebar.isActive)

    const currentBalloon = useSelector((state: RootState) => state.currentBalloon)

    const createTemplateLayoutFactory = (ymaps: any) => {
        setMapInstanceRef(ymaps)
    }
    
    const [progress, setProgress] = useState(0)

    // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords: [number, number]) {
        dispatch(addPinData({
            coordinates: {
                lat: coords[0], lon: coords[1]
            },
            adress: "поиск...",
        }))

        if (mapInstanceRef) {
            mapInstanceRef.geocode(coords)
                .then((res: any) => {
                    const firstGeoObject = res.geoObjects.get(0);
                    dispatch(changeAdress(firstGeoObject.getAddressLine()))
                });
        }
    }

    const onMapClick = (e: any) => {
        !hideSideBar && getAddress(e.get('coords'))
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((progress) => progress += 15 )
          }, 160);
        return () => clearInterval(interval);
    }, [])


    const handleClickAddButton = () => dispatch(setIsActive())


    return {
        createTemplateLayoutFactory,
        handleClickPin,
        mapInstanceRef,
        pins,
        hideSideBar,
        currentBalloon,
        getAddress,
        onMapClick,
        progress,
        handleClickAddButton
    }
}