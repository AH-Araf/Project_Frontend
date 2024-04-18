/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
        padding: 20,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

const ManageSingleAdmission = () => {
    const admissionData = useLoaderData();
    const { image, YourName, Age, PhoneNumber, Email, Address, ResultSSC, ResultHSC, Subject, SSCHSC } = admissionData;

    // State to track if the PDF download is initiated
    const [downloading, setDownloading] = useState(false);

    // Function to render the PDF document
    const AdmitCardPDF = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Name: {YourName}</Text>
                    <Text>Age: {Age}</Text>
                    <Text>Email: {Email}</Text>
                    <Text>Phone Number: {PhoneNumber}</Text>
                    <Text>Address: {Address}</Text>
                    <Text>Subject: {Subject}</Text>
                    <Text>SSC Result: {ResultSSC}</Text>
                    <Text>HSC Result: {ResultHSC}</Text>
                    <Text>Combined SSC/HSC Result: {SSCHSC}</Text>
                </View>
            </Page>
        </Document>
    );

    
    return (
        <div className="container mx-auto px-4 py-8 flex flex-col items-center bg-blue-50">
            <div className="mb-8">
                <img src={image} alt="Applicant's Avatar" className="w-full shadow-2xl border-8 rounded-2xl border-white" style={{ maxWidth: "300px" }} />
            </div>
            <div className="shadow-2xl bg-white rounded-lg p-6 w-full md:w-3/4 lg:w-1/2">
                <p className="text-2xl font-bold mb-4 text-center">Applicant Full Details</p>
                <div className="mb-4">
                    <p className="text-lg font-semibold">Name: {YourName}</p>
                    <p className="text-sm text-gray-600">Age: {Age}</p>
                </div>
                <div className="mb-4">
                    <p className="text-lg font-semibold">Contact Information</p>
                    <p>Email: <span className="text-blue-500 font-semibold">{Email}</span></p>
                    <p>Phone Number: {PhoneNumber}</p>
                    <p>Address: {Address}</p>
                </div>
                <div className="mb-4">
                    <p className="text-lg font-semibold">Academic Information</p>
                    <p>Subject: {Subject}</p>
                    <p>SSC Result: {ResultSSC}</p>
                    <p>HSC Result: {ResultHSC}</p>
                    <p>Combined SSC/HSC Result: {SSCHSC}</p>
                </div>
                <div className="flex justify-center mb-4">
                    {/* Render the PDF download link conditionally */}
                    {downloading ? (
                        <p>Downloading...</p>
                    ) : (
                            <PDFDownloadLink className="text-red-500 font-bold border-b-2 border-red-500" document={<AdmitCardPDF />} fileName={YourName}>
                            {({ blob, url, loading, error }) =>
                                loading ? 'Loading document...' : 'Download Admit Card'
                            }
                        </PDFDownloadLink>
                    )}
                </div>
                <div className="flex justify-center mt-6">
                    <Link to="/dashboard/ManageAdmission" className="btn-p">Back Page</Link>
                </div>
            </div>
        </div>
    );
};

export default ManageSingleAdmission;
