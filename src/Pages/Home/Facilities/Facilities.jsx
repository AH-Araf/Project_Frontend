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

            <div className="flex ml-24 facility">
                {/* ....... */}
                <div className="h-[160px] flex w-[400px] m-2 border border-1 rounded-lg hover:shadow-lg">
                    <img className='h-[100px] w-[100px] mt-6 m-2 rounded-full' src={multimedia} alt="" />
                    <div className='mt-8'>
                        <h1 className='font-bold text-center'>Multimedia Classroom</h1>
                        <p className='m-4 text-justify'>Classrooms with advanced audio-visual tools and devices and other digital teaching aids</p>
                    </div>

                </div>
                <div className="h-[160px] flex w-[400px] m-2 border border-1 rounded-lg hover:shadow-lg">
                    <img className='h-[100px] w-[100px] mt-6 m-2 rounded-full' src={hall} alt="" />
                    <div className='mt-8'>
                        <h1 className='font-bold text-center'>

                            Residential Hall</h1>
                        <p className='m-4 text-justify'>Comfortable and supportive living environment</p>
                    </div>

                </div>
                <div className="h-[160px] flex w-[400px] m-2 border border-1 rounded-lg hover:shadow-lg">
                    <img className='h-[100px] w-[100px] mt-6 m-2 rounded-full' src={dining} alt="" />
                    <div className='mt-8'>
                        <h1 className='font-bold text-center'> Central Dining</h1>
                        <p className='m-4 text-justify'>Providing well-balanced meals</p>
                    </div>

                </div>
            </div>
            <div className="flex ml-24">
                <div className="h-[160px] flex w-[400px] m-2 border border-1 rounded-lg hover:shadow-lg">
                    <img className='h-[100px] w-[100px] mt-6 rounded-full' src={lab} alt="" />
                    <div className='mt-8'>
                        <h1 className='font-bold text-center'> Laboratory</h1>
                        <p className='m-4 text-justify'>
                            Latest tools and equipment for hands-on learning experiences</p>
                    </div>

                </div>
                <div className="h-[160px] flex w-[400px] m-2 border border-1 rounded-lg hover:shadow-lg">
                    <img className='h-[100px] w-[100px] m-2 mt-6 rounded-full' src={transport} alt="" />
                    <div className='mt-8'>
                        <h1 className='font-bold text-center'>
                            Transport</h1>
                        <p className='m-4 text-justify'>
                            Convenient commuting for non-resident students</p>
                    </div>

                </div>
                <div className="h-[160px] flex w-[400px] m-2 border border-1 rounded-lg hover:shadow-lg">
                    <img className='h-[100px] w-[100px] m-2 mt-6 rounded-full' src={health} alt="" />
                    <div className='mt-8'>
                        <h1 className='font-bold text-center'>
                            Day Care Center</h1>
                        <p className='m-4 text-justify'>
                            Childcare services for the convenience of student parents and faculty members</p>
                    </div>

                </div>
            </div>
            {/* ... */}

            {/* ...... */}
            {/* 
            Library
            Diverse collection of books, journals, and digital materials
            Health Care Center
            Comprehensive healthcare services
            Wifi & Tech
            Robust Wi-Fi and comprehensive technological support */}

            <div className='flex'>
                <div className='mt-20 ml-20 border-orange-400 border-2 rounded-md shadow-lg'>
                    <iframe width="660" height="315" src="https://www.youtube.com/embed/8YWYxqaFPVo?si=3i3YAuq7Ae-36sHs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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