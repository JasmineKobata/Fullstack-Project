import './ReviewUpdateModal.css'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import { deleteReview, updateReview } from '../../store/review';
import { getSession } from '../../store/session';
import { useSelector } from 'react-redux';

export default function ReviewUpdateModal({trail, review}) {
    const spanHandler = function() {
        const modal = document.getElementsByClassName(`updateModal ${review.id}`)[0];
        modal.style.display = "none";
    }

    window.addEventListener("click", function(event) {
        const modal = document.getElementsByClassName(`updateModal ${review.id}`)[0];
        if (event.target == modal) {
            modal.style.display = "none";
        }
    })
 
    const dispatch = useDispatch();
    const session = useSelector(getSession);
    const [rating, setRating] = useState(review.rating);
    const [body, setBody] = useState(review.body);

    const onSubmit = async (e) => {
        e.preventDefault();
        const reviewData = {
            id: review.id,
            rating,
            body
        }
console.log("submit", review)
        await dispatch(updateReview(reviewData))
        window.location.reload(false)
    }

    const onDelete = async () => {
        await dispatch(deleteReview(review.id))
        window.location.reload(false)
    }

    if (!session.user) {
        return null
    } else {
        return (
            <>
                <div className={"updateModal " + review.id}>
                    <form className="modal-content" onSubmit={onSubmit}>
                        <span className="close" onClick={spanHandler}>&times;</span>
                        <div className='deleteContainer'>
                            <button className="deleteButton" type="button"
                            onClick={() => onDelete()}>Delete</button>
                        </div>
                        <p>{trail.name}</p>
                        <input className="stars" type="radio" id="1" value="1"
                            onClick={(e) => setRating(e.target.value)}
                            checked={rating>=1 ? "checked" : ""}
                            ></input>
                            <label htmlFor='1'>&#9733;</label>
                        <input className="stars" type="radio" id="2" value="2"
                            onClick={(e) => setRating(e.target.value)}
                            checked={rating>=2 ? "checked" : ""}></input>
                            <label htmlFor='2'>&#9733;</label>
                        <input className="stars" type="radio" id="3" value="3"
                            onClick={(e) => setRating(e.target.value)}
                            checked={rating>=3 ? "checked" : ""}></input>
                            <label htmlFor='3'>&#9733;</label>
                        <input className="stars" type="radio" id="4" value="4"
                            onClick={(e) => setRating(e.target.value)}
                            checked={rating>=4 ? "checked" : ""}></input>
                            <label htmlFor='4'>&#9733;</label>
                        <input className="stars" type="radio" id="5" value="5"
                            onClick={(e) => setRating(e.target.value)}
                            checked={rating>=5 ? "checked" : ""}></input>
                            <label htmlFor='5'>&#9733;</label>
                        <br></br>Review<br></br>
                        <textarea value={body} onChange={(e) => setBody(e.target.value)}>Test text</textarea><br></br>
                        <button className="updateButton" type="submit">Update</button>
                    </form>
                </div>
            </>
        )
    }
}