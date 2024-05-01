import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import banner1 from '../../../assets/home/banner/campus.png';
import banner2 from '../../../assets/home/banner/banner2.png';
import banner3 from '../../../assets/home/banner/banner3.png';
import banner4 from '../../../assets/home/banner/banner4.png';
import banner5 from '../../../assets/home/banner/banner5.png';
import banner6 from '../../../assets/home/banner/banner6.png';
// import banner7 from '../../../assets/banner/banner7.jpg';
import './Banner.css';

const Banner = () => {
    return (
        <div  >
            <Carousel >
                {/* react-responsive-carousel */}

                <div className="img-design">

                    <img className=" w-full h-full object-cover" src={banner1} alt="Banner" />
                    <div className="full-design">
                        <h1>Bangladesh Army International University of Science and Technology</h1> 
                        <p>Cumilla, Bangladesh</p>
                    </div>

                </div>
                <div className="img-design">

                    <img className=" w-full h-full object-cover" src={banner2} alt="Banner" />
                    <div className="full-design">
                        <h1>Bangladesh Army International University of Science and Technology</h1>
                        <p>Cumilla, Bangladesh</p></div>

                </div>
                <div className="img-design">
                    <img className=" w-full h-full object-cover" src={banner3} alt="Banner" />
                    <div className="full-design">
                        <h1>Bangladesh Army International University of Science and Technology</h1>
                        <p>Cumilla, Bangladesh</p></div>

                </div>
                <div className="img-design">
                    <img className=" w-full h-full object-cover" src={banner4} alt="Banner" />
                    <div className="full-design">
                        <h1>Bangladesh Army International University of Science and Technology</h1>
                        <p>Cumilla, Bangladesh</p></div>

                </div>
                <div className="img-design">
                    <img className=" w-full h-full object-cover" src={banner5} alt="Banner" />
                    <div className="full-design">
                        <h1>Bangladesh Army International University of Science and Technology</h1>
                        <p>Cumilla, Bangladesh</p></div>

                </div>
                <div className="img-design">
                    <img className=" w-full h-full " src={banner6} alt="Banner" />
                    <div className="full-design">
                        <h1>Bangladesh Army International University of Science and Technology</h1>
                        <p>Cumilla, Bangladesh</p></div>

                </div>
            </Carousel>
        </div>
    );
};


export default Banner;