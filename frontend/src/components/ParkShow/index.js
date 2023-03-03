import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPark, getPark } from "../../store/parks";
import Navigation from "../Navigation";
import { Link } from "react-router-dom";
import { fetchTrails } from "../../store/trails";

export default function ParkShow() {
    const dispatch = useDispatch();
    const { parkId } = useParams();
    const park = useSelector(getPark(parkId));
    
    useEffect(() => {
        // dispatch(fetchTrails())
        dispatch(fetchPark(parkId))
    }, [dispatch, parkId])

    return (
        <>
            <Navigation />
            <h1>Best Trails in {park.name}</h1>
            <p>{park.description}</p>
            <h3>Trails</h3>
            <ul>{Object.values(park.trails).map( trail => 
                <li key={trail.id}>
                    <Link to={`/trails/${trail.id}`}>{trail.name}</Link>
                </li>
            )}</ul>
        </>
    )
}