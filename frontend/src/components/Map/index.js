import './Map.css';
import { useState, useEffect, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

export function TrailMap(props) {
    let [map, setMap] = useState(null);
    const [google, setGoogle] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => {
        if (!google) {
            setGoogle(window.google);
        }
    }, [google])

    useEffect(() => {
        if (!map && google) {
            const myLatLng = new google.maps.LatLng(37.752121805252024, -121.6867232810347);
            const options = {
            zoom: 14,
            center: myLatLng,
            ...props.mapOptions
            };
            setMap(new google.maps.Map(mapRef.current, options))
        }
    })
    
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