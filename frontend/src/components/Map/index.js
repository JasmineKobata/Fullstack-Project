import { useEffect, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

export function TrailMap(trails, mapEventHandlers, markerEventHandlers) {
    let map = null;
    const myLatLng = new google.maps.LatLng(37.705417, -121.793325);
    const mapOptions = {
        zoom: 4,
        center: myLatLng
    }

    const mapRef = useRef(null);

    useEffect(() => {
        if (map === null) {
            map = new google.maps.Map(mapRef, {mapOptions});
        }
    })

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
    
    return (
        <>
            <div ref={mapRef} placeholder="Map"/>
        </>
    )
}

export default function TrailMapWrapper(trails={}, mapHandlers={}, markerHandlers={}) {
    return (
        <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
            <TrailMap trails={trails} mapHandlers={mapHandlers} markerHandlers={mapHandlers}/>
            {/* <div>Map</div> */}
        </Wrapper>
    )
}