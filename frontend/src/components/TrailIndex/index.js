import './TrailList.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchTrails, getTrails } from "../../store/trails";
import { Link } from "react-router-dom"
// import TrailIndexParkItem from "../TrailIndexParkItem"

export default function TrailIndex() {
    const dispatch = useDispatch();
    const trails = useSelector(getTrails);

    useEffect(() => {
        dispatch(fetchTrails())
    }, [dispatch])
    
    return (
        <div className='explorePage'>
        <div className='trailTable'>
            <ul>{Object.values(trails).map(trail =>
                <li key={trail.id}>
                    <div className='diff'>{trail.difficulty} </div>
                    <Link className='trail' to={`trails/${trail.id}`}>{trail.name}</Link><br></br>
                    <Link className='park' to={`parks/${trail.parkId}`}>{trail.park.name}</Link><br></br>
                    <div className='len'>Length: {trail.length} mi • Est. {trail.time}</div><br></br>
                    {/* <TrailIndexParkItem parkId={trail.parkId}/> */}
                </li>
            )}
            </ul>
        </div>
        </div>
    )
}