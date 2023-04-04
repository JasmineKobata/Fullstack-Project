import './ReviewModal.css'
import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import { createReview } from '../../store/review';
import { getSession } from '../../store/session';
import { useSelector } from 'react-redux';

export default function ReviewModal({trail, reviews}) {

    const spanHandler = function() {
        const modal = document.getElementsByClassName("modal")[0];
        modal.style.display = "none";
    }

    window.addEventListener("click", function(event) {
        const modal = document.getElementsByClassName("modal")[0];
        if (event.target === modal) {
            modal.style.display = "none";
        }
    })

    const dispatch = useDispatch();
    const session = useSelector(getSession);
    const [rating, setRating] = useState('');
    const [body, setBody] = useState('');
    let onSubmit = async (e) => {
        e.preventDefault();
        const reviewData = {
            author_id: session.user.id,
            trail_id: trail.id,
            rating,
            body
        }
        await dispatch(createReview(reviewData))
        // window.location.reload(false);
        spanHandler();
        setRating("")
        setBody("")
    }
    
    const modalHandler = function() {
        if (Object.values(reviews).some(e => e.authorId === session.user.id)) {
        } else {
            const modal = document.getElementsByClassName("modal")[0];
            modal.style.display = "block";
        }
    }

    useEffect(() => {
        const button = document.getElementsByClassName("reviewButton")[0];
        button.disabled = !session.user
            || Object.values(reviews).some(e => e.authorId === session.user.id);
    }, [reviews, session.user])

    return (
        <>
            <button className='reviewButton' onClick={modalHandler}>Write Review</button>
            <div className="modal">
                <form className="modal-content" onSubmit={onSubmit}>
                    <span className="close" onClick={spanHandler}>&times;</span>
                    <p className='modalName'>{trail.name}</p>
                    <p className="modalRating">Rating</p>
                    <input className="stars" type="radio" id="1" value="1"
                        onChange={(e) => setRating(e.target.value)}
                        checked={rating>=1 ? "checked" : ""}></input>
                        <label htmlFor='1'>&#9733;&nbsp;</label>
                    <input className="stars" type="radio" id="2" value="2"
                        onChange={(e) => setRating(e.target.value)}
                        checked={rating>=2 ? "checked" : ""}></input>
                        <label htmlFor='2'>&#9733;&nbsp;</label>
                    <input className="stars" type="radio" id="3" value="3"
                        onChange={(e) => setRating(e.target.value)}
                        checked={rating>=3 ? "checked" : ""}></input>
                        <label htmlFor='3'>&#9733;&nbsp;</label>
                    <input className="stars" type="radio" id="4" value="4"
                        onChange={(e) => setRating(e.target.value)}
                        checked={rating>=4 ? "checked" : ""}></input>
                        <label htmlFor='4'>&#9733;&nbsp;</label>
                    <input className="stars" type="radio" id="5" value="5"
                        onChange={(e) => setRating(e.target.value)}
                        checked={rating>=5 ? "checked" : ""}></input>
                        <label htmlFor='5'>&#9733;</label>
                    <br></br><p className='modalBody'>Review</p>
                    <textarea placeholder="Give back to the community. Share your thoughts about the trail so others know what to expect." value={body} onChange={(e) => setBody(e.target.value)}></textarea><br></br>
                    <br></br><button type="submit">Post</button>
                </form>
            </div>
        </>
    )
}