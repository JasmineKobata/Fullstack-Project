import './ExplorePage.css';
import Navigation from '../Navigation';
import TrailMapWrapper from '../Map';
import TrailsList from '../TrailIndex';

export default function ExplorePage() {
    return (
        <>
            <div className='test'>
            <Navigation/>
            
            {/* <TrailMapWrapper/> */}
            <TrailsList/>
            </div>
        </>
    )
}