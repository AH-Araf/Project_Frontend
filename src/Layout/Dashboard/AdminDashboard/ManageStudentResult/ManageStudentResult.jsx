/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Swal from 'sweetalert2';

const ManageStudentResult = () => {
    const [totalSubjects, setTotalSubjects] = useState(1); // Default to 1 subject
    const [studentID, setStudentID] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [session, setSession] = useState('Spring');
    const [year, setYear] = useState('');
    const [subjectData, setSubjectData] = useState([]);

    const handleSubjectChange = (e) => {
        setTotalSubjects(parseInt(e.target.value));
    };

    const handleStudentIDChange = (e) => {
        setStudentID(e.target.value);
    };

    const handleStudentEmailChange = (e) => {
        setStudentEmail(e.target.value);
    };

    const handleSessionChange = (e) => {
        setSession(e.target.value);
    };

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const handleSubjectDataChange = (index, key, value) => {
        const newData = [...subjectData];
        newData[index] = { ...newData[index], [key]: value };
        setSubjectData(newData);
    };

    const calculateGPA = () => {
        let totalCredits = 0;
        let totalGradePoints = 0;
        subjectData.forEach(subject => {
            const marks = parseInt(subject.marks);
            const credit = parseInt(subject.credit);
            totalCredits += credit;
            if (marks >= 80) {
                totalGradePoints += 4.00 * credit;
            } else if (marks >= 75) {
                totalGradePoints += 3.75 * credit;
            } else if (marks >= 70) {
                totalGradePoints += 3.50 * credit;
            } else if (marks >= 65) {
                totalGradePoints += 3.25 * credit;
            } else if (marks >= 60) {
                totalGradePoints += 3.00 * credit;
            } else if (marks >= 55) {
                totalGradePoints += 2.75 * credit;
            } else if (marks >= 50) {
                totalGradePoints += 2.50 * credit;
            } else if (marks >= 45) {
                totalGradePoints += 2.25 * credit;
            } else if (marks >= 40) {
                totalGradePoints += 2.00 * credit;
            } // No need to handle less than 40 since GPA is 0
        });

        return totalGradePoints / totalCredits;
    };

    const handleSubmit = () => {
        // Check if any subject data is empty
        if (subjectData.some(subject => !subject.name || !subject.credit || !subject.marks)) {
            Swal.fire({
                icon: 'error',
                title: 'Incomplete Subject Data',
                text: 'Please fill in all subject details.'
            });
            return;
        }

        // Calculate GPA
        const gpa = calculateGPA();

        // Assuming you want to send subject data to the API here
        fetch(' http://localhost:5000/result', {
            method: 'POST',
            body: JSON.stringify({
                studentID,
                studentEmail,
                session,
                year,
                subjects: subjectData,
                gpa
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                // Handle response
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Submission Successful!',
                        text: 'Results have been submitted successfully.'
                    });
                    // Clear input fields after submission
                    setStudentID('');
                    setStudentEmail('');
                    setSession('Spring');
                    setYear('');
                    setSubjectData([]);
                } else {
                    throw new Error('Submission failed');
                }
            })
            .catch(error => {
                // Handle error
                Swal.fire({
                    icon: 'error',
                    title: 'Submission Failed',
                    text: 'There was an error submitting the results.'
                });
            });
    };

    const renderSubjectInputs = () => {
        let inputs = [];
        for (let i = 0; i < totalSubjects; i++) {
            inputs.push(
                <div className='font-bold' key={i}>
                    <input className='border-2 border-slate-500 mb-2 me-2' type="text" placeholder="Subject Name" onChange={(e) => handleSubjectDataChange(i, 'name', e.target.value)} />
                    <input className='border-2 border-slate-500 mb-2 me-2' type="number" placeholder="Credit" onChange={(e) => handleSubjectDataChange(i, 'credit', e.target.value)} />
                    <input className='border-2 border-slate-500 mb-2' type="number" placeholder="Marks" onChange={(e) => handleSubjectDataChange(i, 'marks', e.target.value)} />
                </div>
            );
        }
        return inputs;
    };

    return (
        <div className='flex bg-emerald-50 pb-96 flex-col items-center justify-center '>
            <div  className='bg-white shadow-2xl mt-10 pb-36 p-10 rounded-xl'>
                <div data-aos="zoom-in-down" className='mt-5 flex flex-col gap-2 rounded-xl bg-emerald-50 shadow-lg p-4 font-bold'>
                    <input
                        className='border-2 border-black'
                        type="text"
                        placeholder="Student ID"
                        value={studentID}
                        onChange={handleStudentIDChange}
                    />

                    <input
                        className='border-2 border-black'
                        type="email"
                        placeholder="Student Email"
                        value={studentEmail}
                        onChange={handleStudentEmailChange}
                    />

                    <select className='border-2 border-black' value={session} onChange={handleSessionChange}>
                        <option value="Spring">Spring</option>
                        <option value="Fall">Fall</option>
                    </select>

                    <input
                        className='border-2 border-black'
                        type="text"
                        placeholder="Year"
                        value={year}
                        onChange={handleYearChange}
                    />
                </div>

                <br />
                <div data-aos="zoom-in-up" className=''>
                    <div className='text-center mb-5'>
                        <select className='mb-5 p-1 border-4 border-slate-500 rounded-md text-center' value={totalSubjects} onChange={handleSubjectChange}>
                            {[...Array(10).keys()].map(num => (
                                <option key={num + 1} value={num + 1}>{num + 1} Subjects</option>
                            ))}
                        </select>
                    </div>

                    {renderSubjectInputs()}
                </div>

                <div className='mt-7 text-center'>
                    <button className='btn btn-neutral' onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default ManageStudentResult;
