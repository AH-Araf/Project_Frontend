import library from '../../../assets/home/ChooseB/Library.png';
import transport from '../../../assets/home/ChooseB/Transport.png';
import cafeteria from '../../../assets/home/ChooseB/Cafeteria.png';
import hall from '../../../assets/home/ChooseB/Hall.png';
import auditoriam from '../../../assets/home/ChooseB/Auditoriam.png';
import dinning from '../../../assets/home/ChooseB/Dinning.png';
import './ChooseB.css';
import { Link } from 'react-router-dom';

const ChooseB = () => {


    return (

        <div className='chooseB-Main'>
            {/* WHY CHOOSE BAIUST  text */}

            <div data-aos="fade-up" className='chooseB-Main1'>
                <h1 className='text-2xl font-bold'>WHY CHOOSE <span className='text-green-600'>BAIUST</span>?</h1>
                <p className='chooseB-Text'>
                    Choosing BAIUST means choosing a pathway to excellence. Led by a dedicated Vice-Chancellor, our institution offers a holistic student experience, blending rigorous academics with personalized support and a disciplined environment.
                    Our innovative Outcome-Based Education (OBE) ensures graduates are not just knowledgeable but highly employable, making BAIUST a dynamic choice for those seeking a quality education with a forward-looking approach.
                </p>
                <Link to="/about" target='_blank'><button className='hover:bg-green-900 border-2 text-lg text-green-900 border-green-900  w-[120px] rounded py-2 mt-6 hover:text-white'>More +</button></Link>
            </div>

            {/*  */}
            {/* WHY CHOOSE BAIUST  images */}
            <div className='chooseB-img'>
                <img data-aos="fade-right" src={library} alt="" />
                <img data-aos="fade-down" src={transport} alt="" />
                <img data-aos="fade-left" src={cafeteria} alt="" />
                <img data-aos="fade-right" src={auditoriam} alt="" />
                <img data-aos="fade-up" src={dinning} alt="" />
                <img data-aos="fade-left" src={hall} alt="" />
            </div>

        </div>

    );
};

export default ChooseB;