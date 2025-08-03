import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import type { ICollege } from '../../types/interface';

const AdmissionPage = () => {
    const [colleges, setColleges] = useState<ICollege[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/colleges")
            .then((res) => res.json())
            .then((data) => {
                setColleges(data?.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching colleges:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="w-full text-center py-20 text-lg font-medium text-gray-600">
                Loading colleges...
            </div>
        );
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-3xl p-8 bg-white shadow-2xl rounded-xl">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
                    Choose a College for Admission
                </h2>

                <div className="space-y-4">
                    {colleges.map(college => (
                        <Link
                            key={college._id}
                            to={`/admission/${college._id}`}
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