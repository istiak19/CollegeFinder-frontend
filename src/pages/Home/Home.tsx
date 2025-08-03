import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { ICollege } from "../../types/interface";
import CollegeCarousel from "../../components/CollegeCarousel";
import CollegeGallery from "../../components/CollegeGallery/CollegeGallery";
import ReviewsSection from "../../components/ReviewsSection/ReviewsSection";
import FAQ from "../../components/FAQ/FAQ";

const CollegesHome = () => {
    const [collegeData, setCollegeData] = useState<ICollege[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/colleges")
            .then((res) => res.json())
            .then((data) => setCollegeData(data.data || []))
            .catch((err) => console.error("Failed to load colleges", err));
    }, []);

    const filtered = collegeData.filter(college =>
        college.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="px-4 py-10 max-w-7xl mx-auto space-y-12">
            {/* College Carousel Section */}
            <section>
                <CollegeCarousel />
            </section>

            {/* Search Field */}
            <div className="text-center">
                <input
                    type="text"
                    placeholder="Search college by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/2 border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-400"
                />
            </div>

            {/* Search Results */}
            {searchTerm && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Search Results</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {filtered.map((college) => (
                            <div key={college.id} className="bg-white shadow-md rounded-lg p-4">
                                <img
                                    src={college.image}
                                    alt={college.name}
                                    className="h-40 w-full object-cover rounded"
                                />
                                <h3 className="text-xl font-semibold mt-2">{college.name}</h3>
                                <p><strong>Admission:</strong> {college.admissionDate}</p>
                                <p><strong>Events:</strong> {college.events.join(', ')}</p>
                                <p><strong>Research:</strong> {college.researchCount}</p>
                                <p><strong>Sports:</strong> {college.sports.join(', ')}</p>
                                <button
                                    onClick={() => navigate(`/college/${college.id}`)}
                                    className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                >
                                    Details
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Highlighted Colleges Section */}
            <section>
                <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Top University</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {collegeData.slice(0, 3).map((college) => (
                        <div
                            key={college.id}
                            className="bg-gradient-to-br from-blue-50 to-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition flex flex-col"
                        >
                            <img
                                src={college.image}
                                alt={college.name}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-5 flex flex-col justify-between flex-grow">
                                <h3 className="text-lg font-bold text-blue-800">{college.name}</h3>
                                <p><strong>Admission:</strong> {college.admissionDate}</p>
                                <p><strong>Events:</strong> {college.events.join(', ')}</p>
                                <p><strong>Research:</strong> {college.researchCount}</p>
                                <p><strong>Sports:</strong> {college.sports.join(', ')}</p>
                                <button
                                    onClick={() => navigate(`/colleges/${college._id}`)}
                                    className="mt-3 cursor-pointer w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                                >
                                    Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {/* College Gallery Section */}
            <section>
                <CollegeGallery />
            </section>
            {/* Reviews Section */}
            <section>
                <ReviewsSection />
            </section>
            {/* FAQ Section */}
            <section>
                <FAQ />
            </section>
        </div>
    );
};

export default CollegesHome;