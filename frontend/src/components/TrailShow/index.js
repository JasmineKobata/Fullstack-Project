import './TrailShow.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { fetchTrail, getTrail } from "../../store/trails";
import Navigation from '../Navigation';
import { Link } from "react-router-dom";
import TrailMapWrapper from '../Map';
import ReviewModal from '../ReviewModal';
import Reviews from '../Reviews';
import { fetchReviews } from '../../store/review';

export default function TrailShow() {
    const dispatch = useDispatch();
    const {trailId} = useParams();
    const trail = useSelector(getTrail(trailId));
    const reviews = useSelector(state => state.reviews)

    useEffect(() => {
        dispatch(fetchTrail(trailId))
    }, [dispatch, trailId])

    useEffect(() => {
        dispatch(fetchReviews(trail.id))
    }, [dispatch])

    function handleMapClick(event) {
    }

    const reviewsSize = Object.values(reviews).length

    function getReviewAvg() {
        if (reviewsSize === 0) { return 0}

        let num = 0;
        Object.values(reviews).forEach(review => num += review.rating)
        return (num / reviewsSize).toFixed(1);
    }

    function getNumReviews() {
        return reviewsSize
    }

    return (
        <>
            <Navigation/>
            <div className='explorePage'>
                <div className='trailShow'>
                    <div style={{backgroundImage:`url(${trail.imageUrl})`}} className='showpageImage'/>
                    <div className='indented'>
                        <div className='overlay'>
                            <div className='phototext'>
                                <h1 className='trailD'>{trail.name}</h1>
                                <div className='diffD'>{trail.difficulty}&nbsp; • &nbsp;</div>
                                <div className='showStar'>&#9733;&nbsp;</div>
                                <div className='showRevAvg'>{getReviewAvg() + ' (' + getNumReviews() + ')'}</div>
                                <Link className='parkD' to={`/parks/${trail.parkId}`}>{trail.park.name}</Link>
                            </div>
                        </div>
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
                        <p className="descriptionD">{trail.description}</p><br></br>
                        <ReviewModal trail={trail}/><br></br><br></br>
                        <Reviews trail={trail}/>
                    </div>
                </div>
                <TrailMapWrapper mapEventHandlers={{click: handleMapClick}}/>
            </div>
        </>
    )
}