import "./ParkTrailImage.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getTrail, fetchTrail } from "../../store/trails"

export default function ParkTrailImage({trailId}) {
    const dispatch = useDispatch();
    const trail = useSelector(getTrail(trailId));

    useEffect(() => {
        dispatch(fetchTrail(trailId))
    }, [dispatch, trailId])

    return (
        <>
            <div className='pictureframeP'>
                <img key={trail.imageUrl} src={trail.imageUrl} alt="" />
            </div>
        </>
    )
}