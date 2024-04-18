import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import jsPDF from 'jspdf';

const AdmitCard = () => {
    const { user } = useContext(AuthContext);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch(` http://localhost:5000/userStudents?Email=${user?.email}`)
            .then(res => res.json())
            .then(data => setStudents(data))
            .catch(error => console.error("Error fetching student data:", error));
    }, [user?.email]);

    const downloadAdmitCard = () => {
        const doc = new jsPDF();

        students.forEach((student, index) => {
            doc.text(`Term Final - Spring(2024)`, 10, (index * 100) + 10);
            doc.text(`Name: ${student.Name}`, 10, (index * 100) + 20);
            doc.text(`ID: ${student.Id}`, 10, (index * 100) + 30);
            doc.text(`Department: ${student.Department}`, 10, (index * 100) + 40);

            // Add image to the PDF
            const imgData = student.image;
            doc.addImage(imgData, 'JPEG', 10, (index * 100) + 50, 80, 80); // Adjust the position and size as needed
        });

        doc.save('admit_card.pdf');
    };

    return (
        <div className="bg-blue-100 h-[600px]">
            <p className="text-3xl font-bold text-white p-1 mb-5 text-center bg-emerald-600">Admit Card Is Ready</p>

            <div data-aos="zoom-in-left">
                {students.map(student => (
                    <div key={student._id}>
                        <div className="flex justify-center shadow-xl items-center gap-5 bg-red-200 m-16 p-5 h-48 rounded-lg">
                            <img className="w-24 h-24 rounded-full border-2 border-slate-600 shadow-lg" src={student.image} alt="" />
                            <div>
                                <p className="text-xl font-bold">Student Details</p>
                                <p><span className="font-bold">Students Name:</span> {student.Name}</p>
                                <p><span className="font-bold">Students ID:</span> {student.Id}</p>
                                <p><span className="font-bold">Department:</span> {student.Department}</p>
                                <p><span className="font-bold">Phone Number:</span> {student.Mobile}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white m-16 py-4 shadow-2xl rounded-xl">
                <div className="text-center mb-10 text-lg font-semibold">
                    <p><span className="font-bold text-slate-500">Exam:</span> Term Final</p>
                    <p><span className="font-bold text-slate-500">Semester:</span> Spring-2024</p>
                    <p className="font-bold text-slate-500">Download Card For Term Final</p>
                </div>

                <div data-aos="zoom-in-left" className="flex justify-center">
                    <button className="btn btn-error text-white shadow-2xl" onClick={downloadAdmitCard}>Download Admit Card</button>
                </div>
            </div>
        </div>
    );
};

export default AdmitCard;
