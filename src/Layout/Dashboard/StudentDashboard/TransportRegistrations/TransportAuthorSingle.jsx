/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";


const TransportAuthorSingle = ({ x }) => {
    return (
        <div>
            <div className="m-5 shadow-xl p-8 bg-blue-50 rounded-xl">
                <p className="text-xl font-bold">Transport Registration is going on</p>
                <span><span className="font-bold">Session: </span>{x.session} - {x.year}</span>
                <p><span className="font-bold">Starts In:</span> {x.StartDate}</p>
                <p><span className="font-bold">Ends In:</span> {x.EndDate}</p>
                <div className="flex justify-center mt-8">
                    <Link to={`/transportAuthor/${x._id}`}><button className='btn btn-outline btn-info font-bold'>Register Now</button></Link>
                </div>
            </div>
        </div>
    );
};

export default TransportAuthorSingle;