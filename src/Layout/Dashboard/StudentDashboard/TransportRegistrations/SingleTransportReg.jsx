/* eslint-disable no-unused-vars */
import  { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../../Providers/AuthProvider";
import { useForm } from "react-hook-form";

const SingleTransportReg = () => {
    const transportData = useLoaderData();
    const { session, year, StartDate, EndDate, _id } = transportData;

    const { user } = useContext(AuthContext);
    const [student, setStudent] = useState([]);
    useEffect(() => {
        fetch(` http://localhost:5000/userStudents?Email=${user?.email}`)
            .then(res => res.json())
            .then(data => setStudent(data))
            .catch(error => console.error("Error fetching student data:", error));
    }, [user?.email]);

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
    const pickupPoint = watch('pickUpPoint');
    const [fee, setFee] = useState('');

    const handleApply = data => {
        const applicantData = student.map(x => ({
            name: x.Name,
            image: x.image,
            id: x.Id,
            department: x.Department,
            mobile: x.Mobile
        }));

        const requestBody = {
            cSession: session,
            cYear: year,
            cStartDate: StartDate,
            cEndDate: EndDate,
            cID: _id,
            pickUpPoint: data.pickUpPoint,
            fee: fee,
            cApplicant: applicantData,
        };

        fetch(' http://localhost:5000/transportCard', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                alert(`Applied Successfully`);
            })
            .catch(error => {
                console.error("Error applying for transport card:", error);
                // Handle error
            });
    }

    const handlePickupPointChange = e => {
        const selectedPickupPoint = e.target.value;
        // Update fee based on the selected pickup point
        switch (selectedPickupPoint) {
            case 'কান্দিরপাড়/ঈদ্গাহ -- নোয়াপাড়া -- আলেখার চর -- ক্যাম্পাস':
            case 'টমসম ব্রিজ -- পদুয়ার বাজার বিশ্বরোড -- আলেখার চর -- ক্যাম্পাস':
                setFee('8500');
                break;
            case 'ঝাগুরঝুলি বিশ্বরোড -- আলেখার চর -- ক্যাম্পাস':
                setFee('5500');
                break;
            case 'Only For MBA Students-ঈদগাহ সম্মুখ - পুলিশ লাইন - নোয়াপাড়া - ক্যাম্পাস':
                setFee('4000');
                break;
            case 'ক্যান্টেনম্যান্ট/টিপরা বাজার - ক্যাম্পাস':
                setFee('3500');
                break;
            default:
                setFee('');
                break;
        }
        // Set fee value in the form
        setValue('fee', fee);
    }

    return (
        <div>
            <div>
                <div data-aos="zoom-in" className="overflow-x-auto border-4 border-slate-600 m-4 font-bold mx-14 shadow-2xl">
                    <table className="table">
                        <thead>
                            <tr className="bg-slate-600 text-white font-bold text-md">
                                <th>Serial No.</th>
                                <th>Pick Up Point</th>
                                <th>Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-slate-300">
                                <td>01.</td>
                                <td>কান্দিরপাড়/ঈদ্গাহ -- নোয়াপাড়া -- আলেখার চর -- ক্যাম্পাস</td>
                                <td>8500</td>
                            </tr>
                            <tr className="bg-slate-100">
                                <td>02.</td>
                                <td>টমসম ব্রিজ -- পদুয়ার বাজার বিশ্বরোড -- আলেখার চর -- ক্যাম্পাস</td>
                                <td>8500</td>
                            </tr>
                            <tr className="bg-slate-300">
                                <td>03.</td>
                                <td>ঝাগুরঝুলি বিশ্বরোড -- আলেখার চর -- ক্যাম্পাস</td>
                                <td>5500</td>
                            </tr>
                            <tr className="bg-slate-100">
                                <td>04.</td>
                                <td>(Only For MBA Students) ঈদগাহ সম্মুখ - পুলিশ লাইন - নোয়াপাড়া - ক্যাম্পাস</td>
                                <td>4000</td>
                            </tr>
                            <tr className="bg-slate-300">
                                <td>05.</td>
                                <td>ক্যান্টেনম্যান্ট/টিপরা বাজার - ক্যাম্পাস</td>
                                <td>3500</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="h-[500px] flex flex-col justify-center">
                <form onSubmit={handleSubmit(handleApply)}>
                    <div className="flex justify-evenly bg-blue-100 mx-14 shadow-2xl py-20">
                        <div data-aos="zoom-in-right">
                            <div className="bg-blue-200 shadow-xl p-5 h-48 rounded-lg">
                                <p className="text-xl font-bold">Transport Registration is going on</p>
                                <span><span className="font-bold">Session: </span>{session} - {year}</span>
                                <p><span className="font-bold">Starts In:</span> {StartDate}</p>
                                <p><span className="font-bold">Ends In:</span> {EndDate}</p>
                            </div>
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text font-bold">Choose Pick Up Point</span></label>
                            <select
                                {...register('pickUpPoint')}
                                className="select border-2 border-black w-full max-w-xs"
                                onChange={handlePickupPointChange}
                            >
                                {<option>কান্দিরপাড়/ঈদ্গাহ -- নোয়াপাড়া -- আলেখার চর -- ক্যাম্পাস</option>}
                                {<option>টমসম ব্রিজ -- পদুয়ার বাজার বিশ্বরোড -- আলেখার চর -- ক্যাম্পাস</option>}
                                {<option>ঝাগুরঝুলি বিশ্বরোড -- আলেখার চর -- ক্যাম্পাস</option>}
                                {<option>Only For MBA Students-ঈদগাহ সম্মুখ - পুলিশ লাইন - নোয়াপাড়া - ক্যাম্পাস</option>}
                                {<option>ক্যান্টেনম্যান্ট/টিপরা বাজার - ক্যাম্পাস</option>}
                            </select>
                        </div>

                        <div data-aos="zoom-in-left">
                            {student.map(x => (
                                <div key={x._id}>
                                    <div className="flex justify-center shadow-xl items-center gap-5 bg-blue-200 p-5 h-48 rounded-lg">
                                        <img className="w-24 h-24 rounded-full border-2 border-slate-600 shadow-lg" src={x.image} alt="" />
                                        <div>
                                            <p className="text-xl font-bold">Applicant Details</p>
                                            <p><span className="font-bold">Students Name:</span> {x.Name}</p>
                                            <p><span className="font-bold">Students ID:</span> {x.Id}</p>
                                            <p><span className="font-bold">Department:</span> {x.Department}</p>
                                            <p><span className="font-bold">Phone Number:</span> {x.Mobile}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center mt-6">
                        <input {...register('fee')} type="hidden" />
                        <input className='btn btn-outline w-96' value="Apply For Card" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SingleTransportReg;
