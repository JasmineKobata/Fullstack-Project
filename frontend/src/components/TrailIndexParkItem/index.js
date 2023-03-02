import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchPark, getPark } from "../../store/parks";

export default function TrailIndexParkItem({parkId}) {
    const dispatch = useDispatch();
    const park = useSelector(getPark(parkId));

    useEffect(() => {
        dispatch(fetchPark(parkId))
    }, [dispatch, parkId])


    if (!park) {
        return null;
    }

    return (
        <>
            <div>{park.name}</div>
        </>
    )
}