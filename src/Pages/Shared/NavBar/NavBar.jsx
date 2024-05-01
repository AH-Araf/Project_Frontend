import { NavLink } from "react-router-dom";
import './NavBar.css'
import logo from '../../../../public/logo.png'
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";




const NavBar = () => {

    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <div className="navbar bg-green-100 text-green-900">
                <div className="navbar-start ">
                    <div className="dropdown ">
                        {/* lg:hidden */}
                        <label tabIndex={0} className="btn btn-ghost ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-green-100 rounded-box w-60">
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li tabIndex={0}>
                                <details>
                                    <summary>BAIUST</summary>
                                    <ul className="p-2 bg-opacity-30 bg-green-100 dropdown-box">
                                        <li><NavLink to="/faculty">Faculty</NavLink></li>
                                        <li><NavLink target="_blank" to="https://drive.google.com/file/d/1eafym5wCUU4iPJxMUYIHIjlZsbD8Jk0O/view">Academic Calender</NavLink></li>
                                        <li><NavLink target="_blank" to="https://drive.google.com/file/d/1RCNhKrqqajRDvfCqHdRCZAjum_MC76pB/view">News Letter</NavLink></li>
                                        {/* <li><NavLink to="/journal">Journal</NavLink></li> */}
                                        <li><NavLink to="/imageGallery">Image Gallery</NavLink></li>
                                        <li><NavLink to="/certificateVerification">Certificate Verification</NavLink></li>

                                    </ul>
                                </details>
                            </li>
                            <li><NavLink to="/notice">Notice</NavLink></li>
                            <li><NavLink to="/admission">Admission</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                            <li><NavLink to="/about">About</NavLink></li>
                            <li><NavLink to="/dashboard/dashhome">Dashboard</NavLink></li>

                            {
                                user ? <>
                                    <div className="flex justify-center items-center font-bold gap-4 text-white bg-red-500 px-4 rounded-lg">
                                        <button className="" onClick={handleLogOut}>LogOut</button>
                                        <p>{user?.displayName}</p>
                                    </div>
                                </> : <>
                                    <li tabIndex={0}>
                                        <details>
                                            <summary>Login</summary>
                                            <ul className="p-2 z-[1]  bg-green-100 dropdown-box">
                                                <li><NavLink to="/adminLogin">Faculty/Officers/Staffs</NavLink></li>
                                                <li><NavLink to="/studentLogin">Student</NavLink></li>
                                                {/* <li><NavLink to="/register">Register</NavLink></li> */}
                                            </ul>
                                        </details>
                                    </li>
                                </>
                            }

                        </ul>
                    </div>
                    {/* <a className="btn btn-ghost normal-case text-xl">BAIUST</a> */}
                    <img className="h-16 w-14" src={logo} alt="" />
                </div>



                {/* Large Device */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">

                        <li><NavLink to="/">Home</NavLink></li>

                        <li tabIndex={0}>
                            <details>
                                <summary>BAIUST</summary>
                                <ul className="p-2 z-[1]  bg-green-100 dropdown-box">
                                    <li><NavLink to="/faculty">Faculty</NavLink></li>
                                    <li><NavLink target="_blank" to="https://drive.google.com/file/d/1eafym5wCUU4iPJxMUYIHIjlZsbD8Jk0O/view">Academic Calender</NavLink></li>
                                    <li><NavLink target="_blank" to="https://drive.google.com/file/d/1RCNhKrqqajRDvfCqHdRCZAjum_MC76pB/view">News Letter</NavLink></li>
                                    {/* <li><NavLink to="/journal">Journal</NavLink></li> */}
                                    <li><NavLink to="/imageGallery">Image Gallery</NavLink></li>
                                    <li><NavLink to="/certificateVerification">Certificate Verification</NavLink></li>

                                </ul>
                            </details>
                        </li>
                        <li><NavLink to="/notice">Notice</NavLink></li>
                        <li><NavLink to="/admission">Admission</NavLink></li>


                        

                        {
                            user ? <>
                                <div className="flex justify-center items-center font-bold gap-4 text-white bg-red-500 px-4 rounded-lg">
                                    <button className="" onClick={handleLogOut}>LogOut</button>
                                    {/* <p>{user?.displayName}</p> */}
                                </div>
                            </> : <>
                                    <li tabIndex={0}>
                                        <details>
                                            <summary>Login</summary>
                                            <ul className="p-2 z-[1]  bg-green-100 dropdown-box">
                                                <li><NavLink to="/adminLogin">Faculty/Officers/Staffs</NavLink></li>
                                                <li><NavLink to="/studentLogin">Student</NavLink></li>
                                                {/* <li><NavLink to="/register">Register</NavLink></li> */}
                                            </ul>
                                        </details>
                                    </li>
                            </>
                        }



                        <li><NavLink to="/contact">Contact</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>

                        <li><NavLink to="/dashboard/dashhome">Dashboard</NavLink></li>

                        


                    </ul>

                </div>

            </div>

        </div>
    );
};


export default NavBar;