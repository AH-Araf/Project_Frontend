import { useState, useEffect } from 'react';
import axios from 'axios';

const AllStudentCalculate = () => {
    const [admissionData, setAdmissionData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(' http://localhost:5000/userStudent');
            setAdmissionData(response.data);
        } catch (error) {
            console.error('Error fetching admission data: ', error);
        }
    };

    const calculateAdmissionStats = () => {
        let totalStudents = admissionData.length;
        let subjectCounts = admissionData.reduce((acc, student) => {
            acc[student.Department] = (acc[student.Department] || 0) + 1;
            return acc;
        }, {});

        let genderCounts = admissionData.reduce((acc, student) => {
            acc[student.Gender] = (acc[student.Gender] || 0) + 1;
            return acc;
        }, {});

    
        return { totalStudents, subjectCounts, genderCounts };
    };

    const { totalStudents, subjectCounts, genderCounts } = calculateAdmissionStats();

    return (
        <div className=''>
            <div className='flex justify-evenly font-bold text-2xl py-2 text-white bg-emerald-600 my-2'>
                <p>Total: {totalStudents}</p>
                <p>CSE: {subjectCounts['CSE'] || 0}</p>
                <p>EEE: {subjectCounts['EEE'] || 0}</p>
                <p>CE: {subjectCounts['CE'] || 0}</p>
                <p>BBA: {subjectCounts['BBA'] || 0}</p>
                <p>LLB: {subjectCounts['LLB'] || 0}</p>
                <p>ENG: {subjectCounts['ENG'] || 0}</p>
            </div>
            <div className='flex justify-evenly font-bold text-2xl py-2 text-white bg-emerald-500 my-2'>
                <p>Male: {genderCounts['Male'] || 0}</p>
                <p>Female: {genderCounts['Female'] || 0}</p>
            </div>
        </div>
    );
};

export default AllStudentCalculate;
