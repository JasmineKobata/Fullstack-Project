import csrfFetch from "./csrf";

export const RECIEVE_REVIEWS = `reviews/RECIEVE_REVIEWS`;

export const recieveReviews = (reviews) => {
    return {
        type: RECIEVE_REVIEWS,
        reviews
    }
}

export const getReviews = (store) => (
    store.reviews ? Object.values(store.reviews) : []
)

export const fetchReviews = (trailId) => async (dispatch) => {
    const response = await csrfFetch(`/api/trails/${trailId}/reviews`);
    if (response.ok) {
        const reviews = await response.json();
        storeReviews(reviews);
        dispatch(recieveReviews(reviews));
    }
}

const storeReviews = reviews => {
    if (reviews) {
        let newReviews = {};
        reviews.forEach(review => {
            newReviews[review.id] = review;
        })
        sessionStorage.setItem("reviews", JSON.stringify(newReviews));
    }
    else sessionStorage.removeItem("reviews");
}

let initialState = JSON.parse(sessionStorage.getItem("reviews"));

export default function reviewsReducer(oldState=initialState, action) {
    let newState = {...oldState};
    switch (action.type) {
        case RECIEVE_REVIEWS:
            Object.values(action.reviews).forEach(review => {
                newState[review.id] = review;
            })
            return newState;
        default:
            return oldState;
    }
}