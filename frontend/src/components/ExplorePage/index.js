import './ExplorePage.css';
import Navigation from '../Navigation';
import TrailMapWrapper from '../Map';
import TrailsList from '../TrailIndex';

export default function ExplorePage() {
    return (
        <>
            <Navigation/>
            <h1>Explore Page</h1>
            <TrailMapWrapper/>
            <TrailsList/>
        </>
    )
}