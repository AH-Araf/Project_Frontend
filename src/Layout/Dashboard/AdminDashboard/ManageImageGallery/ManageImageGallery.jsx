
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';
// import './AdminDashboardCommon.css'
import Swal from 'sweetalert2';
import ManageImageGalleryComp from './ManageImageGalleryComp';




const ManageImageGallery = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = `771e92fe5bf3b4553445891d6b44f4a1`;


    const handleAddImage = data => {
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
                    const imageData = {
                        image: imgData.data.url,
                        imageTitle: data.imageTitle,
                        imageDescription: data.imageDescription,
                    };

                    fetch(' http://localhost:5000/image', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(imageData)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            Swal.fire({
                                icon: 'success',
                                title: 'Image added successfully',
                                showConfirmButton: false,
                                timer: 1500,
                            }).then(() => {
                                window.location.reload();
                            });
                        })
                        .catch(error => {
                            console.error('Error adding exp:', error);
                            Swal.fire({
                                icon: 'error',
                                title: 'Error adding exp',
                            });
                        });
                }
            })
            .catch(error => {
                console.error('Error uploading image:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error uploading image',
                });
            });
    };

    return (
        <div className='AdminDashBoardMainSection m-2'>

            <div data-aos="zoom-in">
                <h2 className="text-3xl bg-green-300 text-center p-2 rounded-lg">Add Image Here</h2>

                <form onSubmit={handleSubmit(handleAddImage)}>


                    <section className="">

                        <div className="form-control w-full max-w-xs  mt-6">
                            <label className="label"> <span className="label-text">Add Image</span></label>
                            <input type="file" {...register("image", {
                                required: "Image is Required"
                            })} className="input  w-full max-w-xs border-2 pt-2 border-black" />
                            {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Image Title</span></label>
                            <input type="text" {...register("imageTitle", {
                                required: "institute is Required"
                            })} className="input  border-2 border-black w-full max-w-xs" />
                            {errors.imageTitle && <p className='text-red-500'>{errors.imageTitle.message}</p>}
                        </div>


                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Image Description</span></label>
                            <input type="text" {...register("imageDescription", {
                                required: false
                            })} className="input border-2 border-black w-full max-w-xs" />
                            {errors.imageDescription && <p className='text-red-500'>{errors.imageDescription.message}</p>}
                        </div>


                    </section>
                    <input onClick={toast} className='btn btn-accent w-full mt-4 mb-10' value="Add" type="submit" />
                </form>

            </div>

            <div className='w-96 overflow-y-auto h-screen'>
                <ManageImageGalleryComp></ManageImageGalleryComp>
            </div>
        </div>
    );
};

export default ManageImageGallery;