import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchPark, getPark } from "../../store/parks";
import { Link } from "react-router-dom"

export default function TrailIndexParkItem({parkId}) {
    const dispatch = useDispatch();
    const park = useSelector(getPark(parkId));
    console.log(park.trails);

    useEffect(() => {
        dispatch(fetchPark(parkId))
    }, [dispatch, parkId])


    if (!park) {
        return null;
    }

    return (
        <><br></br>
        <Link to={`parks/${park.id}`}>{park.name}</Link>
        </>
    )
}