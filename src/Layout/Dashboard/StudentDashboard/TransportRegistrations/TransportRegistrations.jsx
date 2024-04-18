import { useEffect, useState } from "react";
import TransportAuthorSingle from "./TransportAuthorSingle";
import Loader from "../../../../components/Loader/Loader";
 // Import your loader component

const TransportRegistrations = () => {
    const [transportAuthors, setTransportAuthors] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading status

    useEffect(() => {
        setLoading(true); // Set loading to true when data fetching starts
        fetch(`http://localhost:5000/transportAuthor`)
            .then(res => res.json())
            .then(data => {
                setTransportAuthors(data);
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch(error => {
                console.error('Error fetching transport authors:', error);
                setLoading(false); // Set loading to false if there's an error
            });
    }, []);

    return (
        <div  className="flex flex-col justify-center items-center ">
            {loading ? (
                <Loader /> // Render loader component if loading is true
            ) : (
                // Render transport author data once data is fetched
                transportAuthors.map(author => (
                    <TransportAuthorSingle key={author._id} x={author} />
                ))
            )}
        </div>
    );
};

export default TransportRegistrations;
