import { useState, useEffect } from 'react';
import Loader from '../../../../components/Loader/Loader';

const AddCertificateComp = () => {
    const [admission, setAdmission] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedId, setSelectedId] = useState('');

    const fetchAdmission = async () => {
        try {
            const response = await fetch(' http://localhost:5000/certificate');
            const data = await response.json();
            setAdmission(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmission();
    }, []);

    const renderRows = () => {
        let filteredAdmission = admission;

        if (selectedDepartment) {
            filteredAdmission = filteredAdmission.filter(a => a.Department === selectedDepartment);
        }

        if (selectedId) {
            filteredAdmission = filteredAdmission.filter(a => a.StudentId.toString().includes(selectedId));
        }

        return filteredAdmission.map((a, index) => (
            <tr key={a._id} className={index % 2 === 0 ? 'bg-blue-200' : 'bg-blue-100'}>
                <td>
                    <div className="flex items-center gap-3">
                        <div className="">
                            <div className="">
                                <img className='border-4 w-28 h-20  border-slate-400' src={a.image} alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>
                </td>

                <td className='font-bold'>
                    <div className="font-bold">{a.StudentName}</div>
                    <div className="text-sm opacity-50 font-bold">ID: {a.StudentId}</div>
                </td>

                <td className='font-bold'>
                    <p>Session: <span className='text-slate-500'>{a.Session}</span></p>
                    <p>Department: <span className='text-slate-500'>{a.Department}</span></p>
                </td>
                <th>
                    <p>CGPA: {a.Point}</p>
                    {/* <Link to={`/Admission/${a._id}`}><button className='btn btn-outline'>Full Details</button></Link> */}
                </th>
            </tr>
        ));
    };

    const handleDepartmentChange = (e) => {
        setSelectedDepartment(e.target.value);
    };

    const handleIdChange = (e) => {
        setSelectedId(e.target.value);
    };

    return (
        <div className='border-4 border-slate-500'>
            {loading && <Loader />}
            {!loading && (
                <div className="overflow-x-auto">
                    <div className="flex justify-evenly mb-4 bg-slate-300 py-1 border-4 border-slate-400">
                        <div className=' px-2 w-72'>
                            <label htmlFor="department" className="font-bold me-3">Select Department:</label>
                            <select id="department" value={selectedDepartment} onChange={handleDepartmentChange} className="border-2 border-black">
                                <option value="">All</option>
                                <option value="CSE">CSE</option>
                                <option value="EEE">EEE</option>
                                <option value="CE">CE</option>
                                <option value="BBA">BBA</option>
                                <option value="ENG">ENG</option>
                                <option value="LLB">LLB</option>
                            </select>
                        </div>
                        <div className=' px-2 w-80'>
                            <label htmlFor="studentId" className="font-bold me-3">Filter by ID:</label>
                            <input type="text" id="studentId" value={selectedId} onChange={handleIdChange} className="border-2 border-black" />
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr className="bg-slate-500 font-bold text-white text-lg">
                                <th>Certificate</th>
                                <th>Student</th>
                                <th>Details</th>
                                <th>CGPA</th>
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

export default AddCertificateComp;
