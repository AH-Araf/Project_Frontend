import vc from '../../../assets/home/cheif/vc.jpg'
import img1 from '../../../assets/home/cheif/Mohammed Shahabuddin.png';
import img2 from '../../../assets/home/cheif/smShafiuddin.jpg';
import img3 from '../../../assets/home/cheif/Major General Mohammad Jahangir Alam.png';

import './Chancellor.css'

const Chancellor = () => {
    return (
        <div>

            {/* VC----------------- */}
            <div data-aos="zoom-in" className="VC-Main">
                <div className=''>
                    <img className='' src={vc} alt="" />
                    <h2 className=''>Brigadier General Md Habibul Huq, psc, PhD</h2>
                </div>

                <div className=''>
                    <h1 className="text-xl font-bold mb-5"><span className='text-orange-700 '>Vice Chancellor`s</span> Welcome</h1>
                    <p className=''>Welcome to our website. It is my privilege to serve as the Vice-Chancellor of the Bangladesh Army International University of Science and Technology. I am committed to sustaining academic excellence and enhancing the overall quality of student life at our esteemed institution.
                    </p>
                    <p className='text-center mt-2 text-black font-bold mt-4'>-Vice Chancellor, BAIUST</p>
                </div>
            </div>


            <div data-aos="zoom-in" className='pqrst'>
                {/* ------------- */}
                <div className='pqr'>
                    <img className='' src={img1} alt="" />
                    <div className=''>
                        <h1 className=''>Mohammed Shahabuddin</h1>
                        <h2>Chancellor</h2>
                        <p>President of the People`s Republic of Bangladesh</p>
                    </div>
                </div>
                {/* ---------------- */}
                <div className='pqr'>
                    <img className='' src={img2} alt="" />
                    <div className=''>
                        <h1 className=''>General S M Shafiuddin Ahmed</h1>
                        <h2>SBP (BAR), OSP, ndu, psc, PhD</h2>
                        <p>Chairman of BoT</p>
                        <p>Chief of Army Staff</p>
                    </div>
                </div>
                {/* ------------- */}
                <div className='pqr'>
                    <img className='' src={img3} alt="" />
                    <div className=''>
                        <h1 className=''>Major General Mohammad Jahangir Alam </h1>
                        <h2>BSP, ndc, psc</h2>
                        <p>Member of BoT</p>
                        <p>GOC 33 Infantry Division and Commander,</p>
                        <p>Cumilla Area</p>
                    </div>
                </div>
                {/* ---------------- */}
            </div>

        </div>
    );
};

export default Chancellor;