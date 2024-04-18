import { Link, useLoaderData } from "react-router-dom";

const SingleStudent = () => {
    const studentData = useLoaderData();

    // Destructuring studentData object
    const {
        Gender,
        Mobile,
        image,
        Name,
        Id,
        Department,
        EnrolledSemester,
        Email,
        Religion,
        BloodGroup,
        Nationality,
        FathersName,
        MothersName,
        Guardian,
        GuardiansNumber,
        Address,
        DateofBirth,
        GuardiansEmail
    } = studentData;

    
    return (
        <div className="flex flex-col items-center justify-center">
            {/* Image on top */}
            <img src={image} alt={Name} className="w-40 h-48  mt-10 mb-5 rounded-lg shadow-xl" />

            {/* Text details */}
            <div className="bg-blue-100 p-6 rounded-lg  w-1/3 shadow-2xl">
                <p className="text-xl font-bold mb-2">{Name}</p>
                <p><span className="font-bold">ID:</span> {Id}</p>
                <p><span className="font-bold">Gender:</span> {Gender}</p>
                <p><span className="font-bold">Mobile:</span> {Mobile}</p>
                <p><span className="font-bold">Email:</span> {Email}</p>
                <p><span className="font-bold">Department:</span> {Department}</p>
                <p><span className="font-bold">Enrolled Semester:</span> {EnrolledSemester}</p>
                <p><span className="font-bold">Religion:</span> {Religion}</p>
                <p><span className="font-bold">Blood Group:</span> {BloodGroup}</p>
                <p><span className="font-bold">Nationality:</span> {Nationality}</p>
                <p><span className="font-bold">Fathers Name:</span> {FathersName}</p>
                <p><span className="font-bold">Mothers Name:</span> {MothersName}</p>
                <p><span className="font-bold">Guardian:</span> {Guardian}</p>
                <p><span className="font-bold">Guardians Number:</span> {GuardiansNumber}</p>
                <p><span className="font-bold">Address:</span> {Address}</p>
                <p><span className="font-bold">Date of Birth:</span> {DateofBirth}</p>
                <p><span className="font-bold">Guardians Email:</span> {GuardiansEmail}</p>

                <div className="flex justify-center mt-6">
                    <Link to="/dashboard/AllStudents" className="btn-p">Back Page</Link>
                </div>
            </div>

           
        </div>
    );
};

export default SingleStudent;
