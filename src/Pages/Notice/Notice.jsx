import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import NoticeCategory from "./NoticeCategory";
import DatePicker from "react-datepicker"; // Import DatePicker component
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles
import './Notice.css'
import Loader from "../../components/Loader/Loader";

const Notice = () => {
    const notices = useLoaderData();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState(null); // State to hold selected date
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 600);

        return () => clearTimeout(timer);
    }, []);

    const filteredNotices = notices.filter(notice => {
        // Filter by search term
        if (searchTerm !== "" && !notice.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }

        // Filter by selected date
        if (selectedDate && new Date(notice.date).toDateString() !== selectedDate.toDateString()) {
            return false;
        }

        return true;
    });

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    if (loading) {
        return <Loader />;
    }


    return (
        <div>
            <div className='flex flex-col justify-center items-center gap-5'>

                <input
                    className='search-box'
                    type="text"
                    placeholder='Search Notices'
                    value={searchTerm}
                    onChange={event => setSearchTerm(event.target.value)}
                />
                <DatePicker
                    className="border-2 border-black rounded-lg text-center"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select date"
                />
            </div>
            <div className='display-flex m-3 all-Notices'>
                {filteredNotices.map(a => <NoticeCategory key={a._id} a={a} />)}
            </div>
        </div>
    );
};

export default Notice;

