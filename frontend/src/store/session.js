import csrfFetch, { storeCSRFToken } from "./csrf"

export const SET_SESSION = 'session/SET_SESSION'
export const REMOVE_SESSION = 'session/REMOVE_SESSION'

export const setSession = (session) => {
    return {
        type: SET_SESSION,
        session
    }
}

export const removeSession = () => {
    return {
        type: REMOVE_SESSION
    }
}

export const getSession = (store) => {
    return store.session ? store.session : null
}

const storeCurrentUser = user => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
    else sessionStorage.removeItem("currentUser");
}

export const signup = (user) => async (dispatch) => {
    const response = await csrfFetch(`/api/users`, {
        method: 'POST',
        body: JSON.stringify(user),
    })

    if (response.ok) {
        const data = await response.json();
        storeCurrentUser(data.user)
        dispatch(setSession(data));
    }
}

export const login = (session) => async (dispatch) => {
    const response = await csrfFetch(`/api/session`, {
        method: 'POST',
        body: JSON.stringify(session),
    });

    if (response.ok) {
        const session = await response.json();
        storeCurrentUser(session.user);
        dispatch(setSession(session))
    }
}

export const restoreSession = () => async (dispatch) => {
    const response = await csrfFetch(`/api/session`);

    if (response.ok) {
        storeCSRFToken(response);
        const session = await response.json();
        storeCurrentUser(session.user);
        dispatch(setSession(session))
    }
}

export const logout = () => async (dispatch) => {
    const response = await csrfFetch(`/api/session`, {
        method: 'DELETE'
    });

    if (response.ok) {
        storeCurrentUser(null);
        dispatch(removeSession());
    }
}

const initialState = { user: JSON.parse(sessionStorage.getItem("currentUser")) }

export default function sessionReducer(oldState=initialState, action) {
    const newState = {...oldState};

    switch (action.type) {
        case SET_SESSION:
            return {...newState, ...action.session};
        case REMOVE_SESSION:
            return {...newState, ...initialState}
        default:
            return oldState;
    }
}