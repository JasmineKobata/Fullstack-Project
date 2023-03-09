import csrfFetch from "./csrf";
import { REMOVE_REVIEW } from "./review";

export const RECIEVE_TRAILS = `trails/RECIEVE_TRAILS`;
export const RECIEVE_TRAIL = `trails/RECIEVE_TRAIL`;

export const recieveTrails = (trails) => {
    return {
        type: RECIEVE_TRAILS,
        trails
    }
}

export const recieveTrail = (trail) => {
    return {
        type: RECIEVE_TRAIL,
        trail
    }
}

export const getTrails = (store) => (
    store.trails ? Object.values(store.trails) : []
)

export const getTrail = (trailId) => (store) => (
    store.trails ? store.trails[trailId] : null
)

export const fetchTrails = () => async (dispatch) => {
    const response = await csrfFetch(`/api/trails`);
    if (response.ok) {
        const trails = await response.json();
        storeTrails(trails);
        dispatch(recieveTrails(trails));
    }
}

export const fetchTrail = (trailId) => async (dispatch) => {
    const response = await csrfFetch(`/api/trails/${trailId}`);
    
    if (response.ok) {
        const trail = await response.json();
        dispatch(recieveTrail(trail));
    }
}

const storeTrails = trails => {
    if (trails) {
        let newTrails = {};
        trails.forEach(trail => {
            newTrails[trail.id] = trail;
        })
        sessionStorage.setItem("trails", JSON.stringify(newTrails));
    }
    else sessionStorage.removeItem("trails");
}

export const restoreTrails = () => async (dispatch) => {
    const response = await csrfFetch(`/api/trails`);

    if (response.ok) {
        const trails = await response.json();
        storeTrails(trails);
        dispatch(recieveTrails(trails))
    }
}

let initialState = JSON.parse(sessionStorage.getItem("trails"));

export default function trailsReducer(oldState=initialState, action) {
    let newState = {...oldState};
    switch (action.type) {
        case RECIEVE_TRAILS:
            Object.values(action.trails).forEach(trail => {
                newState[trail.id] = trail;
            })
            return newState;
        case RECIEVE_TRAIL:
            newState[action.trail.id] = action.trail;
            return newState;
        case REMOVE_REVIEW:
            console.log(newState, action)
            return newState;
        default:
            return oldState;
    }
}