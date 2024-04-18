import { useState, useEffect } from 'react';
import Loader from '../../../../components/Loader/Loader';
import { Link } from 'react-router-dom';
import AdmissionCalculate from './AdmissionCalculate';


const ManageAdmission = () => {
    const [Admission, setAdmission] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAdmission = async () => {
        try {
            const response = await fetch(' http://localhost:5000/admission');
            const data = await response.json();
            setAdmission(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching :', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmission();
    }, []);

    const renderRows = () => {
        return Admission.map((a, index) => (
            <tr key={a._id} className={index % 2 === 0 ? 'bg-blue-200' : 'bg-blue-100'}>
                <td>
                    <div className="flex items-center gap-3">
                        <div className="">
                            <div className=" w-16 h-16 ">
                                <img className='border-4 rounded-full border-slate-400' src={a.image} alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">{a.YourName}</div>
                            <div className="text-sm opacity-50 font-bold">{a.Address}</div>
                        </div>
                    </div>
                </td>
                <td className='font-bold'>
                    {a.Email}
                    <br />
                    <span className="badge badge-ghost badge-sm font-bold bg-slate-600 text-white p-3">{a.PhoneNumber}</span>
                </td>
                <td className='font-bold'>{a.Subject}</td>
                <th>
                    <Link to={`/Admission/${a._id}`}><button className='btn btn-outline'>Full Details</button></Link>
                </th>
            </tr>
        ));
    };

    

    return (
        <div>
        <AdmissionCalculate></AdmissionCalculate>
            {loading && <Loader />}
            {!loading && (
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className="bg-slate-500 font-bold text-white text-lg">
                                <th>Name</th>
                                <th>Contact</th>
                                <th>Subject</th>
                                <th>View Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderRows()}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageAdmission;
