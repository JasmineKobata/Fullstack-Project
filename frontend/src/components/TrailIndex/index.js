import './TrailList.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchTrails, getTrails } from "../../store/trails";
import { fetchParks, getParks } from "../../store/parks";
import { Link, Redirect } from "react-router-dom";
import TrailMapWrapper from '../Map';

export default function TrailIndex() {
    const dispatch = useDispatch();
    const trails = useSelector(getTrails);
    const parks = useSelector(getParks);
    var slideIndex = 1;
    showSlides(slideIndex);

    useEffect(() => {
        dispatch(fetchTrails());
        dispatch(fetchParks());
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

    const searchInput = document.querySelector("[data-search]")
    let array = [];
    if (searchInput) {
        searchInput.addEventListener("input", e => {
            const val = e.target.value.toLowerCase();
            array.forEach(elem => {
                const isVisible = elem.trail.toLowerCase().includes(val)
                    || elem.park.toLowerCase().includes(val)
                const li = document.getElementsByClassName(`li${elem.key}`)[0]
                li.hidden = !isVisible;
            })
            // if (val.split("").length > 0) {
            //     const dropdown = document.createElement("ul");
            //     const dropdownBtn = 
            //     const newContent = 
            // }
        })
    }
    const handleSearch = () => {
        // console.log("HI")
    }

    return (
        <div className='explorePage'>
            <div className='trailTable'>
                <ul><li><input type="search" placeholder='Enter park or trail name' data-search></input>
                    {/* <input type="submit" value="Search" onClick={() => handleSearch()}></input> */}
                    </li>
                    {Object.values(trails).map(trail =>
                    <li key={trail.id} className={"li"+trail.id.toString()}>
                        <div className='pictureframe'>
                            <a className="prev" onClick={() => {minusSlides(trail.id)}}>&#10094;</a>
                            <a className="next" onClick={() => {plusSlides(trail.id)}}>&#10095;</a>
                            {trail.imageUrls.map( imageUrl =>
                                <img className={`photo ${trail.id}`} key={imageUrl} src={imageUrl} alt=""
                                onClick={() => window.location.pathname = `trails/${trail.id}`}/>
                            )}                     
                        </div>
                        <div className='diff'>{trail.difficulty} </div>
                        <Link className='trail' to={`trails/${trail.id}`}>{trail.name}</Link><br></br>
                        <Link className='park' to={`parks/${trail.parkId}`}>{trail.park.name}</Link><br></br>
                        <div className='len'>Length: {trail.length} mi • Est. {trail.time}</div><br></br>
                        <div hidden>{array.push({trail: trail.name, park: trail.park.name, key: trail.id})}</div>
                    </li>
                )}
                </ul>
            </div>
            <TrailMapWrapper parks={parks} mapEventHandlers={{click: handleMapClick}}/>
        </div>
    )
}