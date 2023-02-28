import './HomePage.css';
import { useState } from "react";
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from "react-redux";
import Navigation from '../Navigation';

export default function HomePage() {
    // const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    // const [errors, setErrors] = useState([]);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setErrors([]);
    //     return dispatch(sessionActions.logout())
    //         .catch(async (res) => {
    //             let data;
    //             try {
    //                 data = await res.clone().json();
    //             } catch {
    //                 data = await res.text();
    //             }
    //             if (data?.errors) setErrors(data.errors);
    //             else if (data) setErrors([data]);
    //             else setErrors([res.statusText]);
    //         });   
    // }

    // let button = <div></div>;
    // if (sessionUser) {
    //     button = <div><button>Logout</button></div>
    // }

    return (
        <>
            <Navigation/>
            <h1>Home Page</h1>
        </>
    )
}