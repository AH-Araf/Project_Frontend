import { NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BiLogOut } from "react-icons/bi";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import Loader from '../../../components/Loader/Loader';

const StudentDashNavProfile = () => {
    const { user, logOut } = useContext(AuthContext);
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [studentData, setStudentData] = useState(null); // State to store student data

    useEffect(() => {
        setLoading(true); // Set loading to true when data fetching starts
        fetch(`http://localhost:5000/userStudents?Email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setStudentData(data);
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch(error => {
                console.error('Error fetching student data:', error);
                setLoading(false); // Set loading to false if there's an error
            });
    }, [user?.email]);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <h1 ></h1>
            <li tabIndex={0}>
                <details>
                    <summary className="flex justify-center mb-2 bg-slate-500 text-black font-bold text-lg">Student Dashboard</summary>
                    <ul className="p-2 bg-opacity-30 bg-gray-600 text-white dropdown-box mb-2">
                        <li><NavLink to="/"><AiOutlineHome /> Home</NavLink></li>
                        {
                            user ? (
                                <li onClick={handleLogOut}><NavLink to="/"><BiLogOut />LogOut</NavLink></li>
                            ) : (
                                <li><NavLink to="/studentLogin">Login</NavLink></li>
                            )
                        }
                    </ul>
                </details>
            </li>
            {loading ? (
                <Loader /> // Render loader component if loading is true
            ) : (
                studentData.map(x => (
                    <div key={x._id}>
                        <div className="flex justify-center mb-2"><img className="h-20 w-20 rounded-full" src={x.image} alt="" /></div>
                    </div>
                ))
            )}

            <div className="flex w-full font-bold">
                <div className="grid h-20 flex-grow  place-items-start">
                    <p>Name:</p>
                    <p>ID:</p>
                    <p>Department:</p>
                </div>
                <div className="divider divider-horizontal"></div>
                {!loading &&
                    studentData.map(x => (
                        <div key={x._id}>
                            <div className="grid h-20 flex-grow card  place-items-start">
                                <p>{x.Name}</p>
                                <p>{x.Id}</p>
                                <p>{x.Department}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default StudentDashNavProfile;
