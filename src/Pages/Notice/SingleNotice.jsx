import {  useLoaderData } from "react-router-dom";


const SingleNotice = () => {
    const a = useLoaderData();
    const { title, link, description, types, date  } = a;

    // console.log(a);
    return (
        <div>
            
            <div className='Notice-single-category2 px-10'>
                <div className='Notice-single-category3'>
                    <h4 className="text-xl font-bold">Title: <span className="text-slate-600">{title}</span></h4>
                    <p className="mt-3"><span className='font-bold '>Date:</span> {date}</p>
                    <p className="mt-1"><span className='font-bold'>Category:</span> {types}</p>
                    <p className='mt-1'>
                        <span className='font-bold me-2'>Link:</span>
                        <a className='text-blue-700 font-bold text-sm' href={link} target="_blank" rel="noopener noreferrer">View Details</a>
                    </p>  
                    <p className='text-justify mt-1'><span className='font-bold'>Full Description:</span> <span>{description}</span></p>
                    
                </div>
            </div>


        </div>
    );
};

export default SingleNotice;

