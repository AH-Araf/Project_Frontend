import img1 from "../../../assets/home/Alumni/md-ebrahim-kholil.png";
import img2 from "../../../assets/home/Alumni/sristy.jpeg";
import img3 from "../../../assets/home/Alumni/mehedi.jpeg";
import img4 from "../../../assets/home/Alumni/jubayer.jpeg";
import img5 from "../../../assets/home/Alumni/shawon.jpeg";


const Alumni = () => {
    return (
        <div>
            <div className="m-10">
                <h2 className="text-3xl font-bold mb-2 text-center">Outstanding Alumni</h2>
                <p className="text-center">Your experience does not stop when you graduate.</p>
            </div>
            <div className="flex ">

                <div className="border-2 h-[250px] w-[250px] text-center m-6 hover:bg-slate-300">
                    <div >
                        <img className="h-[100px] w-[100px] rounded-full mt-6 ms-16" src={img1} alt="" />
                    </div>
                    <h1 className="mt-10">Md. Ebrahim Khalil</h1>
                    <p>Assistant Software Engineer</p>
                    <p>ICT Wing, BAIUST	</p>
                </div>
                <div className="border-2 h-[250px] w-[250px] text-center m-6 hover:bg-slate-300">
                    <div>
                        <img className="h-[100px] w-[100px] rounded-full mt-6 ms-16" src={img2} alt="" />
                    </div>
                    <h1>Ismeat Rahman Sristy</h1>
                    <p>Business Development Executive,</p>
                    <p> US Bangla Group</p>

                </div>

                <div className="border-2 h-[250px] w-[250px] text-center m-6 hover:bg-slate-300">
                    <div>
                        <img className="h-[100px] w-[100px] rounded-full mt-6 ms-16" src={img3} alt="" />
                    </div>
                    <h1>Mahadi Hasan Tamim</h1>
                    <p>Territory Manager</p>
                    <p>Robi Axiata Ltd</p>
                </div>
                <div className="border-2 h-[250px] w-[250px] text-center m-6 hover:bg-slate-300">
                    <div>
                        <img className="h-[100px] w-[100px] rounded-full mt-6 ms-16" src={img4} alt="" />
                    </div>
                    <h1>Jubair Talha Hossain</h1>
                    <p>Assistant Officer</p>
                    <p>IFIC Bank PLC</p>
                </div>
                <div className="border-2 h-[250px] w-[250px] text-center m-6 hover:bg-slate-300">
                    <div>
                        <img className="h-[100px] w-[100px] rounded-full mt-6 ms-16" src={img5} alt="" />
                    </div>
                    <h1>Mahamudul Hasan Shaon </h1>
                    <p>Account Management,</p>
                    <p> Commercial foodpanda Bangladesh Ltd.</p>

                </div>


                
            </div>
            {/* ------------------------------------ */}

        </div>
    );
};

export default Alumni;