/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

const CSE = ({ facultyData }) => {
    return (
        <div>
            <h2 className="text-center mt-4 text-3xl font-bold bg-emerald-500 p-2 text-white">CSE FACULTY</h2>
            <div>
                {facultyData.map(faculty => (
                    <div key={faculty._id}>

                        {/*  */}
                        <div className="hover:px-1 border-2 border-blue-100 md:m-4 m-2 bg-blue-50 " data-aos="fade-up">
                            <div className="mx-auto w-10/12 text-center my-8">
                                <div className="flex justify-center" ><img className="w-32 h-40 border-2 border-gray-300" src={faculty.image} alt="" /></div>
                                <p className="text-yellow-600 font-bold">{faculty.Designation}</p>
                                <p className="text-yellow-600 mb-2 font-bold">BAIUST, Cumilla</p>
                                <h3 className="lg:text-xl uppercase border-y-4 font-bold ">{faculty.Name}</h3>
                                <p>{faculty.PhoneNumber}</p>
                                <p>{faculty.Email}</p>


                                <div className="text-start mt-1 text-sm font-bold ">
                                    <div className="collapse bg-base-200">
                                        <input type="checkbox" className="peer" />
                                        <div className="collapse-title bg-slate-600 text-primary-content peer-checked:bg-green-200 peer-checked:text-black">
                                            Honors (Hons)
                                        </div>
                                        <div className="collapse-content bg-slate-600 text-primary-content peer-checked:bg-green-100 peer-checked:text-black  border-b-2  border-green-500">
                                            <p className="text-slate-500">{faculty.EduCationBSc}</p>
                                        </div>
                                    </div>

                                </div>

                                <div className="text-start mt-1 text-sm font-bold">
                                    <div className="collapse bg-base-200">
                                        <input type="checkbox" className="peer" />
                                        <div className="collapse-title bg-slate-600 text-primary-content peer-checked:bg-green-200 peer-checked:text-black">
                                            Masters (MSc, MA, MBA)
                                        </div>
                                        <div className="collapse-content bg-slate-600 text-primary-content peer-checked:bg-green-100 peer-checked:text-black  border-b-2  border-green-500">
                                            <p className="text-slate-500">{faculty.EducationMSc}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-start mt-1 text-sm font-bold">
                                    <div className="collapse bg-base-200">
                                        <input type="checkbox" className="peer" />
                                        <div className="collapse-title bg-slate-600 text-primary-content peer-checked:bg-green-200 peer-checked:text-black">
                                            PhD (Doctor of Philosophy)
                                        </div>
                                        <div className="collapse-content bg-slate-600 text-primary-content peer-checked:bg-green-100 peer-checked:text-black  border-b-2  border-green-500">
                                            <p className="text-slate-500">{faculty.EducationPhD}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-start mt-1 text-sm font-bold">
                                    <div className="collapse bg-base-200">
                                        <input type="checkbox" className="peer" />
                                        <div className="collapse-title bg-slate-600 text-primary-content peer-checked:bg-green-200 peer-checked:text-black">
                                            Publications
                                        </div>
                                        <div className="collapse-content bg-slate-600 text-primary-content peer-checked:bg-green-100 peer-checked:text-black  border-b-2  border-green-500">
                                            <p className="text-blue-800 mt-4">
                                                <ul className="flex justify-evenly">
                                                    <li><a target="blank" href={faculty.PublicationA}>View Publication-1</a></li>
                                                    <li><a target="blank" href={faculty.PublicationB}>View Publication-2</a></li>
                                                    <li><a target="blank" href={faculty.PublicationC}>View Publication-3</a></li>
                                                </ul>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CSE;
