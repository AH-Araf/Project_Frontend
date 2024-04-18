import { NavLink } from 'react-router-dom';
import adminImage from '../../../assets/image/Admin.png'
import { AiOutlineHome } from 'react-icons/ai';
import { BiLogOut } from "react-icons/bi";
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';

const AdminDashNavProfile = () => {
    const { user, logOut } = useContext(AuthContext);



    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }


 

    return (
        <div>
            <h1 ></h1>
            <li tabIndex={0}>
                <details>
                    <summary className="flex justify-center mb-2 bg-slate-500 text-black font-bold text-lg">Admin Dashboard</summary>
                    <ul className="p-2 bg-opacity-30 bg-gray-600 text-white dropdown-box mb-2">
                        <li><NavLink to="/"><AiOutlineHome></AiOutlineHome> Home</NavLink></li>
                        {
                            user ? <>
                                <li onClick={handleLogOut}><NavLink to="/"><BiLogOut></BiLogOut>LogOut</NavLink></li>
                            </> : <>
                                <li><NavLink to="/studentLogin">Login</NavLink></li>
                            </>
                        }
                    </ul>
                </details>
            </li>
            <div className="flex justify-center mb-2"><img className="h-20 w-20 rounded-full bg-green-300" src={adminImage} alt="" /></div>


           
                <div className="">
                    <p className='text-center font-bold'>ADMIN</p>
                </div>
        </div>
    );
};


export default AdminDashNavProfile;
