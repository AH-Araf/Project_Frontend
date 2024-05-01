
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import './Admission.css'



const AdmissionApply = () => {

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
                        YourName: data.YourName,
                        Age: data.Age,
                        PhoneNumber: data.PhoneNumber,
                        Email: data.Email,
                        Address: data.Address,
                        ResultSSC: data.ResultSSC,
                        ResultHSC: data.ResultHSC,
                        Subject: data.Subject,
                        SSCHSC: data.SSCHSC,
                        TransNumber: data.TransNumber,
                        TransID: data.TransID,
                    };

                    fetch(' http://localhost:5000/admission', {
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
                                title: 'Applied successfully',
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
                console.error('Error Applying:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error Applying',
                });
            });
    };
    

    return (
        <div data-aos="zoom-in-down" className='AdminDashBoardMainSection m-2'>

            <div className='mt-10 bg-sky-50 p-12 px-20 shadow-2xl rounded-xl'>
                <h2 className="text-3xl bg-green-300 text-center p-2 rounded-lg">Apply Now</h2>

                <form onSubmit={handleSubmit(handleAddAdmission)}>


                    <section className='apply-main-section-boxes gap-4 '>
                        <section className="">

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Your Name</span></label>
                                <input type="text" {...register("YourName", {
                                    required: "YourName is Required"
                                })} className="input  border-2 border-black w-full max-w-xs" />
                                {errors.YourName && <p className='text-red-500'>{errors.YourName.message}</p>}
                            </div>


                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Age</span></label>
                                <input type="text" {...register("Age", {
                                    required: true
                                })} className="input border-2 border-black w-full max-w-xs" />
                                {errors.Age && <p className='text-red-500'>{errors.Age.message}</p>}
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Phone Number</span></label>
                                <input type="text" {...register("PhoneNumber", {
                                    required: false
                                })} className="input border-2 border-black w-full max-w-xs" />
                                {errors.PhoneNumber && <p className='text-red-500'>{errors.PhoneNumber.message}</p>}
                            </div>

                            <div className="form-control w-full max-w-xs  ">
                                <label className="label"> <span className="label-text">Your Picture</span></label>
                                <input type="file" {...register("image", {
                                    required: "Image is Required"
                                })} className="input  w-full max-w-xs border-2 pt-2 border-black" />
                                {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
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
                                <label className="label"> <span className="label-text">Address</span></label>
                                <input type="text" {...register("Address", {
                                    required: false
                                })} className="input border-2 border-black w-full max-w-xs" />
                                {errors.Address && <p className='text-red-500'>{errors.Address.message}</p>}
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Result(SSC)</span></label>
                                <input type="text" {...register("ResultSSC", {
                                    required: false
                                })} className="input border-2 border-black w-full max-w-xs" />
                                {errors.ResultSSC && <p className='text-red-500'>{errors.ResultSSC.message}</p>}
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Result(HSC)</span></label>
                                <input type="text" {...register("ResultHSC", {
                                    required: false
                                })} className="input border-2 border-black w-full max-w-xs" />
                                {errors.ResultHSC && <p className='text-red-500'>{errors.ResultHSC.message}</p>}
                            </div>

                        </section>


                        <section className="">

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Subject</span></label>
                                <select
                                    {...register('Subject')}
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
                                <label className="label"> <span className="label-text">Total SSC+HSC GPA</span></label>
                                <input type="text" {...register("SSCHSC", {
                                    required: false
                                })} className="input border-2 border-black w-full max-w-xs" />
                                {errors.SSCHSC && <p className='text-red-500'>{errors.SSCHSC.message}</p>}
                            </div>

                            <div className="form-control w-96 max-w-xs">
                                <label className="label"> <span className="label-text">Bkash | Nagad Number</span></label>
                                <input type="text" {...register("TransNumber", {
                                    required: "Required"
                                })} className="input  border-2 border-black w-full max-w-xs" />
                                {errors.TransNumber && <p className='text-red-500'>{errors.TransNumber.message}</p>}
                            </div>


                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Transection ID</span></label>
                                <input type="text" {...register("TransID", {
                                    required: "Required"
                                })} className="input border-2 border-black w-full max-w-xs" />
                                {errors.TransID && <p className='text-red-500'>{errors.TransID.message}</p>}
                            </div>

                           

                        </section>
                    </section>


                    <input onClick={toast} className='btn btn-accent w-full mt-4 mb-10' value="Apply" type="submit" />
                </form>

            </div>

        </div>
    );
};

export default AdmissionApply;