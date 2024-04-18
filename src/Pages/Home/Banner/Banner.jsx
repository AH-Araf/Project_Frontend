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
                    <div className="absolute h-[400px]   w-[1200px] item-center p-6 text-center top-1/2 left-1/2 bg-opacity-50 bg-black transform -translate-x-1/2 -translate-y-1/2 text-white ">
                        <p className="mt-20  text-5xl font-bold">
                            Bangladesh Army International University of Science and Technology
                        </p>
                        <p className=" text-2xl font-bold mt-4">Cumilla, Bangladesh</p></div>

                </div>
                <div className="img-design">

                    <img className=" w-full h-full object-cover" src={banner2} alt="Banner" />
                    <div className="absolute h-[400px]   w-[1200px] item-center p-6 text-center top-1/2 left-1/2 bg-opacity-50 bg-black transform -translate-x-1/2 -translate-y-1/2 text-white ">
                        <p className="mt-20  text-5xl font-bold">
                            Bangladesh Army International University of Science and Technology
                        </p>
                        <p className=" text-2xl font-bold mt-4">Cumilla, Bangladesh</p></div>

                </div>
                <div className="img-design">
                    <img className=" w-full h-full object-cover" src={banner3} alt="Banner" />
                    <div className="absolute h-[400px]   w-[1200px] item-center p-6 text-center top-1/2 left-1/2 bg-opacity-50 bg-black transform -translate-x-1/2 -translate-y-1/2 text-white ">
                        <p className="mt-20  text-5xl font-bold">
                            Bangladesh Army International University of Science and Technology
                        </p>
                        <p className=" text-2xl font-bold mt-4">Cumilla, Bangladesh</p></div>

                </div>
                <div className="img-design">
                    <img className=" w-full h-full object-cover" src={banner4} alt="Banner" />
                    <div className="absolute h-[400px]   w-[1200px] item-center p-6 text-center top-1/2 left-1/2 bg-opacity-50 bg-black transform -translate-x-1/2 -translate-y-1/2 text-white ">
                        <p className="mt-20  text-5xl font-bold">
                            Bangladesh Army International University of Science and Technology
                        </p>
                        <p className=" text-2xl font-bold mt-4">Cumilla, Bangladesh</p></div>

                </div>
                <div className="img-design">
                    <img className=" w-full h-full object-cover" src={banner5} alt="Banner" />
                    <div className="absolute h-[400px]   w-[1200px] item-center p-6 text-center top-1/2 left-1/2 bg-opacity-50 bg-black transform -translate-x-1/2 -translate-y-1/2 text-white ">
                        <p className="mt-20  text-5xl font-bold">
                            Bangladesh Army International University of Science and Technology
                        </p>
                        <p className=" text-2xl font-bold mt-4">Cumilla, Bangladesh</p></div>

                </div>
                <div className="img-design">
                    <img className=" w-full h-full " src={banner6} alt="Banner" />
                    <div className="absolute h-[400px]   w-[1200px] item-center p-6 text-center top-1/2 left-1/2 bg-opacity-50 bg-black transform -translate-x-1/2 -translate-y-1/2 text-white ">
                        <p className="mt-20  text-5xl font-bold">
                            Bangladesh Army International University of Science and Technology
                        </p>
                        <p className=" text-2xl font-bold mt-4">Cumilla, Bangladesh</p></div>

                </div>
                {/* <div>
                    <img src={banner7} />
                    
                </div> */}
            </Carousel>
        </div>
    );
};

export default Banner;