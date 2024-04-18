import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Loader from '../../../../components/Loader/Loader';

const ManageFacultyComp = () => {
    const [a, setA] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(' http://localhost:5000/faculty');
                const data = await response.json();
                setA(data);
                setFiltered(data);
                setLoading(false); // Set loading to false after data is received
            } catch (error) {
                console.error('Error fetching:', error);
                setLoading(false); // Set loading to false in case of an error
            }
        };

        fetchData();
    }, []);

    const handleFilter = (Department) => {
        const filtered = Department ? a.filter(a => a.Department === Department) : a;
        setFiltered(filtered);
    };

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                await fetch(` http://localhost:5000/faculty/${id}`, {
                    method: 'DELETE',
                });

                const response = await fetch(' http://localhost:5000/faculty');
                const data = await response.json();
                setA(data);
                setFiltered(data);

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted successfully!',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error('Error deleting :', error);

            Swal.fire({
                icon: 'error',
                title: 'Error deleting',
            });
        }
    };



    return (
        <div className=''>

            {loading && <Loader></Loader>}
            {!loading && (
                <>
                    <div className='flex justify-center font-bold'>
                        <>
                            <button className='me-2 btn-p' onClick={() => handleFilter()}>All</button>
                            <button className='me-2 btn-p' onClick={() => handleFilter('CSE')}>CSE</button>
                            <button className='me-2 btn-p' onClick={() => handleFilter('EEE')}>EEE</button>
                            <button className='me-2 btn-p' onClick={() => handleFilter('CE')}>CE</button>
                            <button className='me-2 btn-p' onClick={() => handleFilter('BBA')}>BBA</button>
                            <button className='me-2 btn-p' onClick={() => handleFilter('LLB')}>LLB</button>
                            <button className='me-2 btn-p' onClick={() => handleFilter('ENG')}>ENG</button>
                        </>
                    </div>

                    <div className='flex justify-center items-center'>
                        <div className='p-1 overflow-y-auto h-screen w-96 '>
                            {filtered.map(n => (
                                <div className='border-2 shadow-xl m-2 mt-6' key={n._id}>

                                    <div className='flex gap-6 items-center bg-green-100'>
                                        <img className='m-2 w-20 h-20 rounded-full border-2 border-slate-500' src={n.image} alt="" />
                                        <div>
                                            <p className='font-bold'>{n.Name}</p>
                                            <p className='text-sm'>{n.PhoneNumber}</p>
                                            <p className='text-xs font-bold text-blue-600'>{n.Email}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className='bg-emerald-200 py-1 text-center text-sm font-bold text-slate-600'>{n.Designation}</p>

                                    </div>

                                    <div className='flex justify-center p-4'>
                                        <button className='btn  btn-error' onClick={() => handleDelete(n._id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ManageFacultyComp;