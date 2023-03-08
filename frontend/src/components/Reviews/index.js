import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchReviews, getReviews } from '../../store/review';
import './Reviews.css'

export default function Reviews({ trail }) {
    const dispatch = useDispatch();
    const reviews = useSelector(getReviews);

    useEffect(() => {
        dispatch(fetchReviews())
    }, [dispatch])

    if (!reviews) {
        return null;
    }

    function setDate(review) {
        const date = new Date(review.created_at)
        const dateOption = {year: 'numeric', month: 'long', day: 'numeric'}
        return date.toLocaleDateString(undefined, dateOption)
    }

    return (
        <ul className='reviews'>
            {trail.reviews.map(review =>
                <li key={review.id}>
                    <p>Author: {reviews[review.id-1].author.firstname} {reviews[review.id-1].author.lastname}</p>
                    <p>Time: {setDate(review)}</p>
                    <p>Rating: {review.rating}</p>
                    <p key={review.id}>{review.body}</p>
                </li>
            )}
        </ul>
    )
}