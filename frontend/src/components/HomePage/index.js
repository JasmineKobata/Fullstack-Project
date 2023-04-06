import './HomePage.css';
import Navigation from '../Navigation';
import { Redirect } from 'react-router-dom';

export default function HomePage() {
    return <Redirect to="/explore" />


    return (
        <>
            <Navigation/>
            <h1 className='splash'>Splash page in progress!</h1>
        </>
    )
}