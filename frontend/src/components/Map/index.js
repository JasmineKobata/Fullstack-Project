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

    // useEffect(() => {
    //     if (map && google) {
    //         const {markerEventHandlers} = props;
    //     }
    // }, [props.markerEventHandlers, map, google])

    //     let markers = {};
//     useEffect(() => {
//         Object.values(trails).forEach(trail => {
//             if (markers[trail.id]) {
//                 markers[trail.id] = new google.maps.Marker({
//                     position: {lat: trail.lat, lng: trail.lng},
//                     map: map
//                 });
//             }
//         })
//     })

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

    useEffect(() => {
        if (map && google) {
            const { mapEventHandlers } = props;
            Object.keys(mapEventHandlers).forEach((eventType) => {
                const handler = mapEventHandlers[eventType];
                google.maps.event.addListener(map, eventType, (event) => {
                    handler(event, map);
                });
            });
        }
    }, [props.mapEventHandlers, map, google])
    
    return (
        <div className="map" ref={mapRef}>Map</div>
    )
}

export default function TrailMapWrapper(props) {
    return (
        <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
            <TrailMap {...props}/>
            {/* <div>Map</div> */}
        </Wrapper>
    )
}