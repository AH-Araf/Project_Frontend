import { Link } from 'react-router-dom';
import background from '../../assets/home/banner/admissionOffice.png';
import roadMap from '../../assets/map/map.png';
const Contact = () => {
    return (
        <div>
            <div>

                <img className='h-[400px] w-full' src={background} alt="" />

                <div className='absolute h-[300px] -mt-16 w-[1200px] item-center p-6 pt-16
top-1/2 left-1/2 bg-opacity-60 bg-black transform -translate-x-1/2 -translate-y-1/2 text-white'>

                    <p className='text-center text-6xl font-bold '>BAIUST</p>
                    <div className='flex text-center text-2xl font-bold gap-8 mt-10 ml-24'>
                        <p className='hover:text-yellow-300 '>Mobile: +8801756436655
                        </p>
                        <p className='hover:text-yellow-300 '>

                            Telephone: 02339334212

                        </p>
                        <p className='hover:text-yellow-300 '>
                            Mail: info@baiust.ac.bd</p>

                    </div>
                    <p className='text-end mt-16'>Address : Syedpur, Adarsha Sadar, Cumilla</p>
                </div>

            </div>

            {/* ----------------------------------------------------- */}

            {/* ------------------------------------------ */}
            <div className='mt-10 mx-20'>
                <h1 className='text-4xl font-bold text-center pb-3 mb-3'>Way to <span className='text-green-900'>Reach</span></h1>
                <div className='flex text-justify'>


                    <div className='h-[300px] w-[500px] p-5 m-2 border shadow-md hover:border-orange-200 hover:shadow-lg'>
                        <h1 className='my-4 font-bold text-center'>ঢাকা থেকে বাইউস্ট (বাসে)</h1>
                        <p>সায়দাবাদ বাস স্ট্যান্ড থেকে (Royal Coach/ASIA Line/ এশিয়া ট্রান্সপোর্ট ) কালাকচুয়া, Biroti Restrurent এর বিপরীত পাশে (দক্ষিণ) দিকে কালাকচুয়া, CNG /অটো রিকশা বাইউস্ট</p>
                    </div>
                    <div className='h-[300px] w-[500px] p-5 m-2 border shadow-md hover:border-orange-200 hover:shadow-lg'>
                        <h1 className='my-4 font-bold text-center'>চট্টগ্রাম থেকে বাইউস্ট (বাসে)</h1>
                        <p>অলংকার বাস স্ট্যান্ড (Tisha Plus/ গ্রাম বাংলা) থেকে বাস এ কালাকচুয়া, Biroti Restrurent এর বিপরীত পাশে (দক্ষিণ) দিকে কালাকচুয়া, CNG /অটো রিকশা বাইউস্ট</p>
                    </div>
                    <div className='h-[300px] w-[500px] p-5 m-2 border shadow-md hover:border-orange-200 hover:shadow-lg'>
                        <h1 className='my-4 font-bold text-center'>ট্রেনে বাইউস্ট</h1>
                        <p>ঢাকা/চট্রগ্রাম রেল স্টেশন থেকে কুমিল্লা রেল স্টেশন, , অটো রিকশা করে শাসনগাছা, মাইক্রো করে কালাকচুয়া - Biroti Restaurant এর বিপরীত পাশে (দক্ষিণ) দিকে কালাকচুয়া , CNG /অটো রিকশা বাইউস্ট।</p>
                    </div>
                    <div className='h-[300px] w-[500px] p-5 m-2 border shadow-md hover:border-orange-200 hover:shadow-lg'>
                        <h1 className='my-4 font-bold text-center'>বাইউস্ট বাস সার্ভিস</h1>
                        <p className='mt-16'>বাইউস্ট বাস শিডিউল অনুসারে নিদিষ্ট স্থান থেকে বাস ব্যবহার ।</p>
                    </div>


                </div>
            </div>

            <div className='flex'>
                <img className='ml-20 h-[500px] w-[700px]' src={roadMap} alt="" />
                <div className='font-bold text-justify mt-14 m-20 p-20 text-gray-600'>
                    <p>Its approximately 1.6 kilometer from Kalakchua. Please contact us for any query by <span className='text-green-800'>+8801756436655 </span> in Work timer. </p>
                    <p className='mt-4'>Sunday - Thursday: 09:00 -04:00</p>
                    <div className='ml-28 py-2 w-[220px] rounded-md text-center mt-6 bg-green-900'>
                        <Link className="bg-green-900  text-center rounded text-white font-bold" target="_blank" to='https://www.google.com/maps/search/baiust+google+map/@23.4631179,91.0576462,12z/data=!3m1!4b1?hl=en&entry=ttu' >Search Google Map</Link>
                    </div>
                </div>
            </div>



        </div>
    );
};

export default Contact;