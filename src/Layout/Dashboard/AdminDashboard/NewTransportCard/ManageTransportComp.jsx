import { useEffect, useState } from "react";
import ManageTransportSingleComp from "./ManageTransportSingleComp";
import Loader from "../../../../components/Loader/Loader";

const ManageTransportComp = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/transportAuthor`)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false); // Set loading to false once data is fetched
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false); // Set loading to false in case of error
            });
    }, []);

    return (
        <div className="flex flex-col justify-center items-center ">
            {loading ? (
                <Loader />
            ) : (
                data.map(x => (
                    <ManageTransportSingleComp key={x._id} x={x} />
                ))
            )}
        </div>
    );
};

export default ManageTransportComp;
