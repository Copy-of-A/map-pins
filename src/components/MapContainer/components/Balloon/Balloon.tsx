import { FC, memo } from "react";
import { useDispatch } from "react-redux";
import {
    Placemark,
    YMapsApi
} from "react-yandex-maps";
import './balloon.scss'
import { BalloonData, changeIsActive } from "../../../../app/features/balloons.slice";

type BalloonProps = {
    pin: BalloonData;
    onClick: (id: string) => void;
    mapInstanceRef: YMapsApi | null;
    isNewPin: boolean
};

export const Balloon: FC<BalloonProps> = memo(
    ({ pin, mapInstanceRef, onClick, isNewPin }) => {
        if (!mapInstanceRef) return null;

        const newPinLayout = `
            <div class="pin-container">
                <div class="pin-container__pin pin-container__pin_new"></div>   
            </div>
            `

        const layout = mapInstanceRef.templateLayoutFactory.createClass(
            isNewPin ? newPinLayout :
                `  
                    <div class="pin-container">
                        ${pin.isActive ?
                    `
                            <div class="placemark">          
                            <p class="placemark__title">
                                ${pin.title}
                            </p>          
                            <p class="placemark__description">
                                ${pin.description}
                            </p>   
                        </div>  `
                    : ``} 
                        <div class="pin-container__pin"></div>   
                    </div>
                `
        );

        return (
            <Placemark
                geometry={[pin.coordinates.lat, pin.coordinates.lon]}
                options={{
                    iconLayout: layout,
                    iconShape: {
                        type: 'Circle',
                        coordinates: [0, 0],
                        radius: 25
                    }
                }}
                onClick={() => onClick(pin.id)}
            />
        )
    }
)