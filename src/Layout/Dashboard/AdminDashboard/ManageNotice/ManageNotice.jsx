import  { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import ManageNoticeComp from './ManageNoticeComp';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../AdminDashboard.css'

const ManageNotice = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [startDate, setStartDate] = useState(new Date()); // Initialize with current date

    const handleAddNotice = data => {
        const noticeData = {
            types: data.types,
            title: data.title,
            date: startDate, // Use selected date from the state
            link: data.link,
            description: data.description,
        };

        fetch(' http://localhost:5000/notice', {
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
                    title: 'Notice added successfully',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    window.location.reload();
                });
            })
            .catch(error => {
                console.error('Error adding Notice:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error adding Notice',
                });
            });
    };

    return (
        <div className='AdminDashBoardMainSection m-2'>
            <div data-aos="zoom-in">
                <h2 className="text-3xl bg-green-300 text-center p-2 rounded rounded-lg">Add New Notice Here</h2>
                <form onSubmit={handleSubmit(handleAddNotice)}>
                    <section className="">
                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Notice Type</span></label>
                            <select
                                {...register('types')}
                                className="select border-2 border-black w-full max-w-xs">
                                {<option>Exam</option>}
                                {<option>Transport</option>}
                                {<option>Hall</option>}
                                {<option>Others</option>}
                            </select>
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Notice Title</span></label>
                            <input type="text" {...register("title", {
                                required: "Title is Required"
                            })} className="input  border-2 border-black w-full max-w-xs" />
                            {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Date</span></label>
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
                            <label className="label"> <span className="label-text">Add Link</span></label>
                            <input type="text" {...register("link", {
                                required: false
                            })} className="input border-2 border-black w-full max-w-xs" />
                            {errors.link && <p className='text-red-500'>{errors.link.message}</p>}
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Notice Description</span></label>
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
                <ManageNoticeComp />
            </div>
        </div>
    );
};

export default ManageNotice;
