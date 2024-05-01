import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { BiBookOpen } from "react-icons/bi";
import { AiOutlineCar, AiOutlineFundView, AiOutlineIdcard, AiOutlineUser, AiOutlineFileProtect } from "react-icons/ai";

// import { MdOutlinePayment } from "react-icons/md";
import { FaStreetView } from "react-icons/fa";

import Clock from "./Clock/Clock";
import { FaCertificate } from "react-icons/fa6";
import { AuthContext } from "../../../Providers/AuthProvider";
import axios from "axios";
import StudentDashNavProfile from "./StudentDashNavProfile";
import AdminDashNavProfile from "./AdminDashNavProfile";
import { FaRegClipboard } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { RiGalleryFill } from "react-icons/ri";
import { TiDocumentText } from "react-icons/ti";
import { FaUniversity } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { RiAdminFill } from "react-icons/ri";
import { MdEmojiTransportation } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";
import { PiExamBold } from "react-icons/pi";

const Dashboard = () => {

    const { user } = useContext(AuthContext)

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
            <div className="drawer lg:drawer-open bg-white text-black">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

                <div className="drawer-content "> {/* flex flex-col items-center justify-center */}
                    <label htmlFor="my-drawer-2" className="btn btn-ghost lg:hidden ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        <span>Open Dashboard</span>
                    </label>
                    <Outlet />
                </div>
                <div className="drawer-side" data-aos="fade-right">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-70 min-h-full bg-gray-600 text-white border-e-8 border-green-300">

                        {
                            isAdmin ? (
                                <>
                                    <AdminDashNavProfile />
                                    <div className="divider"></div>

                                    <li><NavLink to="/dashboard/ManageFaculty"><FaChalkboardTeacher />Manage Faculty</NavLink></li>
                                    <li><NavLink to="/dashboard/ManageImageGallery"><RiGalleryFill />Manage Image Gallery</NavLink></li>
                                    <li><NavLink to="/dashboard/ManageNotice"><TiDocumentText />Manage Notice</NavLink></li>
                                    <li><NavLink to="/dashboard/ManageAdmission"><FaUniversity />Manage Admission</NavLink></li>
                                    <li><NavLink to="/dashboard/ManageTransport"><MdEmojiTransportation />Manage Transport</NavLink></li>
                                    <li><NavLink to="/dashboard/TransportCard"><FaAddressCard />Transport Card</NavLink></li>
                                    <li><NavLink to="/dashboard/AddNewStudents"><PiStudentBold />Add New Students</NavLink></li>
                                    <li><NavLink to="/dashboard/CreateStudentProfile"><RiAdminFill />Create Student Profile</NavLink></li>
                                    <li><NavLink to="/dashboard/AllStudents"><FaStreetView />View All Students</NavLink></li>
                                    <li><NavLink to="/dashboard/AddCertificate"><TbCertificate />Add Certificate</NavLink></li>
                                    <li><NavLink to="/dashboard/ManageStudentResult"><PiExamBold />Manage Student Result</NavLink></li>
                                    <div className=" mt-10">
                                        <Clock></Clock>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <StudentDashNavProfile />
                                    <div className="divider"></div>

                                    <li className="mb-2"><NavLink to="/dashboard/StudentProfile"><AiOutlineUser></AiOutlineUser>Student Profile</NavLink></li>
                                    <li className="mb-2"><NavLink to="/dashboard/AllCourses"> <BiBookOpen></BiBookOpen>All Courses</NavLink></li>
                                    <li className="mb-2"><NavLink to="/dashboard/SemesterRegistrations"><AiOutlineFileProtect></AiOutlineFileProtect>Semester Registrations</NavLink></li>
                                    <li className="mb-2"><NavLink to="/dashboard/TransportRegistrations"><AiOutlineCar></AiOutlineCar>Transport Registrations</NavLink></li>
                                    <li className="mb-2"><NavLink to="/dashboard/AdmitCard"><AiOutlineIdcard></AiOutlineIdcard> Admit Card</NavLink></li>
                                    <li className="mb-2"><NavLink to="/dashboard/SemesterResult"><AiOutlineFundView></AiOutlineFundView>Semester Result</NavLink></li>
                                    <li className="mb-2"><NavLink to="/dashboard/Transcript"><FaCertificate />Transcript Download</NavLink></li>
                                    <li className="mb-2"><NavLink to="/notice"><FaRegClipboard />Notice Board</NavLink></li>
                                </>
                            )
                        }


                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
