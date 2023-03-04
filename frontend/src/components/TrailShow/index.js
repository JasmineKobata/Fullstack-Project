import './TrailShow.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { fetchTrail, fetchTrails, getTrail } from "../../store/trails";
import Navigation from '../Navigation';
import { Link } from "react-router-dom"

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
            <div className='explorePage'>
            <div className='trailTable'>
                <h1 className='trailD'>{trail.name}</h1>
                <p className='diffD'>{trail.difficulty} </p>
                <Link className='parkD' to={`/parks/${trail.parkId}`}>{trail.park.name}</Link>
                <div className='detailsD'>
                    <ul>
                        <li>Length</li>
                        <li>Elevation gain</li>
                        <li>Route type</li>
                    </ul>
                    <ul>
                        <li>{trail.length} mi</li>
                        <li>{trail.elevation} ft</li>
                        <li>{trail.trailType}</li>
                    </ul>
                </div>
                <p className="descriptionD">{trail.description}</p>
            </div>
            </div>
        </>
    )
}