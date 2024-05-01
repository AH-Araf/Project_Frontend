/* eslint-disable react/no-unknown-property */
import multimedia from '../../../assets/home/Facilities/multimedia.jpg';
import hall from '../../../assets/home/Facilities/hall.png';
import dining from '../../../assets/home/Facilities/dining.png';
import lab from '../../../assets/home/Facilities/lab.jpeg';
import transport from '../../../assets/home/Facilities/trasport.jpg';
import health from '../../../assets/home/Facilities/health.png';
import './Facilities.css';
// import { Link } from 'react-router-dom';
const Facilities = () => {

    return (
        <div className=' pb-6'>
            <div className="shadow-sm p-2 ">
                <h1 className="text-4xl font-bold text-center   mt-4 p-6">Our <span className='text-green-800'>Facilities</span> </h1>
                <p className="text-center mb-6">Our top-notch facilities ensure a conducive environment for student success.</p>
            </div>
            {/* ......... */}

            <div className='f-main-section'>
                <div data-aos="zoom-in-up">
                    <img src={multimedia} alt="" />
                    <h2>Multimedia Classroom</h2>
                    <p>Classrooms with advanced audio-visual tools and devices and other digital teaching aids</p>
                </div>
                <div data-aos="zoom-in-up">
                    <img src={hall} alt="" />
                    <h2>Residential Hall</h2>
                    <p>Comfortable and supportive living environment</p>
                </div>
                <div data-aos="zoom-in-up">
                    <img src={dining} alt="" />
                    <h2>Central Dining</h2>
                    <p>Providing well-balanced meals</p>
                </div>
            </div>

            <div className='f-main-section'>
                <div data-aos="zoom-in-up">
                    <img src={lab} alt="" />
                    <h2>Laboratory</h2>
                    <p>Latest tools and equipment for hands-on learning experiences</p>
                </div>
                <div data-aos="zoom-in-up">
                    <img src={transport} alt="" />
                    <h2>Transport</h2>
                    <p>Convenient commuting for non-resident students</p>
                </div>
                <div data-aos="zoom-in-up">
                    <img src={health} alt="" />
                    <h2>Day Care Center</h2>
                    <p>Childcare services for the convenience of student parents and faculty members</p>
                </div>
            </div>

            {/* ... */}



            <div className='youtube-section'>
                <div className='mt-20 ml-20 border-orange-400 border-2 rounded-md shadow-lg'>
                    <iframe width="460" height="300" src="https://www.youtube.com/embed/8YWYxqaFPVo?si=3i3YAuq7Ae-36sHs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>

                <div className='mt-28 p-16'>
                    <h1 className='mx-8 p-4 text-4xl text-center text-orange-400 font-bold'>Campus of </h1>
                    <p className='text-center  text-2xl  font-bold'>
                        Bangladesh Army International University of </p>
                    <p className='text-center  text-2xl  font-bold'> Science and Technology</p>
                </div>

            </div>

        </div>

    );
};

export default Facilities;