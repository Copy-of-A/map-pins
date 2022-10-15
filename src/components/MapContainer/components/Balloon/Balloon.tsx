import { FC, memo } from "react";
import {
    Placemark,
    YMapsApi
} from "react-yandex-maps";
import './balloon.scss'
import { BalloonData } from "./models/balloons.slice";

type BalloonProps = {
    pin: BalloonData;
    onClick: (orderId: string) => void;
    mapInstanceRef: YMapsApi | null;
};

export const Balloon: FC<BalloonProps> = memo(
    ({ pin, mapInstanceRef, onClick }) => {
        // const pin = useSelector(createMapPlacemarkByIdSelector(id)) as PinData;
        if (!mapInstanceRef) return null;


        const layout = mapInstanceRef.templateLayoutFactory.createClass(
            `  
            <div class="pin-container">
                <div class="placemark">          
                    <p class="placemark__title">
                        ${pin.title}
                    </p>          
                    <p class="placemark__description">
                        ${pin.description}
                    </p>   
                </div>  
                <div class="pin-container__pin"></div>   
            </div>
            `,
            {
                build:
                    function () {
                        layout.superclass.build.call(this);
                        const placemark = this.getParentElement().getElementsByClassName(
                            'placemark',
                        )[0];
                        this.getData().geoObject.events.add(
                            'click',
                            () => {
                                pin.isActive = !pin.isActive;
                                if (pin.isActive) {
                                    placemark.style.display = "none";
                                } else {
                                    placemark.style.display = "block";
                                }
                            },
                            this,
                        );
                    }
            }
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
                onClick={onClick}
            />
        )
    }
)