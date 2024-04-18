import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../AdminDashboard.css'
import ManageTransportComp from './ManageTransportComp';

const ManageTransport = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [startDate, setStartDate] = useState(new Date()); 
    const [endDate, setEndDate] = useState(new Date()); 

    const handleAddNotice = data => {
        const noticeData = {
            session: data.session,
            year: data.year,
            StartDate: startDate,
            EndDate: endDate,
            description: data.description,
        };

        fetch(' http://localhost:5000/transportAuthor', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(noticeData)
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
                console.error('Error adding:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error adding',
                });
            });
    };

    return (
        <div className='AdminDashBoardMainSection m-2'>
            <div data-aos="zoom-in">
                <h2 className="text-3xl bg-green-300 text-center p-2  rounded-lg">Add New Reg. Details</h2>
                <form onSubmit={handleSubmit(handleAddNotice)}>
                    <section className="">
                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Select Session</span></label>
                            <select
                                {...register('session')}
                                className="select border-2 border-black w-full max-w-xs">
                                {<option>Spring</option>}
                                {<option>Fall</option>}
                            </select>
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Year</span></label>
                            <select
                                {...register('year')}
                                className="select border-2 border-black w-full max-w-xs">
                                {<option>2024</option>}
                                {<option>2025</option>}
                                {<option>2026</option>}
                                {<option>2027</option>}
                                {<option>2028</option>}
                            </select>
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Start Date</span></label>
                            <DatePicker
                                {...register("date", {
                                    required: false
                                })}
                                className="input border-2 border-black w-full max-w-xs"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="yyyy/MM/dd"
                            />
                            {errors.date && <p className='text-red-500'>{errors.date.message}</p>}
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Reg. Ends In</span></label>
                            <DatePicker
                                {...register("endDate", {
                                    required: false
                                })}
                                className="input border-2 border-black w-full max-w-xs"
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                dateFormat="yyyy/MM/dd"
                            />
                            {errors.date && <p className='text-red-500'>{errors.date.message}</p>}
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Description</span></label>
                            <input type="text" {...register("description", {
                                required: false
                            })} className="input  border-2 border-black w-full max-w-xs" />
                            {errors.Description && <p className='text-red-500'>{errors.Description.message}</p>}
                        </div>

                    </section>
                    <input className='btn btn-accent w-full mt-4 mb-10' value="Add" type="submit" />

                </form>
            </div>
            <div className='w-96 '>
                <ManageTransportComp />
            </div>
        </div>
    );
};

export default ManageTransport;