import { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';


// Import Tab components
import CSE from './Tab/CSE';
import EEE from './Tab/EEE';
import CE from './Tab/CE';
import BBA from './Tab/BBA';
import ENG from './Tab/ENG';
import LLB from './Tab/LLB';
import Loader from '../../../components/Loader/Loader';

const Faculty = () => {
    const [facultyData, setFacultyData] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/faculty');
            setFacultyData(response.data);
            setLoading(false); // Set loading to false once data is fetched
        } catch (error) {
            console.error('Error fetching faculty data: ', error);
            setLoading(false); // Set loading to false in case of error
        }
    };

    return (
        <div className=''>
            {loading ? ( // Display loader if loading state is true
                <Loader />
            ) : (
                <Tabs>
                    <TabList className='flex justify-center bg-blue-100'>
                        <Tab>CSE</Tab>
                        <Tab>EEE</Tab>
                        <Tab>CE</Tab>
                        <Tab>BBA</Tab>
                        <Tab>ENG</Tab>
                        <Tab>LLB</Tab>
                    </TabList>

                    <TabPanel>
                        <CSE facultyData={facultyData.filter(item => item.Department === 'CSE')} />
                    </TabPanel>

                    <TabPanel>
                        <EEE facultyData={facultyData.filter(item => item.Department === 'EEE')} />
                    </TabPanel>

                    <TabPanel>
                        <CE facultyData={facultyData.filter(item => item.Department === 'CE')} />
                    </TabPanel>

                    <TabPanel>
                        <BBA facultyData={facultyData.filter(item => item.Department === 'BBA')} />
                    </TabPanel>

                    <TabPanel>
                        <ENG facultyData={facultyData.filter(item => item.Department === 'ENG')} />
                    </TabPanel>

                    <TabPanel>
                        <LLB facultyData={facultyData.filter(item => item.Department === 'LLB')} />
                    </TabPanel>
                </Tabs>
            )}
        </div>
    );
};

export default Faculty;
