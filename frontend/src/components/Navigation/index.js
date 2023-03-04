import './Navigation.css';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as sessionActions from '../../store/session';


export default function Navigation() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const buttonType = sessionUser ? 'Log out' : 'Log in'
    const [errors, setErrors] = useState([]);

    const handleButton = () => {
        if (sessionUser) {
            setErrors([]);
            dispatch(sessionActions.logout())
                .catch(async (res) => {
                    let data;
                    try {
                        data = await res.clone().json();
                    } catch {
                        data = await res.text();
                    }
                    if (data?.errors) setErrors(data.errors);
                    else if (data) setErrors([data]);
                    else setErrors([res.statusText]);
                });   
            window.location = "/"
        } else {
            window.location = "/login"
        }
    }

    return (
        <div className='navBackground'>
            <ul className='navTable'>
                <li>
                    <NavLink className="home" to="/">.</NavLink><br></br>
                </li>
                <li  className="explore">
                    <NavLink  className="exploreLink" to="/explore">Explore</NavLink>
                </li>
                <li className='button'>
                    <button className="navButton" onClick={handleButton}>{buttonType}</button>
                </li>
            </ul>
        </div>
    )
}