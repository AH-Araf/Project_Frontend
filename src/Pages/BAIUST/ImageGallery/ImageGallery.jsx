import  { useState, useEffect } from 'react';
import './ImageGallery.css'
import Loader from "../../../components/Loader/Loader";

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await fetch(' http://localhost:5000/image');
            const data = await response.json();
            setImages(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching images:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className='image-section'>
            <div className='image-section2'>
                <h2 className='text-center text-2xl py-2 text-white font-bold bg-emerald-400'>Image Gallery</h2>
                {images.map(image => (
                    <div data-aos="fade-up" className='my-10 border-2 border-emerald-200 p-2 shadow-lg shadow-emerald-200' key={image._id}>
                        <img className='image-gallery' src={image.image} alt={image.imageTitle} />
                        <h3 className='font-bold text-emerald-600'>{image.imageTitle}</h3>
                        <p className='text-slate-500'>{image.imageDescription}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
