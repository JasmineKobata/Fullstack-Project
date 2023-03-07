import "./ParkTrailImage.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getTrail, fetchTrail } from "../../store/trails"

export default function ParkTrailImage({trailId}) {
    const dispatch = useDispatch();
    const trail = useSelector(getTrail(trailId));
    var slideIndex = 1;
    showSlides(slideIndex);

    useEffect(() => {
        dispatch(fetchTrail(trailId))
    }, [dispatch, trailId])

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

    return (
        <>
            <div className='pictureframeP'>
                <a className="prevP" onClick={() => {minusSlides(trail.id)}}>&#10094;</a>
                <a className="nextP" onClick={() => {plusSlides(trail.id)}}>&#10095;</a>
                {trail.imageUrls.map( imageUrl =>
                    <img className={`photo ${trail.id}`} key={imageUrl} src={imageUrl} alt="" />
                )}

                <img key={trail.imageUrl} src={trail.imageUrl} alt="" />
            </div>
        </>
    )
}