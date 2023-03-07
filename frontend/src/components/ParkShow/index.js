import "./ParkShow.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPark, getPark } from "../../store/parks";
import Navigation from "../Navigation";
import { Link } from "react-router-dom";
import ParkTrailImage from "../ParkTrailImage";

export default function ParkShow() {
    const dispatch = useDispatch();
    const { parkId } = useParams();
    const park = useSelector(getPark(parkId));
    
    useEffect(() => {
        dispatch(fetchPark(parkId))
    }, [dispatch, parkId])

    if (!park) {
        return null;
    }

    return (
        <>
            <Navigation />
            <div className="parkPage">
                <h1>Best Trails in {park.name}</h1><br></br>
                <p>{park.description}</p>
                <h3>Trails</h3>
                <ul>{Object.values(park.trails).map( trail =>
                    <li key={trail.id}>
                        <div className="modules">
                            <ParkTrailImage trailId={trail.id}/>
                        </div>
                        <div className="modules">
                            <br></br>
                            <div className="detailsP">
                                <div className='diffP'>{trail.difficulty} </div>
                                <Link className='trailP' to={`/trails/${trail.id}`}>{trail.name}</Link><br></br>
                                <Link className='parkP' to={`/parks/${park.id}`}>{park.name}</Link><br></br>
                                <div className='lenP'>Length: {trail.length} mi • Est. {trail.time}</div><br></br>
                            </div>
                        </div>
                    </li>
                )}</ul>
            </div>
        </>
    )
}