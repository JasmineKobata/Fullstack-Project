import csrfFetch from "./csrf";

export const RECIEVE_PARK = `parks/RECIEVE_PARK`;

export const recievePark = (park) => {
    return {
        type: RECIEVE_PARK,
        park
    }
}

export const getPark = (parkId) => (store) => {
    return store.parks ? store.parks[parkId] : null
}

export const fetchPark = (parkId) => async (dispatch) => {
    const response = await csrfFetch(`/api/parks/${parkId}`);
    
    if (response.ok) {
        const park = await response.json();
        storeParks(park)
        dispatch(recievePark(park));
    }
}

const storeParks = park => {
    if (park) {
        let newParks = JSON.parse(sessionStorage.getItem("parks")) || {};
        newParks[park.id] = park;
        sessionStorage.setItem("parks", JSON.stringify(newParks));
    }
    else sessionStorage.removeItem("parks");
}

let initialState = JSON.parse(sessionStorage.getItem("parks"));

export default function parksReducer(oldState=initialState, action) {
    let newState = {...oldState};
    switch (action.type) {
        case RECIEVE_PARK:
            if (!newState[action.park.id])
               newState[action.park.id] = action.park;
            return newState;
        default:
            return oldState;
    }
}