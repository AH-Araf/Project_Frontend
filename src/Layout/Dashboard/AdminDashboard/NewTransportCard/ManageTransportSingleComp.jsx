/* eslint-disable react/prop-types */
import  { useEffect, useState } from "react";

const ManageTransportSingleComp = ({ x }) => {
    const { session, year,  _id } = x;

    const [apply, setApply] = useState([]);

    useEffect(() => {
        fetch(` http://localhost:5000/transportCardId?cID=${_id}`)
            .then(res => res.json())
            .then(data => setApply(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [_id]);

    return (
        <div className='m-6 p-6 border-2 bg-emerald-100 shadow-2xl'>
            <div className='text-xl font-bold text-slate-600'>
                <h4 className="title">Session: {session}</h4>
                <div>
                    <p><span className='title2'>Year:</span> <span className='title3'>{year}</span></p>
                </div>
            </div>

            <div className='border-2 border-black mt-1'>
                <h1 className='text-center mb-4 border-b-4 font-bold bg-slate-600 text-white border-green-300 mt-6'>Students</h1>
                <div className='overflow-y-auto h-56 ...'>
                    {apply.map((applicant, index) => (
                        <div key={index} className='p-2 m-2 grid grid-cols-2 bg-emerald-200'>
                            <div>
                                <img className='h-24 w-20 border-4 border-slate-400' src={applicant.cApplicant[0].image} alt="" />
                            </div>
                            <div className="text-sm">
                                <h1><span className="font-bold">Name: </span>{applicant.cApplicant[0].name} </h1>
                                <h1><span className="font-bold">ID: </span>{applicant.cApplicant[0].id} </h1>
                                <h1><span className="font-bold">Department: </span>{applicant.cApplicant[0].department} </h1>
                                {/* Add more fields as needed */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageTransportSingleComp;
