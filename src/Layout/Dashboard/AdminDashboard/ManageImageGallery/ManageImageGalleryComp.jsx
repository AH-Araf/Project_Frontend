import  { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Loader from '../../../../components/Loader/Loader';


const ManageImageGalleryComp = () => {
    const [Images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchImages = async () => {
        try {
            const response = await fetch(' http://localhost:5000/image');
            const data = await response.json();
            setImages(data);
            setLoading(false); // Set loading to false after data is received
        } catch (error) {
            console.error('Error fetching Image:', error);
            setLoading(false); // Set loading to false in case of an error
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                await fetch(` http://localhost:5000/image/${id}`, {
                    method: 'DELETE',
                });

                fetchImages();

                Swal.fire({
                    icon: 'success',
                    title: 'Image deleted successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });
            } catch (error) {
                console.error('Error deleting Image:', error);

                Swal.fire({
                    icon: 'error',
                    title: 'Error deleting Image',
                });
            }
        }
    };

    
    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <div>
            {loading && <Loader></Loader>}
            {!loading && Images?.map((a) => (
                <div className='ImageSectionBackend' key={a._id}>
                    <img className='h-44 w-80 border-4 border-green-300' src={a.image} alt="" />
                    <p className='font-bold mb-4'>{a.imageTitle}</p>
                    <p> <span className='font-bold text-slate-500'>Description:</span> {a.imageDescription}</p>
                    <button className='btn  btn-error mt-2' onClick={() => handleDelete(a._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default ManageImageGalleryComp;
