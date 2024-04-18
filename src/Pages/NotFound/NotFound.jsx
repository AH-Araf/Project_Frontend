import img from '../../assets/image/notFound.jpg';

const NotFound = () => {
    return (
        <div className="relative w-full h-[625px]">
            {/* Background image */}
            <img className="absolute inset-0 w-full h-full object-cover" src={img} alt="" />

            {/* Overlay with shadow */}
            <div className="absolute inset-0 bg-black opacity-70"></div>

            {/* Text content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h1 className="text-6xl text-emerald-400 font-bold mb-4">BAIUST</h1>
                <h2 className="text-4xl text-red-300 font-bold mb-4">Page Not Found</h2>
                <p className="text-lg">Please Try With Proper Link</p>
            </div>
        </div>
    );
};

export default NotFound;
