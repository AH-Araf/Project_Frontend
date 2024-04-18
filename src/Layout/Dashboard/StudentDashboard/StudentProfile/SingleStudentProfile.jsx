/* eslint-disable react/prop-types */
import image1 from '../../../../assets/image/baiust.jpg'
import { Parallax } from "react-parallax";


const SingleStudentProfile = ({x}) => {
    const {
        Gender,
        Mobile,
        image,
        Name,
        Id,
        Department,
        EnrolledSemester,
        Email,
        Religion,
        BloodGroup,
        Nationality,
        FathersName,
        MothersName,
        Guardian,
        GuardiansNumber,
        Address,
        DateofBirth,
        GuardiansEmail
    } = x;
    
    return (
        <div>
            <div>
                <Parallax
                    blur={{ min: -50, max: 40 }}
                    bgImage={image1}
                    bgImageAlt="the menu"
                    strength={200}
                >
                    <div className="hero h-[650px] " >
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-white">
                            <div className="flex flex-col justify-center items-center">
                                <img data-aos="fade-down"
                                    data-aos-easing="linear"
                                    data-aos-duration="1000" className='h-48 w-48 rounded-full' src={image} alt="" />
                                <div data-aos="fade-up"
                                    data-aos-easing="linear"
                                    data-aos-duration="1000">

                                    <h1 className="text-2xl font-bold uppercase"><span className='text-emerald-400'>ID:</span> {Id}</h1>
                                    <h1 className="mt-1 text-2xl font-bold uppercase"><span className='text-emerald-400'>Name:</span> {Name}</h1>
                                    <h1 className="mt-1 text-2xl font-bold uppercase"><span className='text-emerald-400'>Department:</span> {Department}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </Parallax>
            </div>

            <div>
                <h1 className='text-3xl font-bold text-center my-3 bg-emerald-500 text-white p-2'>Student Profile</h1>
            </div>

            <div className='flex justify-center  bg-purple-100'>
                <div className='w-2/4 p-4 shadow-2xl mb-20 bg-white mt-5 rounded-xl'>
                    <p data-aos="zoom-out-right" className='text-lg border-b-4 border-slate-300 py-1'><span className='font-bold text-slate-600'>Name: </span>{Name}</p>
                    <p data-aos="zoom-out-left" className='text-lg border-b-4 border-slate-300 py-1'><span className='font-bold text-slate-600'>Id: </span>{Id}</p>
                    <p data-aos="zoom-out-right" className='text-lg border-b-4 border-slate-300 py-1'><span className='font-bold text-slate-600'>Department: </span>{Department}</p>
                    <p data-aos="zoom-out-left" className='text-lg border-b-4 border-slate-300 py-1'><span className='font-bold text-slate-600'>Gender: </span>{Gender}</p>
                    <p data-aos="zoom-out-right" className='text-lg border-b-4 border-slate-300 py-1'><span className='font-bold text-slate-600'>DateofBirth: </span>{DateofBirth}</p>
                    <p data-aos="zoom-out-left" className='text-lg border-b-4 border-slate-300 py-1'><span className='font-bold text-slate-600'>Mobile: </span>{Mobile}</p>
                    <p data-aos="zoom-out-right" className='text-lg border-b-4 border-slate-300 py-1'><span className='font-bold text-slate-600'>Email: </span>{Email}</p>
                    <p data-aos="zoom-out-left" className='text-lg border-b-4 border-slate-300 py-1'><span className='font-bold text-slate-600'>EnrolledSemester: </span>{EnrolledSemester}</p>
                    <p data-aos="zoom-out-right" className='text-lg border-b-4 border-slate-300 py-1'><span className='font-bold text-slate-600'>Religion: </span>{Religion}</p>
                    <p data-aos="zoom-out-left" className='text-lg border-b-4 border-slate-300 py-1'><span className='font-bold text-slate-600'>BloodGroup: </span>{BloodGroup}</p>
                    <p data-aos="zoom-out-right" className='text-lg border-b-4 border-slate-300 py-1'><span className='font-bold text-slate-600'>Nationality: </span>{Nationality}</p>
                    <p data-aos="zoom-out-left" className='text-lg border-b-4 border-slate-300 py-1'><span className='font-bold text-slate-600'>FathersName: </span>{FathersName}</p>
                    <p data-aos="zoom-out-right" className='text-lg border-b-4 border-slate-300 py-1'><span className='font-bold text-slate-600'>MothersName: </span>{MothersName}</p>
                    <p data-aos="zoom-out-left" className='text-lg border-b-4 border-slate-300 py-1'><span className='font-bold text-slate-600'>Guardian: </span>{Guardian}</p>
                    <p data-aos="zoom-out-right" className='text-lg border-b-4 border-slate-300 py-1'><span className='font-bold text-slate-600'>GuardiansNumber: </span>{GuardiansNumber}</p>
                    <p data-aos="zoom-out-left" className='text-lg border-b-4 border-slate-300 py-1'><span className='font-bold text-slate-600'>Address: </span>{Address}</p>
                    <p data-aos="zoom-out-right" className='text-lg  py-1'><span className='font-bold text-slate-600'>GuardiansEmail: </span>{GuardiansEmail}</p>
                </div>
            </div>



        </div>
    );
};

export default SingleStudentProfile;