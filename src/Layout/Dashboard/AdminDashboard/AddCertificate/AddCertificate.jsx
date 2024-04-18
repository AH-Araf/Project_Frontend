/* eslint-disable no-unused-vars */

import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';
// import './AdminDashboardCommon.css'
import Swal from 'sweetalert2';
import AddCertificateComp from './AddCertificateComp';




const AddCertificate = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = `771e92fe5bf3b4553445891d6b44f4a1`;


    const handleAddImage = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const imageData = {
                        image: imgData.data.url,
                        StudentName: data.StudentName,
                        StudentId: data.StudentId,
                        Session: data.Session,
                        Point: data.Point,
                        Department: data.Department,
                    };

                    fetch(' http://localhost:5000/certificate', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(imageData)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            Swal.fire({
                                icon: 'success',
                                title: 'Added Successfully',
                                showConfirmButton: false,
                                timer: 1500,
                            }).then(() => {
                                window.location.reload();
                            });
                        })
                        .catch(error => {
                            console.error('Error adding:', error);
                            Swal.fire({
                                icon: 'error',
                                title: 'Error adding',
                            });
                        });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                });
            });
    };

    return (
        <div className='AdminDashBoardMainSection m-2'>

            <div data-aos="zoom-in">
                <h2 className="text-3xl bg-green-300 text-center p-2 rounded-lg">Add Certificate Here</h2>

                <form onSubmit={handleSubmit(handleAddImage)}>


                    <section className="">

                        <div className="form-control w-full max-w-xs  mt-6">
                            <label className="label"> <span className="label-text">Add Certificate Image</span></label>
                            <input type="file" {...register("image", {
                                required: "Image is Required"
                            })} className="input  w-full max-w-xs border-2 pt-2 border-black" />
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Student Name</span></label>
                            <input type="text" {...register("StudentName", {
                                required: "Required"
                            })} className="input  border-2 border-black w-full max-w-xs" />
                        </div>


                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Student ID</span></label>
                            <input type="text" {...register("StudentId", {
                                required: "Required"
                            })} className="input border-2 border-black w-full max-w-xs" />
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Session</span></label>
                            <input type="text" {...register("Session", {
                                required: "Required"
                            })} className="input border-2 border-black w-full max-w-xs" />
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">CGPA</span></label>
                            <input type="text" {...register("Point", {
                                required: "Required"
                            })} className="input border-2 border-black w-full max-w-xs" />
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Department</span></label>
                            <select
                                {...register('Department')}
                                className="select border-2 border-black w-full max-w-xs">
                                {<option>CSE</option>}
                                {<option>EEE</option>}
                                {<option>CE</option>}
                                {<option>BBA</option>}
                                {<option>LLB</option>}
                                {<option>ENG</option>}
                            </select>
                        </div>


                    </section>
                    <input onClick={toast} className='btn btn-accent w-full mt-4 mb-10' value="Add" type="submit" />
                </form>

            </div>

            <div className='w-[700px] overflow-y-auto h-screen'>
            <AddCertificateComp></AddCertificateComp>
            </div>
        </div>
    );
};

export default AddCertificate;
