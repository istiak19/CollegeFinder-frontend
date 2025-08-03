import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { ICollege } from "../../types/interface";

const Colleges = () => {
    const [colleges, setColleges] = useState<ICollege[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://college-finder-alpha.vercel.app/api/v1/colleges")
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
    }

    return (
        <div className="w-11/12 max-w-7xl mx-auto py-10">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-700">
                Top Universities in Bangladesh
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {colleges.map(college => (
                    <div
                        key={college.id}
                        className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full"
                    >
                        <div className="h-48 overflow-hidden">
                            <img
                                src={college.image}
                                alt={college.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>

                        <div className="flex flex-col flex-grow p-5">
                            <h2 className="text-xl font-semibold text-gray-800 mb-1">{college.name}</h2>
                            <p className="text-sm text-gray-500 mb-2 flex-grow">{college.description}</p>

                            <div className="text-sm text-gray-700 space-y-1 mb-4">
                                <p>⭐ Rating: <span className="font-medium">{college.rating}</span></p>
                                <p>📅 Admission Date: {college.admissionDate}</p>
                                <p>🔬 Research Publications: {college.researchCount}</p>
                            </div>

                            <Link to={`/colleges/${college._id}`} className="mt-auto">
                                <button className="w-full bg-blue-500 hover:bg-blue-600 cursor-pointer text-white py-2 rounded-lg font-medium transition duration-200">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Colleges;