import './FacultyDesign.css'

import { Link } from 'react-router-dom';
const Faculty = () => {
    return (
        <div className='mt-10'>
            <h1 className='text-5xl -mb-8 font-bold text-center'>Faculty of</h1>
            <div className='flex m-10 flex-col'>

                {/* -------ECE & HUM-------------        */}
                <div className='flex '>
                    {/* Faculty of Electrical and Computer Engineering (ECE) */}

                    <div className='border border-gray-150 p-4 w-1/2 m-2 shadow-lg'>
                        <p className='text-2xl font-bold text-center'> Electrical and Computer Engineering (ECE)</p>
                        <div className=''>
                            {/* <img className="h-[150px] w-[150px] border  rounded-full shadow-sm" src={ECE} alt="" /> */}
                            <div className='flex-col ms-6'>
                                <button className='hover:bg-green-900 border text-lg  text-green-900 border-green-900  w-[530px] rounded py-1 mt-2 hover:text-white'>
                                    <Link>Department of Computer Science and Engineering (CSE)</Link>

                                </button>
                                <button className='hover:bg-green-900 border text-lg text-green-900 border-green-900  w-[530px] rounded py-1 mt-2 hover:text-white'>
                                    <Link>Department of Electrical and Electronic Engineering (EEE)</Link>

                                </button>
                                <button className='hover:bg-green-900 border text-lg text-green-900 border-green-900  w-[530px] rounded py-1 mt-2 hover:text-white'>
                                    <Link>Department of Information and Communication Technology (ICT)</Link>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Faculty of Science and Humanities */}

                    {/* <img className="h-[150px] w-[150px] border  rounded-full shadow-sm" src={HUM} alt="" /> */}

                    <div className='border border-gray-150 p-4 w-1/2 m-2 shadow-lg'>
                        <p className='text-2xl font-bold text-center'>Science and Humanities</p>
                        <div className=''>
                            {/* <img className="h-[150px] w-[150px] border  rounded-full shadow-sm" src={ECE} alt="" /> */}
                            <div className='flex-col ms-6'>
                                <button className='hover:bg-green-900 border text-lg  text-green-900 border-green-900  w-[530px] rounded py-1 mt-2 hover:text-white'>
                                    <Link>Department of English
                                    </Link>

                                </button>
                                <button className='hover:bg-green-900 border text-lg text-green-900 border-green-900  w-[530px] rounded py-1 mt-2 hover:text-white'>
                                    <Link>Department of Law
                                    </Link>

                                </button>
                                <button className='hover:bg-green-900 border text-lg text-green-900 border-green-900  w-[530px] rounded py-1 mt-2 hover:text-white'>
                                    <Link>Department of Science and Humanities</Link>

                                </button>




                            </div>


                        </div>


                    </div>
                </div>
                {/* -----------------CE & Business-------- */}
                <div className='flex'>
                    {/* Faculty of Civil Engineering (CE) */}
                    <div className='border border-gray-150 p-4 w-1/2 m-2 shadow-lg'>
                        <p className='text-2xl font-bold text-center'>Faculty of Civil Engineering (CE)</p>
                        <div className=''>
                            {/* <img className="h-[150px] w-[150px] border  rounded-full shadow-sm" src={ECE} alt="" /> */}
                            <div className='flex-col ms-6'>
                                <button className='hover:bg-green-900 border text-lg  text-green-900 border-green-900  w-[530px] rounded py-1 mt-4 hover:text-white'>
                                    <Link>
                                        Department of Civil Engineering (CE)
                                    </Link>

                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Faculty of Business */}
                    <div className='border border-gray-150 p-4 w-1/2 m-2 shadow-lg'>
                        <p className='text-2xl font-bold text-center'>Business

                        </p>
                        <div className=''>
                            {/* <img className="h-[150px] w-[150px] border  rounded-full shadow-sm" src={ECE} alt="" /> */}
                            <div className='flex-col ms-6'>
                                <button className='hover:bg-green-900 border text-lg  text-green-900 border-green-900  w-[530px] rounded py-1 mt-2 hover:text-white'>
                                    <Link>Department of Business Administration
                                    </Link>

                                </button>
                                <button className='hover:bg-green-900 border text-lg text-green-900 border-green-900  w-[530px] rounded py-1 mt-2 hover:text-white'>
                                    <Link>Department of Economics
                                    </Link>

                                </button>

                            </div>


                        </div>


                    </div>
                </div>



            </div>




        </div>
    );
};

export default Faculty;