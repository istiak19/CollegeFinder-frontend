import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { ICollege } from "../../types/interface";

const CollegeDetails = () => {
    const [college, setCollege] = useState<ICollege | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:5000/api/v1/colleges/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setCollege(data.data);
            })
            .catch((err) => {
                console.error("Failed to fetch college data", err);
            });
    }, [id]);

    if (!college) {
        return (
            <div className="text-center py-20 text-lg text-gray-600">
                Loading college details...
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="rounded-xl overflow-hidden shadow-md">
                <img
                    src={college.image}
                    alt={college.name}
                    className="w-full h-64 object-cover"
                />
            </div>

            <div className="mt-6">
                <h1 className="text-3xl md:text-4xl font-bold text-blue-800">{college.name}</h1>
                <p className="text-gray-700 mt-3 text-lg">{college.description}</p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
                    <p><strong>Admission Date:</strong> {college.admissionDate}</p>
                    <p><strong>Rating:</strong> {college.rating}</p>
                    <p><strong>Research Publications:</strong> {college.researchCount}</p>
                </div>

                {college.events?.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold text-blue-700 mb-2">Events</h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-1">
                            {college.events.map((event, i) => (
                                <li key={i}>{event}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {college.sports?.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-2xl font-semibold text-blue-700 mb-2">Sports Facilities</h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-1">
                            {college.sports.map((sport, i) => (
                                <li key={i}>{sport}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CollegeDetails;