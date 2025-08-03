import { useEffect, useState } from "react";
import useAuth from "../../hook/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import type { IAdmission } from "../../types/interface";

const MyCollegePage = () => {
    const { user } = useAuth();
    const [admissions, setAdmissions] = useState<IAdmission[]>([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    useEffect(() => {
        if (!user?.email) return;

        axios
            .get(`http://localhost:5000/api/v1/admission/${user.email}`)
            .then((res) => setAdmissions(res.data.data))
            .catch((err) => console.error("Failed to fetch admission:", err));
    }, [user?.email]);

    const handleReviewSubmit = async () => {
        if (!admissions || !user?.email) return;

        try {
            const response = await axios.put(
                `http://localhost:5000/api/v1/admission/${user.email}`,
                { rating, comment }
            );

            if (response.data.success) {
                toast.success("Review submitted!");
                setComment("");
                setRating(5);
                setAdmissions((prev) =>
                    prev.map((admission) =>
                        admission._id === response.data.review.admissionId
                            ? {
                                ...admission,
                                reviews: [...(admission.reviews || []), response.data.review],
                            }
                            : admission
                    )
                );
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toast.error("Review submission failed.");
        }
    };
    if (admissions.length === 0) return <p className="text-center mt-10">Loading your admission...</p>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="bg-white shadow-lg rounded-xl p-6 sm:p-10">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">My College</h2>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
                    {admissions.map((admission) => (
                        <div
                            key={admission._id}
                            className="flex flex-col items-center text-center bg-white border shadow-md rounded-xl p-6 transition-transform hover:scale-105 hover:shadow-lg"
                        >
                            <img
                                src={admission.image}
                                alt="Candidate"
                                className="w-28 h-28 object-cover rounded-full border-4 border-blue-200 mb-4"
                            />
                            <h4 className="text-xl font-bold text-blue-800 mb-1">{admission.college?.name}</h4>
                            <p className="text-gray-600">
                                <strong>Subject:</strong> {admission.subject}
                            </p>
                            <p className="text-gray-600">
                                <strong>Candidate:</strong> {admission.candidateName}
                            </p>
                        </div>
                    ))}
                </div>
                <hr className="my-8" />
                <h3 className="text-2xl font-semibold mb-4 text-blue-500">Add a Review</h3>
                <div className="grid gap-4">
                    <div>
                        <label className="block mb-1 font-medium">Rating</label>
                        <input
                            type="number"
                            value={rating}
                            min={1}
                            max={5}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Comment</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={4}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        onClick={handleReviewSubmit}
                        className="w-full cursor-pointer sm:w-auto bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Submit Review
                    </button>
                </div>

                <hr className="my-8" />

                <h3 className="text-2xl font-semibold mb-4">Your Reviews</h3>
                {admissions[0]?.reviews?.length ? (
                    <div className="space-y-4">
                        {admissions[0].reviews.map((review, idx) => (
                            <div
                                key={idx}
                                className="bg-gray-50 border-l-4 border-blue-400 p-4 rounded shadow-sm"
                            >
                                <p className="text-lg font-semibold">
                                    Rating: {review.rating}
                                </p>
                                <p className="text-gray-700">{review.comment}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {new Date(review.reviewedAt).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">No reviews added yet.</p>
                )}
            </div>
        </div>
    );
};

export default MyCollegePage;