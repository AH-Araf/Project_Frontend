import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import {  useNavigate } from "react-router-dom";
import LoginImg from "../../../assets/LoginImage/login.png";
import logo from "../../../assets/Logo/logo.png";
import Swal from 'sweetalert2';
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Register = () => {
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                updateUserProfile(data.name)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email, password: data.password, role: 'user' }
                        fetch(' http://localhost:5000/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })
                    })
                    .catch(error => console.log(error))
            })
    };

    return (
        <>
            <div>
                <div className="flex justify-center items-center gap-2 bg-green-400 text-2xl py-1 font-semibold text-white">
                    <img className="h-10 w-10" src={logo} alt="" />
                    <p className="">Register New Student</p>
                </div>

                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div data-aos="fade-left" className="text-center lg:text-left">
                            <img className="card shadow-2xl bg-base-100 h-[500px] " src={LoginImg} alt="" />
                        </div>
                        <div data-aos="fade-right" className="card flex-shrink-0 w-2/3 max-w-sm shadow-2xl bg-base-100">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                                    {errors.name && <span className="text-red-600">Name is required</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                    {errors.email && <span className="text-red-600">Email is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"} // Show/hide password based on showPassword state
                                            {...register("password", {
                                                required: true,
                                                minLength: 6,
                                                maxLength: 20,
                                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                            })}
                                            placeholder="password"
                                            className="input input-bordered"
                                        />
                                        {/* Eye toggle icon */}
                                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                            {showPassword ? (
                                                <FaEyeSlash className="text-gray-400 cursor-pointer" onClick={() => setShowPassword(false)} />
                                            ) : (
                                                <FaEye className="text-gray-400 cursor-pointer" onClick={() => setShowPassword(true)} />
                                            )}
                                        </span>
                                    </div>
                                    {/* Error messages */}
                                    {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                    {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                    {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                    {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                                </div>
                                <div className="form-control mt-6">
                                    <input className="btn btn-primary" type="submit" value="Register" />
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
