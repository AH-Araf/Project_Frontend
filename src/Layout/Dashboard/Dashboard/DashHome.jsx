import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import axios from "axios";

const DashHome = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        axios.get(` http://localhost:5000/user?email=${user?.email}`)
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, [user?.email]);


    const isAdmin = userData.some(a => a.role === "admin");

    return (
        <div>
            {isAdmin ? (
                <div className="bg-blue-100">
                    <p className="text-3xl font-bold text-center py-2 text-white bg-emerald-600">Welcome To Admin Dashboard</p>
                    <div className="h-[550px] flex justify-center  items-center">

                        <ul className="text-xl bg-white  p-6 rounded-lg shadow-2xl">
                            {userData.map(user => (
                                <li key={user._id}>
                                    <p>Name: {user.name}</p>
                                    <p>Email: {user.email}</p>
                                    <p>Role: {user.role}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (

                    <div className="bg-blue-100">
                    <p className="text-3xl font-bold text-center py-2 text-white bg-emerald-600">Welcome To Student Dashboard</p>
                    <div className="h-[550px] flex justify-center  items-center">

                            <ul className="text-xl bg-white  p-6 rounded-lg shadow-2xl">
                            {userData.map(user => (
                                <li key={user._id}>
                                    <p>Name: {user.name}</p>
                                    <p>Email: {user.email}</p>
                                    <p>Role: {user.role}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashHome;
