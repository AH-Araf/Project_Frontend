import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import SingleTransportReg from "./SingleTransportReg";


const StuDetailsForTransReg = () => {

    const { user } = useContext(AuthContext);
    const [student, setStudent] = useState([])
    useEffect(() => {
        fetch(` http://localhost:5000/userStudents?Email=${user?.email}`)
            .then(res => res.json())
            .then(data => setStudent(data))
    }, [user?.email])

    return (
        <div>
            {
                student.map(transDetails => <SingleTransportReg
                    key={transDetails._id}
                    transDetails={transDetails}
                >
                </SingleTransportReg>)
            }
        </div>
    );
};

export default StuDetailsForTransReg;