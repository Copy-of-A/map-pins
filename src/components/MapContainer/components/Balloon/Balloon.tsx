import { FC, memo } from "react";
import {
    Placemark,
    YMapsApi
} from "react-yandex-maps";
import './balloon.scss'

type BalloonProps = {
    id: string;
    onClick: (orderId: string) => void;
    mapInstanceRef: YMapsApi | null;
};

export const Balloon: FC<BalloonProps> = memo(
    ({ id, mapInstanceRef, onClick }) => {
        const pin = {
            coordinates: {
                lat: 55.684758,
                lon: 37.738521,
            },
            title: "My title",
            description: "My description",
            isActive: false,
        }
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
            />
        )
    }
)