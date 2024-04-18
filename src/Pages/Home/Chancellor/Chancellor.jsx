import vc from '../../../assets/home/cheif/vc.jpg'
import img1 from '../../../assets/home/cheif/Mohammed Shahabuddin.png';
import img2 from '../../../assets/home/cheif/smShafiuddin.jpg';
import img3 from '../../../assets/home/cheif/Major General Mohammad Jahangir Alam.png';

const Chancellor = () => {
    return (
        <div>

            {/* VC----------------- */}
            <div className="flex m-6">
                <div className='lg:w-1/2 ms-16'>
                    <img className='h-[400px] ' src={vc} alt="" />
                    <h2 className='text-2xl w-[590px] py-1 hover:text-orange-200 font-medium bg-green-900 text-white text-center'>Brigadier General Md Habibul Huq, psc, PhD</h2>
                </div>

                <div className='lg:w-1/2 me-16 mt-24'>
                    <h1 className="text-3xl font-bold  text-center "><span className='text-orange-700 '>Vice Chancellor`s</span> Welcome</h1>
                    <p className='text-center text-justify text-gray-600 ml-4 mt-6 w-[550px]'>Welcome to our website. It is my privilege to serve as the Vice-Chancellor of the Bangladesh Army International University of Science and Technology. I am committed to sustaining academic excellence and enhancing the overall quality of student life at our esteemed institution.
                    </p>
                    <p className='text-center mt-2 text-black'>-Vice Chancellor, BAIUST</p>
                </div>
            </div>


            {/* -------------cheif */}
            <div className='flex m-20 gap-8 ml-36'>
                {/* ------------- */}
                <div className='border border-gray-300 w-[370px] shadow hover:border-2 hover:shadow-lg'>
                    <div className='border border-blue-100 m-2'>
                        <img className=' h-[250px] w-[350px] m-2 ml-0 ' src={img1} alt="" />
                    </div>
                    <div className='p-4'>
                        <h1 className=' font-black '>Mohammed Shahabuddin</h1>
                        <h2>Chancellor</h2>
                        <p>President of the People`s Republic of Bangladesh</p>

                    </div>
                </div>

                {/* ---------------- */}

                {/* ------------- */}
                <div className='border border-gray-300 w-[370px] shadow hover:border-2 hover:shadow-lg'>
                    <div className='border border-blue-100 m-2'>
                        <img className=' h-[250px] w-[300px] m-2 ml-6 ' src={img2} alt="" />
                    </div>
                    <div className='p-4'>
                        <h1 className=' font-black '>General S M Shafiuddin Ahmed</h1>
                        <h2>SBP (BAR), OSP, ndu, psc, PhD</h2>
                        <p>Chairman of BoT</p>
                        <p>Chief of Army Staff</p>

                    </div>
                </div>

                {/* ---------------- */}

                {/* ------------- */}
                <div className='border border-gray-300 w-[370px] shadow hover:border-2 hover:shadow-lg'>
                    <div className='border border-blue-100 m-2'>
                        <img className=' h-[250px] w-[300px] m-2 ml-6 ' src={img3} alt="" />
                    </div>
                    <div className='p-4'>
                        <h1 className=' font-black '>Major General Mohammad Jahangir Alam </h1>
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