import { Link } from "react-router";

const colleges = [
    {
        id: "1",
        name: "University of Dhaka",
        image: "/images/du.jpg",
        rating: 4.8,
        admissionDate: "2025-07-01",
        researchCount: 200,
        events: ["Convocation", "Cultural Week", "Science Fair"],
        sports: ["Cricket", "Football", "Athletics"],
        description: "The oldest and most prestigious public university in Bangladesh."
    },
    {
        id: "2",
        name: "Bangladesh University of Engineering and Technology (BUET)",
        image: "/images/buet.jpg",
        rating: 4.9,
        admissionDate: "2025-06-15",
        researchCount: 300,
        events: ["Techfest", "Robotics Challenge"],
        sports: ["Chess", "Football", "Basketball"],
        description: "BUET is the leading institution for engineering and architecture."
    },
    {
        id: "3",
        name: "North South University (NSU)",
        image: "/images/nsu.jpg",
        rating: 4.5,
        admissionDate: "2025-08-10",
        researchCount: 100,
        events: ["Career Fair", "Debate Championship"],
        sports: ["Table Tennis", "Basketball", "Cricket"],
        description: "NSU is a top-ranked private university with global partnerships."
    },
    {
        id: "4",
        name: "BRAC University",
        image: "/images/brac.jpg",
        rating: 4.6,
        admissionDate: "2025-07-20",
        researchCount: 110,
        events: ["Entrepreneurship Week", "AI Conference"],
        sports: ["Badminton", "Volleyball", "Football"],
        description: "BRACU is known for innovation, research, and social impact."
    },
    {
        id: "5",
        name: "Jahangirnagar University",
        image: "/images/ju.jpg",
        rating: 4.4,
        admissionDate: "2025-07-05",
        researchCount: 90,
        events: ["Drama Festival", "Photography Exhibition"],
        sports: ["Cricket", "Swimming", "Kabaddi"],
        description: "A scenic public university known for culture and natural beauty."
    },
    {
        id: "6",
        name: "Rajshahi University",
        image: "/images/ru.jpg",
        rating: 4.3,
        admissionDate: "2025-07-12",
        researchCount: 80,
        events: ["Book Fair", "Science Olympiad"],
        sports: ["Football", "Cricket", "Handball"],
        description: "A major public university in North Bengal with a rich history."
    }
];

const Colleges = () => {
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

                            <Link to={`/colleges/${college.id}`} className="mt-auto">
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