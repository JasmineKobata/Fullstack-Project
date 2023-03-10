import './TrailList.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchTrails, getTrails } from "../../store/trails";
import { Link } from "react-router-dom";
import TrailMapWrapper from '../Map';

export default function TrailIndex() {
    const dispatch = useDispatch();
    const trails = useSelector(getTrails);
    var slideIndex = 1;
    showSlides(slideIndex);

    useEffect(() => {
        dispatch(fetchTrails())
    }, [dispatch])

    function minusSlides(id) {
        showSlides(slideIndex -= 1, id);
    }

    function plusSlides(id) {
        showSlides(slideIndex += 1, id);
    }

    function showSlides(n, id) {
        let i;
        let slides = document.getElementsByClassName(`photo ${id}`);

        if (slides.length > 0) {
            if (n > slides.length) {
                slideIndex = 1
            }
            if (n < 1) {
                slideIndex = slides.length
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slides[slideIndex-1].style.display = "block";
        }
    }

    function handleMapClick(event) {
    }

    return (
        <div className='explorePage'>
            <div className='trailTable'>
                <ul>{Object.values(trails).map(trail =>
                    <li key={trail.id}>
                        <div className='pictureframe'>
                            <a className="prev" onClick={() => {minusSlides(trail.id)}}>&#10094;</a>
                            <a className="next" onClick={() => {plusSlides(trail.id)}}>&#10095;</a>
                            {trail.imageUrls.map( imageUrl =>
                                <img className={`photo ${trail.id}`} key={imageUrl} src={imageUrl} alt="" />
                            )}                     
                        </div>
                        <div className='diff'>{trail.difficulty} </div>
                        <Link className='trail' to={`trails/${trail.id}`}>{trail.name}</Link><br></br>
                        <Link className='park' to={`parks/${trail.parkId}`}>{trail.park.name}</Link><br></br>
                        <div className='len'>Length: {trail.length} mi • Est. {trail.time}</div><br></br>
                    </li>
                )}
                </ul>
            </div>
            <TrailMapWrapper mapEventHandlers={{click: handleMapClick}}/>
        </div>
    )
}