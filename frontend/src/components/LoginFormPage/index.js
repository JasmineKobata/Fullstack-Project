import './LoginForm.css';
import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Navigation from '../Navigation'

export default function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ email, password }))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    try {
                       data = await res.text();
                    } catch {
                        data = await res;
                    }
                }
                
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data.toString()]);
                else setErrors([res.statusTest]);
            });
    }

    const demoLogin = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ email: "demo@user.io", password: "password" }))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusTest]);
        });
    }

    return (
        <>
        <Navigation/>
        <form className='loginForm' onSubmit={handleSubmit}>
            <div className="login">
                <ul>{errors.map(error => <li key={error}>{error}</li>)}</ul>
                <div className="innerblock">
                    <h2>Welcome Back.<br/>Log in and start exploring.</h2><br></br><br></br>
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
                    <button type="submit">Log In</button><br></br><br></br>
                    <div className="link">
                        Don't have an account? <Link to='/signup'>Sign up for free</Link>
                    </div><br></br>
                    <Link to='/' className="demoLink" onClick={demoLogin}>Log in as demo user</Link>
                </div>
            </div>
        </form>
        </>
    );
}