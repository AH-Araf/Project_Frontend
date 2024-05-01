import  { useState, useEffect } from 'react';
import Loader from '../../../../components/Loader/Loader';
import { Link } from 'react-router-dom';
import AllStudentCalculate from './AllStudentCalculate';

const AllStudents = () => {
    const [Admission, setAdmission] = useState([]);
    const [loading, setLoading] = useState(true);
    const [departmentFilter, setDepartmentFilter] = useState('All');
    const [idFilter, setIdFilter] = useState('');

    const fetchAdmission = async () => {
        try {
            const response = await fetch(' http://localhost:5000/userStudent');
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

    const handleDepartmentChange = (e) => {
        setDepartmentFilter(e.target.value);
    };

    const handleIdChange = (e) => {
        setIdFilter(e.target.value);
    };

    const renderRows = () => {
        let filteredAdmission = Admission;

        // Apply department filter
        if (departmentFilter !== 'All') {
            filteredAdmission = filteredAdmission.filter(student => student.Department === departmentFilter);
        }

        // Apply ID filter
        if (idFilter !== '') {
            filteredAdmission = filteredAdmission.filter(student => student.Id.startsWith(idFilter));
        }

        return filteredAdmission.map((a, index) => (
            <tr key={a._id} className={index % 2 === 0 ? 'bg-slate-600' : 'bg-slate-700'}>
                <td>
                    <div className="flex items-center gap-3 text-white">
                        <div className="">
                            <div className=" w-16 h-16 ">
                                <img className='border-4 rounded-full border-slate-400' src={a.image} alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">{a.Name}</div>
                            <div className="text-sm  font-bold">{a.Id}</div>
                        </div>
                    </div>
                </td>
                <td className='font-bold text-white'>
                    {a.EnrolledSemester}
                    <br />
                    <span className="badge badge-ghost badge-sm font-bold bg-slate-600 mt-2 text-white p-3">{a.Department}</span>
                </td>
                <td className='font-bold'>{a.Subject}</td>
                <th>
                    <Link to={`/Student/${a._id}`}><button className='btn btn-white'>Full Details</button></Link>
                </th>
            </tr>
        ));
    };

    return (
        <div>
            <AllStudentCalculate></AllStudentCalculate>
            {loading && <Loader />}
            {!loading && (
                <div>
                    <div className="flex justify-evenly py-2  mb-4 font-bold shadow-2xl mx-8">
                        <div>
                            <label htmlFor="departmentFilter">Department: </label>
                            <select className='border-2 border-black'
                                id="departmentFilter"
                                value={departmentFilter}
                                onChange={handleDepartmentChange}
                            >
                                <option value="All">All</option>
                                <option value="CSE">CSE</option>
                                <option value="EEE">EEE</option>
                                <option value="CE">CE</option>
                                <option value="BBA">BBA</option>
                                <option value="LLB">LLB</option>
                                <option value="ENG">ENG</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="idFilter">ID: </label>
                            <input className='border-2 border-black'
                                type="text"
                                id="idFilter"
                                value={idFilter}
                                onChange={handleIdChange}
                            />
                        </div>
                    </div>
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
                </div>
            )}
        </div>
    );
};

export default AllStudents;
