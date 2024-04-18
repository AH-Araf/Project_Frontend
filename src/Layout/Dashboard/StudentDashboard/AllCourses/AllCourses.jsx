import  { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../../Providers/AuthProvider';
import CSECourse from '../../../../assets/Courses/CSECourses.pdf';
import EEECourse from '../../../../assets/Courses/EEECourses.pdf';
import CECourse from '../../../../assets/Courses/CECourses.pdf';
import BBACourse from '../../../../assets/Courses/BBACourses.pdf';
import LLBCourse from '../../../../assets/Courses/LLBCourses.pdf';
import ENGCourse from '../../../../assets/Courses/ENGCourses.pdf';

const AllCourses = () => {
    const [students, setStudents] = useState([]);
    const { user } = useContext(AuthContext);


    useEffect(() => {
        fetch(` http://localhost:5000/userStudents?Email=${user?.email}`)
            .then(res => res.json())
            .then(data => setStudents(data))
    }, [user?.email])

    const renderCourseDownloads = (department) => {
        switch (department) {
            case 'CSE':
                return <a className='btn btn-outline btn-info' href={CSECourse} download="CSECourses.pdf">Download CSE Courses</a>;
            case 'EEE':
                return <a className='btn btn-outline btn-info' href={EEECourse} download="EEECourses.pdf">Download EEE Courses</a>;
            case 'CE':
                return <a className='btn btn-outline btn-info' href={CECourse} download="CECourses.pdf">Download CE Courses</a>;
            case 'BBA':
                return <a className='btn btn-outline btn-info' href={BBACourse} download="BBACourses.pdf">Download BBA Courses</a>;
            case 'ENG':
                return <a className='btn btn-outline btn-info' href={ENGCourse} download="ENGCourses.pdf">Download ENG Courses</a>;
            case 'LLB':
                return <a className='btn btn-outline btn-info' href={LLBCourse} download="LLBCourses.pdf">Download LLB Courses</a>;
            default:
                return null;
        }
    };

    return (
        <div className='flex justify-center items-center h-[700px] bg-emerald-100'>
            <div data-aos="fade-up"
                data-aos-anchor-placement="bottom-bottom">
                {students.map(student => (
                    <div className='flex justify-center items-center flex-col bg-white rounded-xl py-20 px-10 shadow-2xl' key={student._id}>
                        <h3 className='font-bold text-2xl'>{student.Name}</h3>
                        <p className='font-bold mb-6'>Department: {student.Department}</p>
                        {renderCourseDownloads(student.Department)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllCourses;
