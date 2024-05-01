/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import Loader from "../../../../components/Loader/Loader";

const SemesterResult = () => {
    const { user } = useContext(AuthContext);

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading status

    useEffect(() => {
        setLoading(true); // Set loading to true when data fetching starts
        fetch(`http://localhost:5000/resultSheet?studentEmail=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setResults(data);
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch(error => {
                console.error('Error fetching results:', error);
                setLoading(false); // Set loading to false if there's an error
            });
    }, [user?.email]);


    // Function to calculate GPA based on marks
    const calculateGPA = (marks) => {
        if (marks >= 80) {
            return 'A+';
        } else if (marks >= 75) {
            return 'A';
        } else if (marks >= 70) {
            return 'A-';
        } else if (marks >= 65) {
            return 'B+';
        } else if (marks >= 60) {
            return 'B';
        } else if (marks >= 55) {
            return 'B-';
        } else if (marks >= 50) {
            return 'C+';
        } else if (marks >= 45) {
            return 'C';
        } else if (marks >= 40) {
            return 'D';
        } else {
            return 'F';
        }
    };

    return (
        <div>
            {loading ? (
                <Loader /> // Render loader component if loading is true
            ) : (
                // Render results once data is fetched
                results.map((result, index) => (
                    <div data-aos="zoom-out-up" className="m-10 font-bold shadow-xl rounded-sm" key={result._id}>
                        <div className="text-center text-lg bg-slate-200"><h2>{result.session}-{result.year}</h2></div>
                        <table className="table">
                            <thead>
                                <tr className="bg-slate-600 text-white">
                                    <th>Subject</th>
                                    <th>Marks</th>
                                    <th>Subject Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.subjects.map((subject, idx) => (
                                    <tr key={subject.name} className={idx % 2 === 0 ? 'bg-slate-400' : 'bg-slate-300'}>
                                        <td>{subject.name}</td>
                                        <td>{subject.marks}</td>
                                        <td>{calculateGPA(subject.marks)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="text-black">
                                    <td colSpan="2"><span className="font-bold text-lg">Total GPA:</span></td>
                                    <td className="font-bold text-lg">{result.gpa.toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                ))
            )}
        </div>
    );
};

export default SemesterResult;
