import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Loader from '../../../../components/Loader/Loader';

const ManageNoticeComp = () => {
    const [notices, setNotices] = useState([]);
    const [filteredNotices, setFilteredNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(' http://localhost:5000/notice');
                const data = await response.json();
                setNotices(data);
                setFilteredNotices(data);
                setLoading(false); // Set loading to false after data is received
            } catch (error) {
                console.error('Error fetching Notices:', error);
                setLoading(false); // Set loading to false in case of an error
            }
        };

        fetchData();
    }, []);

    const handleFilter = (type) => {
        const filtered = type ? notices.filter(a => a.types === type) : notices;
        setFilteredNotices(filtered);
    };

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this Notice!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                await fetch(` http://localhost:5000/notice/${id}`, {
                    method: 'DELETE',
                });

                const response = await fetch(' http://localhost:5000/notice');
                const data = await response.json();
                setNotices(data);
                setFilteredNotices(data);

                Swal.fire({
                    icon: 'success',
                    title: 'Notices deleted successfully!',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error('Error deleting Notice:', error);

            Swal.fire({
                icon: 'error',
                title: 'Error deleting Notice',
            });
        }
    };

    const truncateDescription = (description) => {
        const words = description.split(' ');
        const truncated = words.slice(0, 18).join(' ');
        return truncated;
    };

    return (
        <div className='mainNoticeSection'>

            {loading && <Loader></Loader>}
            {!loading && (
                <>
                    <div className='mb-2 border-b-4 pb-2'>
                        <b>
                            <button className='me-2 btn-p' onClick={() => handleFilter()}>All</button>
                            <button className='me-2 btn-p' onClick={() => handleFilter('Exam')}>Exam</button>
                            <button className='me-2 btn-p' onClick={() => handleFilter('Transport')}>Transport</button>
                            <button className='me-2 btn-p' onClick={() => handleFilter('Hall')}>Hall</button>
                            <button className='me-2 btn-p' onClick={() => handleFilter('Others')}>Others</button>
                        </b>
                    </div>

                    <div className='p-1 overflow-y-auto h-screen'>
                        {filteredNotices.map(n => (
                            <div className='filterNoticeDesign' key={n._id}>
                                <h3 className='text-lg text-slate-500'><b>{n.title}</b></h3>
                                <p className='mt-2'><span className='font-bold'>Types:</span> {n.types}</p>

                                <p className='mt-2'>
                                    <span className='font-bold me-2'>Link:</span>
                                    <a className='text-blue-700 font-bold text-sm' href={n.link} target="_blank" rel="noopener noreferrer">View Details</a>
                                </p>

                                <p className='mt-2'><span className='font-bold'>Description:</span> {truncateDescription(n.description)}</p>
                                <button className='btn btn-error mt-4' onClick={() => handleDelete(n._id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ManageNoticeComp;
