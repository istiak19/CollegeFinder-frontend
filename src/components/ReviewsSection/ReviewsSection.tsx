import { useState, useEffect } from 'react';
import axios from 'axios';
import type { IReview } from '../../types/interface';

interface CollegeReview {
    candidateName: string;
    college: {
        name: string;
    };
    reviews: IReview[];
}

const ReviewsSection = () => {
    const [reviews, setReviews] = useState<CollegeReview[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/review');
                if (response.data.success) {
                    setReviews(response.data.data);
                } else {
                    console.error("Failed to fetch reviews:", response.data.message);
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, []);

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={`full-${i}`}>&#9733;</span>);
        }
        if (halfStar) stars.push(<span key="half">&#9734;</span>);
        return <span className="text-yellow-500">{stars}</span>;
    };

    return (
        <section className="py-10 px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-blue-600">
                University Student Reviews
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {reviews.map((reviewData, index) => (
                    <div
                        key={index}
                        className="bg-white border border-blue-100 rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300"
                    >
                        <h3 className="text-xl font-semibold text-blue-700">{reviewData.candidateName}</h3>
                        <p className="text-sm text-gray-500 italic">{reviewData.college.name}</p>
                        {reviewData.reviews.map((review, idx) => (
                            <div key={idx} className="mt-2">
                                <div className="text-lg">{renderStars(review.rating)}</div>
                                <p className="mt-4 text-gray-700 leading-relaxed">"{review.comment}"</p>
                                <p className="mt-2 text-sm text-gray-500">
                                    Reviewed on {new Date(review.reviewedAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ReviewsSection;