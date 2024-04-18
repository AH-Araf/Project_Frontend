import './Loader.css'

const Loader = () => {
    return (
        <div className='flex flex-col items-center justify-center h-[400px]'>
            <span className="loader"></span>
            <p className='font-bold text-lg text-slate-400'>Loading...</p>
        </div>
    );
};

export default Loader;