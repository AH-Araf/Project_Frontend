
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import ManageFacultyComp from './ManageFacultyComp';
import './ManageFaculty.css'



const ManageFaculty = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = `771e92fe5bf3b4553445891d6b44f4a1`;


    const handleAddFaculty = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

        fetch(url, {
            method: 'POST',
            body: formData
        })
            // Name, Designation, PhoneNumber, Email, EduCationBSc, EducationMSc,EducationPhD, Department

            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const admissionData = {
                        image: imgData.data.url,
                        Name: data.Name,
                        Designation: data.Designation,
                        PhoneNumber: data.PhoneNumber,
                        Email: data.Email,
                        EduCationBSc: data.EduCationBSc,
                        EducationMSc: data.EducationMSc,
                        EducationPhD: data.EducationPhD,
                        Department: data.Department,
                        PublicationA: data.PublicationA,
                        PublicationB: data.PublicationB,
                        PublicationC: data.PublicationC,
                    };

                    fetch(' http://localhost:5000/faculty', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(admissionData)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            Swal.fire({
                                icon: 'success',
                                title: 'Added successfully',
                                showConfirmButton: false,
                                timer: 1500,
                            }).then(() => {
                                window.location.reload();
                            });
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
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
        <div data-aos="zoom-out-down" className='AdminDashBoardMainSectionABC m-2'>

            <div className='mt-10 bg-sky-50 p-12 px-20 shadow-2xl rounded-xl w-[1100px] m-16'>
                <h2 className="text-3xl bg-green-300 text-center p-2 rounded-lg">Add New Faculty Here</h2>

                <form onSubmit={handleSubmit(handleAddFaculty)}>


                    <section className='flex gap-4 '>
                        <section className="">

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Name</span></label>
                                <input type="text" {...register("Name", {
                                    required: "YourName is Required"
                                })} className="input  border-2 border-black w-full max-w-xs" />
                                {errors.Name && <p className='text-red-500'>{errors.Name.message}</p>}
                            </div>


                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Designation</span></label>
                                <input type="text" {...register("Designation", {
                                    required: true
                                })} className="input border-2 border-black w-full max-w-xs" />
                                {errors.Designation && <p className='text-red-500'>{errors.Designation.message}</p>}
                            </div>

                            <div className="form-control w-96 max-w-xs">
                                <label className="label"> <span className="label-text">Email</span></label>
                                <input type="text" {...register("Email", {
                                    required: "Email is Required"
                                })} className="input  border-2 border-black w-full max-w-xs" />
                                {errors.Email && <p className='text-red-500'>{errors.Email.message}</p>}
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Phone Number</span></label>
                                <input type="text" {...register("PhoneNumber", {
                                    required: false
                                })} className="input border-2 border-black w-full max-w-xs" />
                                {errors.PhoneNumber && <p className='text-red-500'>{errors.PhoneNumber.message}</p>}
                            </div>



                        </section>

                        <section className="">


                            <div className="form-control w-full max-w-xs  ">
                                <label className="label"> <span className="label-text">Picture</span></label>
                                <input type="file" {...register("image", {
                                    required: "Image is Required"
                                })} className="input  w-full max-w-xs border-2 pt-2 border-black" />
                                {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Education BSc</span></label>
                                <input type="text" {...register("EduCationBSc", {
                                    required: false
                                })} className="input border-2 border-black w-full max-w-xs" />
                                {errors.EduCationBSc && <p className='text-red-500'>{errors.EduCationBSc.message}</p>}
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Education MSc</span></label>
                                <input type="text" {...register("EducationMSc", {
                                    required: false
                                })} className="input border-2 border-black w-full max-w-xs" />
                                {errors.EducationMSc && <p className='text-red-500'>{errors.EducationMSc.message}</p>}
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Education PhD</span></label>
                                <input type="text" {...register("EducationPhD", {
                                    required: false
                                })} className="input border-2 border-black w-full max-w-xs" />
                                {errors.EducationPhD && <p className='text-red-500'>{errors.EducationPhD.message}</p>}
                            </div>

                        </section>


                        <section className="">

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

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Publication Link 1</span></label>
                                <input type="text" {...register("PublicationA", {
                                    required: false
                                })} className="input border-2 border-black w-full max-w-xs" />
                            </div>

                            <div className="form-control w-96 max-w-xs">
                                <label className="label"> <span className="label-text">Publication Link 2</span></label>
                                <input type="text" {...register("PublicationB", {
                                    required: "Required"
                                })} className="input  border-2 border-black w-full max-w-xs" />
                            </div>


                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Publication Link 3</span></label>
                                <input type="text" {...register("PublicationC", {
                                    required: "Required"
                                })} className="input border-2 border-black w-full max-w-xs" />
                            </div>
                        </section>
                    </section>
                    <input onClick={toast} className='btn btn-accent w-full mt-4 mb-10' value="Add" type="submit" />
                </form>

            </div>
            <ManageFacultyComp></ManageFacultyComp>
        </div>
    );
};

export default ManageFaculty;