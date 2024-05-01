import  { useState } from 'react';
import QRCode from 'qrcode.react';

const CertificateVerificationComp = () => {
    const [department, setDepartment] = useState('');
    const [studentId, setStudentId] = useState('');
    const [verificationMessage, setVerificationMessage] = useState('');
    const [certificate, setCertificate] = useState(null);


    const handleVerification = async () => {
        try {
            const response = await fetch(` http://localhost:5000/certificate/${department}/${studentId}`);
            const data = await response.json();

            if (response.ok) {
                setCertificate(data);
                setVerificationMessage('Verification Successful');
            } else {
                setCertificate(null);
                setVerificationMessage('Certificate not found for the provided Department and Student ID.');
            }
        } catch (error) {
            console.error('Error verifying certificate:', error);
            setVerificationMessage('An error occurred while verifying. Please try again later.');
            setCertificate(null);
        }
    };

    return (
        <div className='bg-blue-100 pb-20'>
            <h2 className='text-center text-3xl font-bold bg-slate-600 text-white py-2 mb-6'>Verify Student Certificate</h2>

            <div className='bg-white shadow-2xl py-6 mx-10 px-2 rounded-2xl'>
                <div className='flex justify-center items-center'>
                    <div>
                        <div className='my-5'>
                            <label className='me-[26px]' htmlFor="department">Department:</label>
                            <select
                                className='border-2 border-black w-52'
                                id="department"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                            >
                                <option value="">Select Department</option>
                                <option value="CSE">CSE</option>
                                <option value="EEE">EEE</option>
                                <option value="CE">CE</option>
                                <option value="BBA">BBA</option>
                                <option value="LLB">LLB</option>
                                <option value="ENG">ENG</option>
                            </select>
                        </div>

                        <div>
                            <label className='me-[36px]' htmlFor="studentId">Student ID:</label>
                            <input
                                className='border-2 border-black w-52'
                                type="text"
                                id="studentId"
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                            />
                        </div>
                    </div>
                </div>


                <div className='flex justify-center mt-6'>
                    <button className='btn btn-neutral' onClick={handleVerification}>Verify Now</button>
                </div>
                <p className='text-center mt-4 font-bold text-red-600 text-lg'>{verificationMessage}</p>
            </div>

            <div className='flex justify-center bg-white shadow-2xl py-5 mx-10 px-2 rounded-2xl mt-5'>
                {certificate && (
                    <div className='flex gap-x-40'>
                        <div>
                            <h3 className='mb-3 text-center text-lg font-semibold bg-slate-200'>Certificate Details:</h3>
                            <p className='font-bold text-sm'><span className='font-bold text-blue-600'>Student Name:</span> {certificate.StudentName}</p>
                            <p className='font-bold text-sm'><span className='font-bold text-blue-600'>Student ID:</span> {certificate.StudentId}</p>
                            <p className='font-bold text-sm'><span className='font-bold text-blue-600'>Session:</span> {certificate.Session}</p>
                            <p className='font-bold text-sm'><span className='font-bold text-blue-600'>Department:</span> {certificate.Department}</p>
                            <p className='font-bold mb-3 text-sm'><span className='font-bold text-blue-600'>CGPA:</span> {certificate.Point}</p>
                            <img className='border-2 border-black w-96 h-60 my-5 rounded-lg' src={certificate.image} alt="Certificate" />
                        </div>
                        

                        <div className='flex flex-col justify-evenly'>
                            <div className='bg-blue-50 p-2 shadow-xl rounded-lg flex flex-col justify-center items-center'>
                                <QRCode value={`Student Name: ${certificate.StudentName}, Student ID: ${certificate.StudentId}, Session: ${certificate.Session}, Department: ${certificate.Department}, CGPA: ${certificate.Point}`} />
                                <div>
                                    <p className='font-bold'>Scan QR Code For <br /> <span className='text-blue-600'>Student</span> Details</p>
                                </div>
                            </div>
                            <div className='bg-blue-50 p-2 shadow-xl rounded-lg flex flex-col justify-center items-center'>
                                <QRCode value={certificate.image} />
                                <div>
                                    <p className='font-bold'>Scan QR Code For <br /> <span className='text-blue-600'>Certificate</span> Details</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>


        </div>
    );
};

export default CertificateVerificationComp;
