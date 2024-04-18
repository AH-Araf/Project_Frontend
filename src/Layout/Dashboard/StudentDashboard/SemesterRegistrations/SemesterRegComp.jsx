/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";

const SemesterRegComp = ({ x }) => {
    const { Name, Id, Department, Mobile, _id } = x;
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [credit, setCredit] = useState(0);

    const handleApply = data => {
        const levelTerm = data.levelTerm;
        let semesterCredit;
        switch (levelTerm) {
            case '1 - 1':
                semesterCredit = 19.5;
                break;
            case '1 - 2':
                semesterCredit = 20.5;
                break;
            case '2 - 1':
                semesterCredit = 20.75;
                break;
            case '2 - 2':
                semesterCredit = 18;
                break;
            case '3 - 1':
                semesterCredit = 20.5;
                break;
            case '3 - 2':
                semesterCredit = 22;
                break;
            case '4 - 1':
                semesterCredit = 23;
                break;
            case '4 - 2':
                semesterCredit = 24;
                break;
            default:
                semesterCredit = 0;
                break;
        }

        const formData = {
            name: Name,
            Id: Id,
            Department: Department,
            Mobile: Mobile,
            Object_id: _id,
            session: data.session,
            year: data.year,
            levelTerm: levelTerm,
            SemesterCredit: semesterCredit
        };

        fetch(' http://localhost:5000/semReg', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                alert(`Registration Completed`);
            })
            .catch(error => console.error('Error:', error));
    };

    const handleLevelTermChange = (event) => {
        const selectedLevelTerm = event.target.value;
        let semesterCredit;
        switch (selectedLevelTerm) {
            case '1 - 1':
                semesterCredit = 19.50;
                break;
            case '1 - 2':
                semesterCredit = 20.50;
                break;
            case '2 - 1':
                semesterCredit = 20.75;
                break;
            case '2 - 2':
                semesterCredit = 18.75;
                break;
            case '3 - 1':
                semesterCredit = 21.00;
                break;
            case '3 - 2':
                semesterCredit = 22.50;
                break;
            case '4 - 1':
                semesterCredit = 23.00;
                break;
            case '4 - 2':
                semesterCredit = 24.75;
                break;
            default:
                semesterCredit = 0;
                break;
        }
        setCredit(semesterCredit);
    };


    return (
        <div className="">


            <div data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="1000"
                className="overflow-x-auto border-4 border-slate-600 m-4 font-bold"
            >
                <table className="table">
                    <thead>
                        <tr className="bg-slate-600 text-white font-bold text-md">
                            <th>Level - Term</th>
                            <th>Credits</th>
                            <th>Level - Term</th>
                            <th>Credits</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-slate-300">
                            <td>1-1</td>
                            <td>19.50</td>
                            <td>3-1</td>
                            <td>21.00</td>
                        </tr>
                        <tr className="bg-slate-100">
                            <td>1-2</td>
                            <td>20.50</td>
                            <td>3-2</td>
                            <td>22.50</td>
                        </tr>
                        <tr className="bg-slate-300">
                            <td>2-1</td>
                            <td>20.75</td>
                            <td>4-1</td>
                            <td>23.00</td>
                        </tr>
                        <tr className="bg-slate-100">
                            <td>2-2</td>
                            <td>18.75</td>
                            <td>4-2</td>
                            <td>24.75</td>
                        </tr>
                    </tbody>
                </table>
            </div>



            <div data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="1000"
                className="flex justify-center m-14 shadow-xl items-center gap-5 bg-blue-200 p-5 h-48 rounded-lg"
            >
                <img className="w-24 h-24 rounded-full border-2 border-slate-600 shadow-lg" src={x.image} alt="" />
                <div>
                    <p className="text-xl font-bold"><u>Student Details</u></p>
                    <p><span className="font-bold">Students Name:</span> {Name}</p>
                    <p><span className="font-bold">Students ID:</span> {Id}</p>
                    <p><span className="font-bold">Department:</span> {Department}</p>
                    <p><span className="font-bold">Phone Number:</span> {Mobile}</p>
                </div>
            </div>

            <div>
                <form onSubmit={handleSubmit(handleApply)}>
                    <section className="flex flex-col justify-center items-center">

                        <div>
                            <div className="flex gap-5">
                                <div className="form-control w-40 max-w-xs">
                                    <label className="label"> <span className="label-text">Select Session</span></label>
                                    <select
                                        {...register('session')}
                                        className="select border-2 border-black w-full max-w-xs">
                                        {<option>Spring</option>}
                                        {<option>Fall</option>}
                                    </select>
                                </div>

                                <div className="form-control w-40 max-w-xs">
                                    <label className="label"> <span className="label-text">Select Year</span></label>
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
                            </div>

                            <div className="flex gap-5">
                                <div className="form-control w-40 max-w-xs ">
                                    <label className="label"> <span className="label-text">Level - Term</span></label>
                                    <select
                                        {...register('levelTerm')}
                                        className="select border-2 border-black w-full max-w-xs"
                                        onChange={handleLevelTermChange}>
                                        {<option>1 - 1</option>}
                                        {<option>1 - 2</option>}
                                        {<option>2 - 1</option>}
                                        {<option>2 - 2</option>}
                                        {<option>3 - 1</option>}
                                        {<option>3 - 2</option>}
                                        {<option>4 - 1</option>}
                                        {<option>4 - 2</option>}
                                    </select>
                                </div>

                                <div className="form-control w-40 max-w-xs">
                                    <label className="label"> <span className="label-text">Semester Credit</span></label>
                                    <input
                                        type="text"
                                        value={credit}
                                        className="input border-2 border-black"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>

                    </section>
                    <div className="flex justify-center items-center mt-5">
                        <input className='btn btn-accent w-96 mt-4 mb-10' value="Complete" type="submit" />
                    </div>
                </form>
            </div>


        </div>
    );
};

export default SemesterRegComp;
