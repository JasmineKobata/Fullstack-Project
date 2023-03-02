import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { fetchTrail, fetchTrails, getTrail } from "../../store/trails";
import Navigation from '../Navigation';

export default function TrailShow() {
    const dispatch = useDispatch();
    const {trailId} = useParams();
    const trail = useSelector(getTrail(trailId));

    useEffect(() => {
        dispatch(fetchTrail(trailId))
    }, [dispatch, trailId])

    return (
        <>
            <Navigation/>
            <h1>{trail.name}</h1>
            <p>Length: {trail.length} mi</p>
            <p>Elevation gain: {trail.elevation}</p>
            <p>Route type: {trail.trailType}</p>
            <p>{trail.description}</p>
        </>
    )
}