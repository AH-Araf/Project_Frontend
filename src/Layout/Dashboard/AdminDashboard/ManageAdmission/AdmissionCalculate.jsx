import  { useState, useEffect } from 'react';
import axios from 'axios';

const AdmissionCalculate = () => {
    const [admissionData, setAdmissionData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(' http://localhost:5000/admission');
            setAdmissionData(response.data);
        } catch (error) {
            console.error('Error fetching admission data: ', error);
        }
    };

    // Calculate total students for admission and for each subject
    const calculateAdmissionStats = () => {
        let totalStudents = admissionData.length;
        let subjectCounts = admissionData.reduce((acc, student) => {
            acc[student.Subject] = (acc[student.Subject] || 0) + 1;
            return acc;
        }, {});

        return { totalStudents, subjectCounts };
    };

    const { totalStudents, subjectCounts } = calculateAdmissionStats();

    return (
        <div className='flex justify-evenly font-bold text-2xl py-2 text-white bg-emerald-600 my-2 '>
            <p>Total: {totalStudents}</p>
            <p>CSE: {subjectCounts['CSE'] || 0}</p>
            <p>EEE: {subjectCounts['EEE'] || 0}</p>
            <p>CE: {subjectCounts['CE'] || 0}</p>
            <p>BBA: {subjectCounts['BBA'] || 0}</p>
            <p>LLB: {subjectCounts['LLB'] || 0}</p>
            <p>ENG: {subjectCounts['ENG'] || 0}</p>
        </div>
    );
};

export default AdmissionCalculate;
