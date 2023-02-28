import './SignupForm.css';
import { useState } from "react";
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import Navigation from '../Navigation';

export default function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.signup({ email, firstname, lastname, password}))
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
    }

    return (
        <>
        <Navigation/>
        <form onSubmit={handleSubmit}>
            <div className="signup">
                <ul>{errors.map(error => <li key={error}>{error}</li>)}</ul>
                <div className="signupblock">
                    <img className='logo' src="logo.png" alt="Logo"/>
                    <h2>Sign up today to start planning <br/>your next adventure</h2>
                    <label className="firstname">
                        <input className="inputText"
                            type="text"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            required
                        />
                        <div className="prelabel" id='firstname'>
                            <span className="floating-label">First Name</span>
                        </div>
                    </label><br></br><br></br>
                    <label className="lastname">
                        <input className="inputText"
                            type="text"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            required
                        />
                        <div className="prelabel" id='lastname'>
                            <span className="floating-label">Last Name</span>
                        </div>
                    </label><br></br><br></br>
                    <label className="email">
                        <input className="inputText"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className="prelabel" id='email'>
                            <span className="floating-label">Email Address</span>
                        </div>
                    </label><br></br><br></br>
                    <label className="password">
                        <input className="inputText"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="prelabel" id='password'>
                            <span className="floating-label">Password</span>
                        </div>
                    </label><br></br><br></br>
                    <button type="submit">Sign Up</button><br></br><br></br>
                    <div className="linkLogin">
                        Already have an account? <Link to='/login'>Log in</Link>
                    </div>
                </div>
            </div>
        </form>
        </>
    );
}