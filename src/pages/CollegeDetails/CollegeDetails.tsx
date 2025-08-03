import { useParams } from "react-router";
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

const CollegeDetails = () => {
    const { id } = useParams();
    const college = colleges.find(col => col.id === id);

    if (!college) return <div className="p-6">College not found.</div>;

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
                    <p><strong> Rating:</strong> {college.rating}</p>
                    <p><strong>Research Publications:</strong> {college.researchCount}</p>
                </div>

                <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-blue-700 mb-2">Events</h3>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        {college.events.map((event, i) => (
                            <li key={i}>{event}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-6">
                    <h3 className="text-2xl font-semibold text-blue-700 mb-2">Sports Facilities</h3>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        {college.sports.map((sport, i) => (
                            <li key={i}>{sport}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CollegeDetails;