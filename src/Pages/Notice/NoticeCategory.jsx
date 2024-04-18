/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const NoticeCategory = ({ a }) => {
    const { title, link, description, types, date, _id } = a;

    // Function to truncate description to first 20 characters
    const truncateDescription = (description) => {
        if (description.length > 20) {
            return description.substring(0, 100) + "...";
        } else {
            return description;
        }
    };

    // Function to format the date string
    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);
        return dateObject.toDateString(); // Convert date to a human-readable string
    };

    return (
        <div>
            <div className='Notice-single-category' data-aos="fade-up">
                <h4 className="text-lg font-bold bg-slate-300 p-1">{title}</h4>
                <div className="mt-2">
                    <p><span className='font-bold'>Category:</span> <span className=''>{types}</span></p>
                    <p><span className='font-bold'>Date:</span> <span className=''>{formatDate(date)}</span></p>
                    <p className='mt-1 mb-1'>
                        <span className='font-bold me-2'>Link:</span>
                        <a className='text-blue-700 font-bold text-sm' href={link} target="_blank" rel="noopener noreferrer">Documents</a>
                    </p>
                    <p className='text-justify'><span className='font-bold'>Description:</span> <span >{truncateDescription(description)}</span></p>
                </div>
                <Link to={`/Notice/${_id}`}><button className='btn btn-outline mt-5'>View Details</button></Link>
            </div>
        </div>
    );
};

export default NoticeCategory;

