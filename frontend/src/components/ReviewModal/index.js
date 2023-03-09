import './ReviewModal.css'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import { createReview } from '../../store/review';
import { getSession } from '../../store/session';
import { useSelector } from 'react-redux';

export default function ReviewModal({trail}) {

    const spanHandler = function() {
        const modal = document.getElementsByClassName("modal")[0];
        modal.style.display = "none";
    }

    window.addEventListener("click", function(event) {
        const modal = document.getElementsByClassName("modal")[0];
        if (event.target == modal) {
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
        }

    const modalHandler = function() {
        const modal = document.getElementsByClassName("modal")[0];
        modal.style.display = "block";
    }

    if (!session.user) {
        return null
    } else {
        return (
            <>
                <button className='reviewButton' onClick={modalHandler}>Write Review</button>
                <div className="modal">
                    <form className="modal-content" onSubmit={onSubmit}>
                        <span className="close" onClick={spanHandler}>&times;</span>
                        <p>{trail.name}</p>
                        <input className="stars" type="radio" value="1"
                            onChange={(e) => setRating(e.target.value)}
                            checked={rating>=1 ? "checked" : ""}></input>
                        <input className="stars" type="radio" value="2"
                            onChange={(e) => setRating(e.target.value)}
                            checked={rating>=2 ? "checked" : ""}></input>
                        <input className="stars" type="radio" value="3"
                            onChange={(e) => setRating(e.target.value)}
                            checked={rating>=3 ? "checked" : ""}></input>
                        <input className="stars" type="radio" value="4"
                            onChange={(e) => setRating(e.target.value)}
                            checked={rating>=4 ? "checked" : ""}></input>
                        <input className="stars" type="radio" value="5"
                            onChange={(e) => setRating(e.target.value)}
                            checked={rating>=5 ? "checked" : ""}></input>
                        <br></br>Review<br></br>
                        <textarea placeholder="Give back to the community. Share your thoughts about the trail so others know what to expect." value={body} onChange={(e) => setBody(e.target.value)}></textarea><br></br>
                        <button type="submit">Post</button>
                    </form>
                </div>
            </>
        )
    }
}