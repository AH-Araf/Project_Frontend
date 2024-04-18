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
        <div className='lg:flex text-center mt-10 text-justify '>
            {/* WHY CHOOSE BAIUST  text */}
            <div className='w-1/2 mt-20 sm:w-full'>
                <h1 className='text-3xl font-bold ms-48 m-4 font-sans'>WHY CHOOSE <span className='text-green-900'>BAIUST</span>  ?</h1>
                <p className='ms-20 me-10'>
                    Choosing BAIUST means choosing a pathway to excellence. Led by a dedicated Vice-Chancellor, our institution offers a holistic student experience, blending rigorous academics with personalized support and a disciplined environment.


                </p>

                <p className='mt-2 ms-20 me-10'>Our innovative Outcome-Based Education (OBE) ensures graduates are not just knowledgeable but highly employable, making BAIUST a dynamic choice for those seeking a quality education with a forward-looking approach.</p>
                <Link to="/about" target='_blank'><button className='hover:bg-green-900 border-2 text-lg text-green-900 border-green-900  w-[120px] rounded ms-72 py-2 mt-6 hover:text-white'>More +</button></Link>

            </div>
            {/* WHY CHOOSE BAIUST  images */}
            <div className='chooseB-img  w-1/2 sm:w-full'>

                <div className='flex'>
                    <img src={library} alt="" />
                    <img src={transport} alt="" />
                    <img src={cafeteria} alt="" />
                </div>
                <div className='flex'>
                    <img src={auditoriam} alt="" />
                    <img src={dinning} alt="" />
                    <img src={hall} alt="" />
                </div>

            </div>


            {/* -------------------- */}
        </div>
    );
};

export default ChooseB;