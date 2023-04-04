import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchReviews } from '../../store/review';
import ReviewUpdate from '../ReviewUpdate';
import './Reviews.css'

export default function Reviews({ trail, reviews }) {

    function setDate(review) {
        const date = new Date(review.createdAt)
        const dateOption = {year: 'numeric', month: 'long', day: 'numeric'}
        return date.toLocaleDateString(undefined, dateOption)
    }

    function drawRating(rating) {
        switch (rating) {
            case 1:
                return <p className='rating'>&#9733;</p>
            case 2:
                return <p className='rating'>&#9733;&#9733;</p>
            case 3:
                return <p className='rating'>&#9733;&#9733;&#9733;</p>
            case 4:
                return <p className='rating'>&#9733;&#9733;&#9733;&#9733;</p>
            default:
                return <p className='rating'>&#9733;&#9733;&#9733;&#9733;&#9733;</p>

        }
    }

    return reviews && Object.values(reviews).length ? (
        <ul className='reviews'>
            {Object.values(reviews).map(review =>
                <li key={review.id}>
                    <p className='author'>{reviews[review.id].author.firstname} {reviews[review.id].author.lastname}</p>
                    <p className='date'>{setDate(review)}</p>
                    {drawRating(review.rating)}
                    <p className='body' key={review.id}>{review.body}</p>
                    <ReviewUpdate review={review} trail={trail}/>
                </li>
            )}
        </ul>
    ) : null
}