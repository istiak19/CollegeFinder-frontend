import { Link } from 'react-router';

const colleges = [
    { id: "1", name: "University of Dhaka" },
    { id: "2", name: "Bangladesh University of Engineering and Technology (BUET)" },
    { id: "3", name: "North South University (NSU)" },
    { id: "4", name: "BRAC University" },
    { id: "5", name: "Jahangirnagar University" },
    { id: "6", name: "Rajshahi University" }
];

const AdmissionPage = () => {
    return (
        <section className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-3xl p-8 bg-white shadow-2xl rounded-xl">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
                    Choose a College for Admission
                </h2>

                <div className="space-y-4">
                    {colleges.map(college => (
                        <Link
                            key={college.id}
                            to={`/admission/${college.id}`}
                            className="block py-2 px-4 bg-blue-500 text-white rounded-lg text-center hover:bg-blue-600"
                        >
                            {college.name}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AdmissionPage;