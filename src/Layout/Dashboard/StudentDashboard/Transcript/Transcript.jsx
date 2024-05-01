/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import Loader from "../../../../components/Loader/Loader";

const Transcript = () => {
    const { user } = useContext(AuthContext);

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading status

    useEffect(() => {
        setLoading(true); // Set loading to true when data fetching starts
        fetch(`http://localhost:5000/resultSheet?studentEmail=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setResults(data);
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch(error => {
                console.error('Error fetching results:', error);
                setLoading(false); // Set loading to false if there's an error
            });
    }, [user?.email]);

    // Function to calculate total CGPA
    const calculateTotalCGPA = () => {
        const totalGPA = results.reduce((acc, cur) => acc + cur.gpa, 0);
        return (totalGPA / results.length).toFixed(2);
    };

    // PDF document styles
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            padding: 30,
        },
        header: {
            fontSize: 20,
            marginBottom: 20,
            textAlign: 'center',
        },
        semester: {
            fontSize: 18,
            marginBottom: 10,
        },
        gpa: {
            fontSize: 16,
            marginBottom: 5,
        },
        totalCGPA: {
            fontSize: 16,
            marginTop: 20,
            textAlign: 'center',
        },
    });

    // Function to render PDF document
    const MyDocument = () => (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.header}>Transcript</Text>
                {results.map((result, index) => (
                    <View key={result._id} style={{ marginBottom: 20 }}>
                        <Text style={styles.semester}>{result.session} {result.year}</Text>
                        <Text style={styles.gpa}>GPA: {result.gpa.toFixed(2)}</Text>
                    </View>
                ))}
                <Text style={styles.totalCGPA}>Total CGPA Till Now: {calculateTotalCGPA()}</Text>
            </Page>
        </Document>
    );

    return (
        <div>
            {loading ? (
                <Loader /> // Render loader component if loading is true
            ) : (
                <div>
                    <h2 className="text-center text-3xl font-bold bg-slate-600 text-white py-2 mb-6">Transcript</h2>
                    <div className="m-10 font-bold shadow-xl rounded-sm">
                        <div className="text-center text-lg bg-slate-200"><h2>Total Semesters: {results.length}</h2></div>
                        {results.map((result, index) => (
                            <div key={result._id} className="text-center mt-5">
                                <h3>{result.session} {result.year} GPA: {result.gpa.toFixed(2)}</h3>
                            </div>
                        ))}
                        <div className="text-center mt-8 font-bold text-xl">
                            <PDFDownloadLink document={<MyDocument />} fileName="transcript.pdf">
                                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Transcript')}
                            </PDFDownloadLink>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Transcript;
