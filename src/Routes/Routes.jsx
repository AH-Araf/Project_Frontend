// http://localhost:5000
// http://localhost:5000

import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Journal from "../Pages/BAIUST/Journal/Journal";
import ImageGallery from "../Pages/BAIUST/ImageGallery/ImageGallery";
import Faculty from "../Pages/BAIUST/Faculty/Faculty";
import CertificateVerification from "../Pages/BAIUST/CertificateVerification/CertificateVerification";
import Notice from "../Pages/Notice/Notice";
import Admission from "../Pages/Admission/Admission";
import StudentLogin from "../Pages/Login/StudentLogin";
import AdminLogin from "../Pages/Login/AdminLogin";
import Register from "../Pages/Login/Register/Register";
import Dashboard from "../Layout/Dashboard/Dashboard/Dashboard";
import DashHome from "../Layout/Dashboard/Dashboard/DashHome";
import PrivateRoute from "./PrivateRoute";
import PleaseLoginFirst from "../Pages/Login/PleaseLoginFirst";
import StudentProfile from "../Layout/Dashboard/StudentDashboard/StudentProfile/StudentProfile";
import AllCourses from "../Layout/Dashboard/StudentDashboard/AllCourses/AllCourses";
import SemesterRegistrations from "../Layout/Dashboard/StudentDashboard/SemesterRegistrations/SemesterRegistrations";
import ExamRegistrations from "../Layout/Dashboard/StudentDashboard/ExamRegistrations/ExamRegistrations";
import TransportRegistrations from "../Layout/Dashboard/StudentDashboard/TransportRegistrations/TransportRegistrations";
import PaymentHistory from "../Layout/Dashboard/StudentDashboard/PaymentHistory/PaymentHistory";
import AdmitCard from "../Layout/Dashboard/StudentDashboard/AdmitCard/AdmitCard";
import AttendanceReport from "../Layout/Dashboard/StudentDashboard/AttendanceReport/AttendanceReport";
import SemesterResult from "../Layout/Dashboard/StudentDashboard/SemesterResult/SemesterResult";
import TeachersEvaluation from "../Layout/Dashboard/StudentDashboard/TeachersEvaluation/TeachersEvaluation";
import ManageFaculty from "../Layout/Dashboard/AdminDashboard/ManageFaculty/ManageFaculty";
import ManageImageGallery from "../Layout/Dashboard/AdminDashboard/ManageImageGallery/ManageImageGallery";
import ManageNotice from "../Layout/Dashboard/AdminDashboard/ManageNotice/ManageNotice";
import ManageAdmission from "../Layout/Dashboard/AdminDashboard/ManageAdmission/ManageAdmission";
import AddNewStudents from "../Layout/Dashboard/AdminDashboard/AddNewStudents/AddNewStudents";
import SingleNotice from "../Pages/Notice/SingleNotice";
import AdmissionApply from "../Pages/Admission/AdmissionApply";
import ManageSingleAdmission from "../Layout/Dashboard/AdminDashboard/ManageAdmission/ManageSingleAdmission";
// import StudentProfile from "../Layout/Dashboard/AdminDashboard/CreateStudentProfile/CreateStudentProfile";
import AllStudents from "../Layout/Dashboard/AdminDashboard/AllStudents/AllStudents";
import SingleStudent from "../Layout/Dashboard/AdminDashboard/AllStudents/SingleStudent";
import ManageTransport from "../Layout/Dashboard/AdminDashboard/NewTransportCard/ManageTransport";
import SingleTransportReg from "../Layout/Dashboard/StudentDashboard/TransportRegistrations/SingleTransportReg";
import NewTransportCard from "../Layout/Dashboard/AdminDashboard/NewTransportCard/NewTransportCard";
import CreateStudentProfile from "../Layout/Dashboard/AdminDashboard/CreateStudentProfile/CreateStudentProfile";
import AddCertificate from "../Layout/Dashboard/AdminDashboard/AddCertificate/AddCertificate";
import CertificateVerificationComp from "../Pages/BAIUST/CertificateVerification/CertificateVerificationComp";
import Home from "../Pages/Home/Home/Home";
import NotFound from "../Pages/NotFound/NotFound";
import ManageStudentResult from "../Layout/Dashboard/AdminDashboard/ManageStudentResult/ManageStudentResult";
import Transcript from "../Layout/Dashboard/StudentDashboard/Transcript/Transcript";
// import ManageSingleAdmission from "../Layout/Dashboard/AdminDashboard/ManageAdmission/ManageSingleAdmission";



export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home />,
            },

            //BAIUST
            {
                path: "faculty",
                element: <Faculty></Faculty>,
            },
            {
                path: "journal",
                element: <Journal></Journal>
            },
            {
                path: "imageGallery",
                element: <ImageGallery></ImageGallery>,
            },
            {
                path: "certificateVerification",
                element: <CertificateVerification></CertificateVerification>
            },

            {
                path: "notice",
                element: <Notice></Notice>,
                loader: () => fetch(' http://localhost:5000/notice'),
            },
            {
                path: "/Notice/:id",
                element: <SingleNotice></SingleNotice>,
                loader: async ({ params }) => fetch(` http://localhost:5000/notice/${params.id}`),
            },

            {
                path: "admission",
                element: <Admission></Admission>,
            },
            {
                path: "admissionApply",
                element: <AdmissionApply></AdmissionApply>,
            },

            // Login
            {
                path: "studentLogin",
                element: <StudentLogin></StudentLogin>
            },
            {
                path: "adminLogin",
                element: <AdminLogin></AdminLogin>,
            },
            {
                path: "pleaseLoginFirst",
                element: <PleaseLoginFirst></PleaseLoginFirst>
            },
            {
                path: "register",
                element: <Register></Register>,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/about",
                element: <About />,
            },

            {
                path: "/CertificateVerification/Verify",
                element: <CertificateVerificationComp />,
            },


            //404 route
            {
                path: '*',
                element: <NotFound />,
            },


            // DashBoard items
            {
                path: "/Admission/:id",
                element: <ManageSingleAdmission></ManageSingleAdmission>,
                loader: async ({ params }) => fetch(` http://localhost:5000/admission/${params.id}`),
            },
            {
                path: "/Student/:id",
                element: <SingleStudent></SingleStudent>,
                loader: async ({ params }) => fetch(` http://localhost:5000/userStudent/${params.id}`),
            },

            {
                path: "/transportAuthor/:id",
                element: <SingleTransportReg></SingleTransportReg>,
                loader: async ({ params }) => fetch(` http://localhost:5000/transportAuthor/${params.id}`),
            },

        ],
    },

    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute> ,
        children: [

            // Common--------------------------------------------------------------
            {
                path: 'dashhome', 
                element: <DashHome></DashHome> 
            },

            // Student Route--------------------------------------------------------
            {
                path: 'StudentProfile',
                element: <StudentProfile></StudentProfile>
            },
            {
                path: 'AllCourses',
                element: <AllCourses></AllCourses>
            },
            {
                path: 'SemesterRegistrations',
                element: <SemesterRegistrations></SemesterRegistrations>
            },
            {
                path: 'ExamRegistrations',
                element: <ExamRegistrations></ExamRegistrations>
            },
            {
                path: 'TransportRegistrations',
                element: <TransportRegistrations></TransportRegistrations>
            },
            {
                path: 'PaymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: 'AdmitCard',
                element: <AdmitCard></AdmitCard>
            },
            {
                path: 'AttendanceReport',
                element: <AttendanceReport></AttendanceReport>
            },
            {
                path: 'SemesterResult',
                element: <SemesterResult></SemesterResult>
            },
            {
                path: 'TeachersEvaluation',
                element: <TeachersEvaluation></TeachersEvaluation>
            },
            {
                path: 'Transcript',
                element: <Transcript></Transcript>,
            },
            

            //Admin Route------------------------------------------------------
            {
                path: 'ManageFaculty',
                element: <ManageFaculty></ManageFaculty>
            },
            {
                path: 'ManageImageGallery',
                element: <ManageImageGallery></ManageImageGallery>
            },
            {
                path: 'ManageNotice',
                element: <ManageNotice></ManageNotice>
            },
            {
                path: 'ManageAdmission',
                element: <ManageAdmission></ManageAdmission>
            },
            {
                path: 'AddNewStudents',
                element: <AddNewStudents></AddNewStudents>
            },
            {
                path: 'CreateStudentProfile',
                element: <CreateStudentProfile></CreateStudentProfile>
            },
            {
                path: 'ManageTransport',
                element: <ManageTransport></ManageTransport>
            },

            {
                path: 'TransportCard',
                element: <NewTransportCard></NewTransportCard>
            },
            {
                path: 'AllStudents',
                element: <AllStudents></AllStudents>
            },

            {
                path: 'AddCertificate',
                element: <AddCertificate></AddCertificate>
            },
            {
                path: 'ManageStudentResult',
                element: <ManageStudentResult></ManageStudentResult>
            },

        ]
    }


])