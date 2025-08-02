import { useState } from 'react';

interface Review {
    name: string;
    university: string;
    rating: number;
    comment: string;
}

const ReviewsSection = () => {
    const [reviews, setReviews] = useState<Review[]>([
        {
            name: "Morshed Alam",
            university: "University of Dhaka",
            rating: 5,
            comment: "Outstanding faculty and research environment!",
        },
        {
            name: "Jannatul Ferdous",
            university: "Bangladesh University of Engineering and Technology (BUET)",
            rating: 4.5,
            comment: "Challenging but rewarding — top engineering campus.",
        },
        {
            name: "Tawfiq Rahman",
            university: "North South University",
            rating: 4,
            comment: "Modern campus with great extracurricular support.",
        },
    ]);

    const [form, setForm] = useState({ name: '', university: '', rating: '', comment: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newReview: Review = {
            name: form.name,
            university: form.university,
            rating: parseFloat(form.rating),
            comment: form.comment,
        };
        setReviews([newReview, ...reviews]);
        setForm({ name: '', university: '', rating: '', comment: '' });
    };

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={`full-${i}`}>&#9733;</span>); // ★
        }
        if (halfStar) stars.push(<span key="half">&#9734;</span>); // ☆
        return <span className="text-yellow-500">{stars}</span>;
    };

    return (
        <section className="py-10 px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-blue-600">
                🎤 University Student Reviews
            </h2>

            {/* Review Form */}
            <div className="max-w-3xl mx-auto mb-12">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-xl p-8 rounded-xl space-y-6 border border-blue-100"
                >
                    <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                        Submit Your University Review
                    </h3>

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        />
                    </div>

                    {/* University */}
                    <div>
                        <label htmlFor="university" className="block text-sm font-medium text-gray-700">
                            University Name
                        </label>
                        <input
                            type="text"
                            id="university"
                            name="university"
                            placeholder="e.g., Dhaka University, BRAC University"
                            value={form.university}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        />
                    </div>

                    {/* Rating */}
                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                            Rating (0 - 5)
                        </label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            placeholder="Rate from 0 to 5"
                            step="0.5"
                            min="0"
                            max="5"
                            value={form.rating}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        />
                    </div>

                    {/* Comment */}
                    <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                            Your Comment
                        </label>
                        <textarea
                            id="comment"
                            name="comment"
                            placeholder="Your experience in brief"
                            value={form.comment}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="mt-2 w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        />
                    </div>

                    {/* Submit */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500"
                        >
                            Submit Review
                        </button>
                    </div>
                </form>
            </div>

            {/* Displayed Reviews */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        className="bg-white border border-blue-100 rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300"
                    >
                        <h3 className="text-xl font-semibold text-blue-700">{review.name}</h3>
                        <p className="text-sm text-gray-500 italic">{review.university}</p>
                        <div className="mt-2 text-lg">{renderStars(review.rating)}</div>
                        <p className="mt-4 text-gray-700 leading-relaxed">"{review.comment}"</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ReviewsSection;