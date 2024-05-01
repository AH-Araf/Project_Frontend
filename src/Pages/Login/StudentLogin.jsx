import { useContext } from "react";
import {  useNavigate } from "react-router-dom";
import LoginImg from "../../assets/LoginImage/login.png";
import logo from "../../assets/Logo/logo.png";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";

const StudentLogin = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        
        try {
            const result = await signIn(email, password);
            const user = result.user;
            console.log(user);

            Swal.fire({
                title: "User Login Successful.",
                showClass: {
                    popup: "animate__animated animate__fadeInDown",
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp",
                },
            });

            navigate("/");
        } catch (error) {
            console.error("Login error:", error);

            Swal.fire({
                title: "Error",
                text: "Invalid email or password. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div>

            <div className="flex justify-center items-center gap-2 bg-green-400 text-2xl py-1 font-semibold text-white">
                <img className="h-10 w-10" src={logo} alt="" />
                <p className="">Student Login Page</p>
            </div>

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <img
                            className="card shadow-2xl bg-base-100"
                            src={LoginImg}
                            alt=""
                        />
                    </div>

                    <div className="card w-full md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                />
                                
                            </div>

                            <input
                                className="btn btn-primary mt-5"
                                type="submit"
                                value="Login"
                            />
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentLogin;
