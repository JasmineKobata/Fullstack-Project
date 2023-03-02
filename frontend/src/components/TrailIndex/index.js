import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchTrails, getTrails } from "../../store/trails";
import { Link } from "react-router-dom"
import { getPark } from "../../store/parks";
import TrailIndexParkItem from "../TrailIndexParkItem"

export default function TrailIndex() {
    const dispatch = useDispatch();
    const trails = useSelector(getTrails);

    useEffect(() => {
        dispatch(fetchTrails())
    }, [dispatch])

    return (
        <>
            <ul>{Object.values(trails).map(trail =>
                <li key={trail.id}>
                    <Link to={`trails/${trail.id}`}>{trail.name}</Link>
                    <TrailIndexParkItem parkId={trail.parkId}/>
                </li>
            )}</ul>
        </>
    )
}