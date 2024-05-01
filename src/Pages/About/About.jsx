import background from '../../assets/home/banner/banner7.jpg';
import BVLogo from '../../assets/Logo/bvLogo.png';

import './About.css'
const About = () => {
    return (
        <div className='aboutp'>
            <div>

                <img className=' h-[300px]  lg:h-[500px]  lg:w-full' src={background} alt="" />
                <p className='absolute h-[150px] lg:h-[300px] -mt-32 lg:-mt-6  w-[400px] lg:w-[1200px] item-center p-6 pt-16
          text-center text-3xl lg:text-8xl font-bold top-1/2 left-1/2 bg-opacity-50 bg-black transform -translate-x-1/2 -translate-y-1/2 text-white'>My BAIUST</p>
            </div>
            {/* ------------------------banner end-------------------------------------------------         */}

            <div className='lg:flex mt-10 ml-10 lg:ml-32'>

                {/* ----------------Teachers------------ */}
                <div className=' m-3 border-2 about'>
                    {/* <h1>150</h1> */}
                    <h2>  Certified Teachers : <span>150</span> </h2>
                    <div>
                        <h1>CSE : </h1>
                        <p>21
                            Faculty Members
                        </p>
                        <h1>EEE :</h1>
                        <p>17
                            Faculty Members</p>
                        <h1>CE</h1>
                        <p>
                            17
                            Faculty Members</p>
                        <h1>Business Administration</h1>
                        <p>
                            21
                            Faculty Members</p>
                        <h1>English</h1>
                        <p>15
                            Faculty Members</p>
                    </div>

                </div>
                {/* --------------Present Student-------------------------------- */}
                <div className='m-3
border-2 about'>
                    <h2>Current Students : <span> 1634</span></h2>
                    <h1>CSE:</h1>
                    <p>390
                        Current Students
                    </p>
                    <h1>EEE:</h1>
                    <p>
                        125
                        Current Students</p>
                    <h1>CE:</h1>
                    <p>
                        87
                        Current Students</p>
                    <h1>Business Administration:</h1>
                    <p>400
                        Current Students</p>
                    <h1>English:</h1>
                    <p>
                        297
                        Current Students</p>


                </div>
                {/* -------------------Graduated Students------------------------- */}
                <div className='border-2 m-3 about' >

                    <h2>  Graduated Students : <span>1083</span> </h2>
                    <h1>CSE:</h1>
                    <p>377
                        Graduated Students</p>
                    <h1>EEE:</h1>
                    <p>
                        193
                        Graduated Students</p>
                    <h1>CE:</h1>
                    <p>
                        79
                        Graduated Students</p>
                    <h1>Business Administration:</h1>
                    <p>264
                        Graduated Students</p>
                    <h1>English:</h1>
                    <p>
                        169
                        Graduated Students</p>

                </div>



            </div>


            {/* -----------------BAIUST AT A GLANCE--------------------------------- */}
            <div className='m-10 bg-cyan-50 p-7'>
                <h4 className='text-4xl text-center font-bold mb-6'>BAIUST AT A GLANCE</h4>
                <h6 className='text-justify mx-10' >Bangladesh Army International University of Science and Technology (BAIUST), a pioneer private university of Bangladesh Armed Forces, commenced its academic session on 14 February 2015 as an aspiring center of excellence for higher education, research, and development in science, engineering, technology, business, and humanities. The university has been established at the initiative of the Hon’ble Prime Minister and sponsored by the Bangladesh Army Welfare Trust. The university has been duly approved by the Ministry of Education and University Grants Commission and raised in full compliance with their instructions following the Private University Act 2010.
                    <br />
                    BAIUST is located in a secure and serene environment of Syedpur, Adarsha Sadar, Cumilla, adjacent to Dhaka Chattogram Highway. It encompasses all components to make the University a hub of teaching, learning, and research.
                    <br />
                    BAIUST started its academic journey with the Department of Computer Science and Engineering (CSE) and Electrical and Electronic Engineering (EEE) in Spring 2015. The BBA program was initiated under the School of Business in Fall 2015. Later, the university opened the Civil Engineering Department under the Faculty of Civil Engineering and the Department of English under the Faculty of Science & Humanities in Spring 2016. Finally, the LL.B. program under the Department of Law launched in Spring 2019.
                    <br />
                    BAIUST has an automated central library filled with numerous books and journals. The university provides hostel facilities for both male and female students. The halls are equipped with all the modern amenities and are located in the calm and serene environment of the permanent campus.
                    <br />
                    Though BAIUST is mainly a science and technology university, it has opened up a new horizon for business and humanities studies. Its motto is Knowledge, Wisdom and Technology.</h6>
            </div>

            {/* -------------------------------------Mission & Vission------------------------------------------ */}


            <div className='mx-20 text-justify'>

                <h4 className='text-2xl font-bold mb-3 text-center'><strong>Vision:</strong></h4>
                <p>The university aspires to transform into a center of excellence in Science, Engineering, and Technology by providing innovative, multi-disciplinary programs to the young generation of the country and beyond, It endeavors to be the hub of knowledge and be recognized as a leading university of the country.</p>
                <h4 className='text-2xl font-bold my-3 text-center'><strong>Mission:</strong></h4>
                <p>The mission of BAIUST is to provide state-of-the-art education and research in Science, Engineering, and other relevant programs to develop human resources for the socio-economic well-being of society.</p>
                <h4 className='text-2xl font-bold my-3 text-center'><strong>Objectives:</strong></h4>
                <ul>
                    <li>To offer need-based programs and important disciplines of Science, Technology, Social Science, and Business for both undergraduate and graduate students.</li>
                    <li>To strive for excellence by providing quality teaching through wide variety of instructional approaches.</li>
                    <li>To produce highly competent and global standard manpower in Science and Technology; who will be proficient in communication skills, critical thinking, and analytical abilities.</li>
                    <li>To generate adequate resources to support the university’s instructions, research, and extension pursuits.</li><li>To provide a timely, accessible, and friendly support system that promotes partnership and a sense of shared responsibilities amongst students, faculties, alumni and other stakeholders.</li>
                    <li>To strive for the gradual expansion of faculties, departments and programs in accordance with the need and in abidance with the Private University Act 2010.</li>
                    <li>To develop joint collaboration with similar universities, institutes, and organizations, both at home and abroad, and make agreements and Memorandum of Understanding (MoU) to this effect.</li>
                    <li>To sensitize and infuse amongst the students and the graduates the core values of BAIUST i.e., Integrity, Openness, Intellectual curiosity, Commitment to excellence, Self-discipline, Sense of responsibility, diversity, and Respect for others.</li><li>To carry out other necessary works of the university to meet the needs of the time.</li>
                </ul>
                <h4 className='text-2xl font-bold my-3 text-center'><strong>Core Values: </strong></h4>
                <p><strong>Integrity:  </strong>It is a commitment to uphold the highest standard of moral, ethical, and professional conduct.</p>
                <p><strong>Openness:  </strong>One should think clearly, and study freely with an open mind willing to learn and examine complex problems with reasoning.</p>
                <p><strong>Intellectual Curiosity:</strong>  One must strive to broaden his/her knowledge, stretch intellectual horizon, and push beyond the comfort zone. As one gains knowledge, it will give him/her power, authority, and confidence. </p>
                <p><strong>Commitment to Excellence:</strong>  The commitment to produce highly competent and global standard manpower in science and technology who will be proficient in communication skills, critical thinking, and analytical abilities. The aim is to search for truth and delivery of socially relevant, scientific and technological contributions. This is a place where hard work will be rewarded and talents will be nurtured. </p>
                <p><strong>Self-Discipline:  </strong>One must impose self-discipline to abide by the rules, and regulations of the University and beyond.</p>
                <p><strong>Sense of Responsibility:</strong>  All must inculcate a sense of responsibility, and discharge the assigned duties judiciously.</p>
                <p><strong>Diversity:</strong>  In due course of time, the University aims to have students, faculty, and researchers from various disciplines, nationalities, and cultural backgrounds.</p>
                <p><b>Respect for others:    </b>As members are from devise cultures, races, and religions, all must show respect for others.</p>
            </div>
            {/* ------------Various logo--------- */}
            <img className='h-[600px] w-[1200px m-10' src={BVLogo} alt="" />





        </div>
    );
};

export default About;