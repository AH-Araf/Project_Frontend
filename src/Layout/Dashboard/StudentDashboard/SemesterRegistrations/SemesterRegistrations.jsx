import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import SemesterRegComp from "./SemesterRegComp";


const SemesterRegistrations = () => {

    const { user } = useContext(AuthContext);
    const [student, setStudent] = useState([]);
    useEffect(() => {
        fetch(` http://localhost:5000/userStudents?Email=${user?.email}`)
            .then(res => res.json())
            .then(data => setStudent(data))
            .catch(error => console.error("Error fetching student data:", error));
    }, [user?.email]);

    return (
        <div>
            <p className="text-xl text-center my-2 bg-emerald-100 py-1 font-semibold">Semester Registrations Going On</p>

            <div >
                {student.map(x => (
                    <SemesterRegComp key={x._id}
                        x={x}>
                    </SemesterRegComp>
                ))}
            </div>

        </div>
    );
};


export default SemesterRegistrations;