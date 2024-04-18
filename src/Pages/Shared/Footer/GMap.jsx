import { Link } from 'react-router-dom';
import mapImage from '../../../assets/image/map3.png'

const GMap = () => {
    return (
        <div>
            <Link target='_blank' to="https://www.google.com/maps/place/Bangladesh+Army+International+University+of+Science+and+Technology+(BAIUST)/@23.3903623,90.0515583,327965m/data=!3m1!1e3!4m6!3m5!1s0x37547ddeb767559d:0x6cc867c2c24c8253!8m2!3d23.4659718!4d91.0970114!16s%2Fg%2F11nnz9n6b_!5m1!1e4?hl=en-US&entry=ttu"><img className='w-60 rounded-lg p-0.5 border-2 border-gray-800' src={mapImage} alt="" /></Link>
        </div>
    );
};

export default GMap;