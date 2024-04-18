import { Link } from 'react-router-dom';
import './Admission.css'
import Marquee from "react-fast-marquee";


const Admission = () => {
    return (
        <div>
            <div data-aos="zoom-in" className='bg-emerald-400  py-8'>
                <h1 className='text-3xl font-bold text-center'>Admission is Going on</h1>
                <p className='text-center text-xl font-bold text-slate-600'>Apply Now</p>
            </div>

            <div className='text-xl py-6 mx-8 text-slate-500 font-bold'>
                <Marquee>
                    Are you ready to embark on a journey of academic excellence and personal growth? Look no further than Bangladesh Army International University of Science and Technology (BAIUST), your gateway to a world-class education and a promising future. With a diverse range of programs tailored to meet the demands of  dynamic job market, BAIUST stands as a beacon of innovation and opportunity.
                </Marquee>
            </div>

            <div data-aos="flip-up" className='text-center mt-16 font-semibold border-4 border-emerald-400 mx-4 py-20 lg:mx-40 admission-hover'>
                <p className='text-2xl text-slate-600'>Admission for Spring-2024 Session</p>
                <p className='text-2xl text-slate-500'>CSE | EEE | CE | ICT | BBA | LLB | English | Economics</p>
                <h3 className='text-lg text-slate-400'>Discover Your Future at Bangladesh Army International University of Science and Technology (BAIUST)</h3>
                <div className='mt-10'>
                    <Link className='btn btn-outline btn-info' to='/admissionApply'>Apply Now</Link>
                </div>
            </div>



        </div>
    );
};

export default Admission;