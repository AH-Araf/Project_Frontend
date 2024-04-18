
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';



const CreateStudentProfile = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = `771e92fe5bf3b4553445891d6b44f4a1`;


    const handleAddAdmission = data => {
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
                    const admissionData = {
                        image: imgData.data.url,
                        Name: data.Name,
                        Id: data.Id,
                        Department: data.Department,
                        EnrolledSemester: data.EnrolledSemester,
                        Email: data.Email,
                        Religion: data.Religion,
                        BloodGroup: data.BloodGroup,
                        Nationality: data.Nationality,
                        Mobile: data.Mobile,
                        Gender: data.Gender,
                        FathersName: data.FathersName,
                        MothersName: data.MothersName,
                        Guardian: data.Guardian,
                        GuardiansNumber: data.GuardiansNumber,
                        Address: data.Address,
                        DateofBirth: data.DateofBirth,
                        GuardiansEmail: data.GuardiansEmail,
                    };

                    fetch(' http://localhost:5000/userStudent', {
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
                                title: 'Created Successfully',
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
        <div data-aos="flip-left" className='AdminDashBoardMainSection m-2'>

            <div className='mt-10 bg-sky-50 p-12 px-20 shadow-2xl rounded-xl'>
                <h2 className="text-3xl bg-green-300 text-center p-2 rounded-lg">Create Profile</h2>

                <form onSubmit={handleSubmit(handleAddAdmission)}>


                    <section className='flex gap-4 '>
                        <section className="">

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Name</span></label>
                                <input type="text" {...register("Name", {
                                    required: "Name is Required"
                                })} className="input  border-2 border-black w-full max-w-xs" />
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Set ID</span></label>
                                <input type="text" {...register("Id", {
                                    required: true
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

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Enrolled Semester</span></label>
                                <input type="text" {...register("EnrolledSemester", {
                                    required: false
                                })} className="input border-2 border-black w-full max-w-xs" />
                            </div>

                            <div className="form-control w-full max-w-xs  ">
                                <label className="label"> <span className="label-text">Picture</span></label>
                                <input type="file" {...register("image", {
                                    required: "Image is Required"
                                })} className="input  w-full max-w-xs border-2 pt-2 border-black" />
                                {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Gender</span></label>
                                <select
                                    {...register('Gender')}
                                    className="select border-2 border-black w-full max-w-xs">
                                    {<option>Male</option>}
                                    {<option>Female</option>}
                                </select>
                            </div>

                        </section>

                        <section className="">

                            <div className="form-control w-96 max-w-xs">
                                <label className="label"> <span className="label-text">Email</span></label>
                                <input type="text" {...register("Email", {
                                    required: "Email is Required"
                                })} className="input  border-2 border-black w-full max-w-xs" />
                                {errors.Email && <p className='text-red-500'>{errors.Email.message}</p>}
                            </div>


                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Religion</span></label>
                                <input type="text" {...register("Religion", {
                                    required: false
                                })} className="input border-2 border-black w-full max-w-xs" />
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Blood Group</span></label>
                                <select
                                    {...register('BloodGroup')}
                                    className="select border-2 border-black w-full max-w-xs">
                                    {<option>A+</option>}
                                    {<option>A-</option>}
                                    {<option>B+</option>}
                                    {<option>B-</option>}
                                    {<option>AB+</option>}
                                    {<option>AB-</option>}
                                    {<option>O+</option>}
                                    {<option>O-</option>}
                                </select>
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Nationality</span></label>
                                <input type="text" {...register("Nationality", {
                                    required: false
                                })} className="input border-2 border-black w-full max-w-xs" />
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Date of Birth</span></label>
                                <input type="text" {...register("DateofBirth", {
                                    required: false
                                })} className="input border-2 border-black w-full max-w-xs" />
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Mobile Number</span></label>
                                <input type="text" {...register("Mobile", {
                                    required: false
                                })} className="input border-2 border-black w-full max-w-xs" />
                            </div>

                            

                        </section>


                        <section className="">

                            

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Fathers Name</span></label>
                                <input type="text" {...register("FathersName", {
                                    required: false
                                })} className="input border-2 border-black w-full max-w-xs" />
                            </div>

                            <div className="form-control w-96 max-w-xs">
                                <label className="label"> <span className="label-text">Mothers Name</span></label>
                                <input type="text" {...register("MothersName", {
                                    required: "Required"
                                })} className="input  border-2 border-black w-full max-w-xs" />
                            </div>


                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Guardian</span></label>
                                <input type="text" {...register("Guardian", {
                                    required: "Required"
                                })} className="input border-2 border-black w-full max-w-xs" />
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Guardians Number</span></label>
                                <input type="text" {...register("GuardiansNumber", {
                                    required: "Required"
                                })} className="input border-2 border-black w-full max-w-xs" />
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Guardians Email</span></label>
                                <input type="text" {...register("GuardiansEmail", {
                                    required: "Required"
                                })} className="input border-2 border-black w-full max-w-xs" />
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Address</span></label>
                                <input type="text" {...register("Address", {
                                    required: "Required"
                                })} className="input border-2 border-black w-full max-w-xs" />
                            </div>



                        </section>
                    </section>


                    <input onClick={toast} className='btn btn-accent w-full mt-4 mb-10' value="Create" type="submit" />
                </form>

            </div>

        </div>
    );
};

export default CreateStudentProfile;
