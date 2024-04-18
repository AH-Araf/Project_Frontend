import { useEffect, useState } from 'react';
import './Card.css'; // Import your CSS file
import sig from '../../../../assets/image/sig.png';
import Loader from "../../../../components/Loader/Loader"; // Import Loader component

const NewTransportCard = () => {
    const [transportCards, setTransportCards] = useState([]);
    const [selectedSession, setSelectedSession] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        // Fetch data from API
        fetch('http://localhost:5000/transportCard')
            .then(response => response.json())
            .then(data => {
                setTransportCards(data);
                setLoading(false); // Set loading to false once data is fetched
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading to false in case of error
            });
    }, []);


    // Function to get the background color based on fee
    const getBackgroundColor = (fee) => {
        switch (fee) {
            case '8500':
                return 'bg-red-200 border-4 border-red-500';
            case '5500':
                return 'bg-blue-200 border-4 border-blue-500';
            case '4000':
                return 'bg-green-200 border-4 border-green-500';
            case '3500':
                return 'bg-yellow-200 border-4 border-yellow-500';
            default:
                return 'bg-gray-300'; // Default color if fee does not match any condition
        }
    };

    // Function to filter cards based on selected session, year, and department
    const filteredCards = transportCards.filter(card => {
        if (selectedSession && selectedYear && selectedDepartment) {
            return card.cSession === selectedSession && card.cYear === selectedYear && card.cApplicant.some(applicant => applicant.department === selectedDepartment);
        } else if (selectedSession && selectedYear) {
            return card.cSession === selectedSession && card.cYear === selectedYear;
        } else if (selectedSession && selectedDepartment) {
            return card.cSession === selectedSession && card.cApplicant.some(applicant => applicant.department === selectedDepartment);
        } else if (selectedYear && selectedDepartment) {
            return card.cYear === selectedYear && card.cApplicant.some(applicant => applicant.department === selectedDepartment);
        } else if (selectedSession) {
            return card.cSession === selectedSession;
        } else if (selectedYear) {
            return card.cYear === selectedYear;
        } else if (selectedDepartment) {
            return card.cApplicant.some(applicant => applicant.department === selectedDepartment);
        } else {
            return true; // Return all cards if no filters are applied
        }
    });

    // Function to print the transport cards
    const printCards = () => {
        window.print();
    };

    return (
        <div className="transport-cards-container">
            <h2 className="text-3xl bg-emerald-600 text-white text-center font-bold p-2 rounded-lg">All Cards</h2>
            <div className="filter-section flex justify-evenly font-bold bg-slate-400 my-2 py-2">
                <select value={selectedSession} onChange={(e) => setSelectedSession(e.target.value)}>
                    <option value="">Select Session</option>
                    <option value="Spring">Spring</option>
                    <option value="Fall">Fall</option>
                </select>
                <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                    <option value="">Select Year</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                </select>
                <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
                    <option value="">Select Department</option>
                    <option value="CSE">CSE</option>
                    <option value="EEE">EEE</option>
                    <option value="CE">CE</option>
                    <option value="BBA">BBA</option>
                    <option value="ENG">ENG</option>
                    <option value="LLB">LLB</option>
                </select>
            </div>
            {loading ? ( // Display loader if loading state is true
                <Loader />
            ) : (
                <div className="transport-cards okay m-16">
                    {/* Render filtered cards */}
                    {filteredCards.map(card => (
                        <div data-aos="zoom-in" className={`w-52 p-4 rounded-lg ${getBackgroundColor(card.fee)}`} key={card._id}>
                            {card.cApplicant.map(applicant => (
                                <div className="applicant" key={applicant.id}>
                                    <div className='flex justify-center mb-4'>
                                        <img className='h-20 w-16' src={applicant.image} alt={applicant.name} />
                                    </div>
                                    <p className='font-bold'>Name: {applicant.name}</p>
                                    <p>ID: {applicant.id}</p>
                                    <p>Department: {applicant.department}</p>
                                    <p>Mobile: {applicant.mobile}</p>
                                </div>
                            ))}
                            <span>Session: {card.cSession} - {card.cYear}</span>
                            <p>Fee: {card.fee}</p>
                            <img className='w-20 h-8 mt-4' src={sig} alt="" />
                            <p className='text-xs font-bold border-t-2 border-slate-300 text-blue-600'>Signature of Bus Co-Ordinator</p>
                        </div>
                    ))}
                </div>
            )}
            <div className="text-center mt-4 mb-4">
                <button onClick={printCards} className="btn btn-accent">Print Cards</button>
            </div>
        </div>
    );
};

export default NewTransportCard;
