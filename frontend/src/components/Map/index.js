import './Map.css';
import { useState, useEffect, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

export function TrailMap({parks, trails}, props) {
    const [map, setMap] = useState(null);
    const [google, setGoogle] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => {
        if (!google) {
            setGoogle(window.google);
        }
    }, [google])

    useEffect(() => {
        if (!map && google) {
            const myLatLng = new google.maps.LatLng(37.781575, -121.704546);
            const options = {
            zoom: 12,
            center: myLatLng,
            ...props.mapOptions
            };

            setMap(new google.maps.Map(mapRef.current, options))
        }
    })

    if (map && parks) {
        let lastOpenedWindow;
        parks.forEach(park => {
            let myLatLng = new google.maps.LatLng(parseFloat(park.lat), parseFloat(park.long));

            const marker = new google.maps.Marker({
                position: myLatLng,
                map,
                title: park.name,
            });

            const parkWindow = new google.maps.InfoWindow({
                content: `<a href="/parks/${park.id}">${marker.title}</a>`,
            });

            marker.addListener("click", () => {
                if (lastOpenedWindow) {
                    lastOpenedWindow.close();
                }

                parkWindow.open({
                    anchor: marker,
                    map,
                });
                lastOpenedWindow = parkWindow;
            });

            google.maps.event.addListener(map, "click", event => {
                parkWindow.close();
            });
        })
    }
    
    return (
        <div className="map" ref={mapRef}>Map</div>
    )
}

export default function TrailMapWrapper(props) {
    return (
        <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
            <TrailMap {...props}/>
        </Wrapper>
    )
}