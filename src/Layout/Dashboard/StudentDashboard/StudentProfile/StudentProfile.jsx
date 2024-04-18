import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import SingleStudentProfile from "./SingleStudentProfile";
import Loader from "../../../../components/Loader/Loader"; // Import your loader component

const StudentProfile = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [students, setStudents] = useState([]); // State to store fetched students data

    useEffect(() => {
        setLoading(true); // Set loading to true when data fetching starts
        fetch(`http://localhost:5000/userStudents?Email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setStudents(data);
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch(error => {
                console.error('Error fetching student data:', error);
                setLoading(false); // Set loading to false if there's an error
            });
    }, [user?.email]);

    return (
        <div>
            {loading ? ( // Render loader component if loading is true
                <Loader />
            ) : (
                // Render student profiles once data is fetched
                students.map(student => (
                    <SingleStudentProfile key={student._id} x={student} />
                ))
            )}
        </div>
    );
};

export default StudentProfile;
