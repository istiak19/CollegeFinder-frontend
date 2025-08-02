import { useState } from 'react';
import { useNavigate } from 'react-router';
import CollegeGallery from '../../components/CollegeGallery/CollegeGallery';
import ReviewsSection from '../../components/ReviewsSection/ReviewsSection';
import FAQ from '../../components/FAQ/FAQ';
import CollegeCarousel from '../../components/CollegeCarousel';
import ResearchPapers from '../../components/ResearchPapers';

const collegeData = [
    {
        id: '1',
        name: 'Harvard University',
        image: '/images/harvard.jpg',
        admissionDate: '2025-09-01',
        events: ['Orientation', 'Tech Fest'],
        research: 'AI & Genomics',
        sports: ['Football', 'Rowing'],
    },
    {
        id: '2',
        name: 'MIT',
        image: '/images/mit.jpg',
        admissionDate: '2025-08-15',
        events: ['Startup Meet', 'Science Fair'],
        research: 'Quantum Computing',
        sports: ['Robotics League', 'Chess'],
    },
    {
        id: '3',
        name: 'Stanford',
        image: '/images/stanford.jpg',
        admissionDate: '2025-07-10',
        events: ['AI Day', 'Cultural Fest'],
        research: 'Neural Networks',
        sports: ['Basketball', 'Swimming'],
    },
];

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const filtered = collegeData.filter(college =>
        college.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-11/12 mx-auto px-4 py-6 space-y-10">
            <section>
                <CollegeCarousel />
            </section>
            {/* Search Section */}
            <div>
                <input
                    type="text"
                    placeholder="Search college by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/2 border px-4 py-2 rounded shadow"
                />
                {searchTerm && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                        {filtered.map(college => (
                            <div key={college.id} className="border rounded-lg shadow p-4">
                                <img src={college.image} className="h-40 w-full object-cover rounded" />
                                <h3 className="text-xl font-semibold mt-2">{college.name}</h3>
                                <p>Admission: {college.admissionDate}</p>
                                <p>Events: {college.events.join(', ')}</p>
                                <p>Research: {college.research}</p>
                                <p>Sports: {college.sports.join(', ')}</p>
                                <button
                                    onClick={() => navigate(`/college/${college.id}`)}
                                    className="mt-3 bg-blue-600 text-white px-4 py-1 rounded"
                                >
                                    Details
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Highlighted Colleges Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Top Colleges</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {collegeData.slice(0, 3).map(college => (
                        <div key={college.id} className="bg-white shadow rounded-lg overflow-hidden">
                            <img src={college.image} alt={college.name} className="h-48 w-full object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-bold">{college.name}</h3>
                                <p><strong>Admission:</strong> {college.admissionDate}</p>
                                <p><strong>Research:</strong> {college.research}</p>
                                <p><strong>Sports:</strong> {college.sports.join(', ')}</p>
                                <button
                                    onClick={() => navigate(`/college/${college.id}`)}
                                    className="mt-2 block bg-blue-500 text-white px-3 py-1 rounded"
                                >
                                    Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Gallery Section */}
            <section>
                <CollegeGallery />
            </section>

            {/* Research Paper Section */}
            <section>
                <ResearchPapers />
            </section>

            {/* Review Section */}
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

export default Home;