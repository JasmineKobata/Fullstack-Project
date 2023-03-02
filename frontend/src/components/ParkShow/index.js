import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPark, getPark } from "../../store/parks";
import Navigation from "../Navigation";

export default function ParkShow() {
    const dispatch = useDispatch();
    const { parkId } = useParams();
    const park = useSelector(getPark(parkId));
    console.log(park.trails)
    useEffect(() => {
        dispatch(fetchPark(parkId))
    }, [dispatch, parkId])

    return (
        <>
            <Navigation />
            <h1>Best Trails in {park.name}</h1>
            <p>{park.description}</p>
            <h3>Trails</h3>
        </>
    )
}