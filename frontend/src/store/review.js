import csrfFetch from "./csrf";

export const RECIEVE_REVIEWS = `reviews/RECIEVE_REVIEWS`;
export const RECIEVE_REVIEW = `reviews/RECIEVE_REVIEW`;
export const REMOVE_REVIEW = `reviews/REMOVE_REVIEW`;

export const recieveReviews = (reviews) => {
    return {
        type: RECIEVE_REVIEWS,
        reviews
    }
}

export const recieveReview = (review) => {
    return {
        type: RECIEVE_REVIEW,
        review
    }
}

export const removeReview = (reviewId) => {
    return {
        type: REMOVE_REVIEW,
        reviewId
    }
}

export const getReviews = (store) => {
    return store.reviews ? Object.values(store.reviews) : []
}

export const getReview = (reviewId) => (store) => (
    store.reviews ? store.reviews[reviewId] : null
)

export const fetchReviews = (trailId) => async (dispatch) => {
    const response = await csrfFetch(`/api/trails/${trailId}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        // storeReviews(reviews);
        dispatch(recieveReviews(reviews));
    }
}

export const createReview = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    })
    if (response.ok) {
        const newReview = await response.json()
        dispatch(recieveReview(newReview))
    }
}

export const updateReview = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const newReview = await response.json();
        dispatch(recieveReview(newReview))
    }
}


export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(removeReview(reviewId))
    }
}

// const storeReviews = reviews => {
//     if (reviews) {
//         let newReviews = {};
//         reviews.forEach(review => {
//             newReviews[review.id] = review;
//         })
//         sessionStorage.removeItem("reviews")
//         sessionStorage.setItem("reviews", JSON.stringify(newReviews));
//     }
//     else sessionStorage.removeItem("reviews");
// }

// const unstoreReviews = reviews => {
//     if (reviews) {
//         let newReviews = {};
//         reviews.forEach(review => {
//             newReviews[]
//         })
//     }
// }

let initialState = JSON.parse(sessionStorage.getItem("reviews"));

export default function reviewsReducer(oldState=initialState, action) {
    let newState = {...oldState};
    switch (action.type) {
        case RECIEVE_REVIEWS:
            console.log(action)
            return action.reviews;
        case RECIEVE_REVIEW:
            newState[action.review.id] = action.review
            return newState;
        case REMOVE_REVIEW:
            delete newState[action.reviewId]
            return newState;
        default:
            return oldState;
    }
}