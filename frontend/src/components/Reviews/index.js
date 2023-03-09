import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchReviews, getReviews } from '../../store/review';
import ReviewUpdate from '../ReviewUpdate';
import './Reviews.css'

export default function Reviews({ trail }) {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews);

    useEffect(() => {
        dispatch(fetchReviews(trail.id))
    }, [dispatch])

    function setDate(review) {
        const date = new Date(review.createdAt)
        const dateOption = {year: 'numeric', month: 'long', day: 'numeric'}
        return date.toLocaleDateString(undefined, dateOption)
    }

    return reviews && Object.values(reviews).length ? (
        <ul className='reviews'>
            {Object.values(reviews).map(review =>
                <li key={review.id}>
                    <p>Author: {reviews[review.id].author.firstname} {reviews[review.id].author.lastname}</p>
                    <p>Time: {setDate(review)}</p>
                    <p>Rating: {review.rating}</p>
                    <p key={review.id}>{review.body}</p>
                    <ReviewUpdate review={review} trail={trail}/>
                    <br></br>
                </li>
            )}
        </ul>
    ) : null
}