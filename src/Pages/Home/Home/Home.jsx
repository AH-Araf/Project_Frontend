// import Alumni from "../Alumni/Alumni";
import Banner from "../Banner/Banner";
import Chancellor from "../Chancellor/Chancellor";
import ChooseB from "../ChooseB/ChooseB";
import Facilities from "../Facilities/Facilities";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ChooseB></ChooseB>
            {/* <Faculty></Faculty> */}
            <Chancellor></Chancellor>
            <Facilities></Facilities>
            {/* <Alumni></Alumni> */}
        </div>
    );
};

export default Home;