import { useState, useEffect } from 'react';
import img1 from '../assets/gallery1.jpg';
import img2 from '../assets/gallery2.jpg';
import img3 from '../assets/gallery3.jpg';
import img4 from '../assets/gallery4.jpg';
import img5 from '../assets/gallery5.jpg';
import img6 from '../assets/gallery6.jpg';

const captions = [
    "Explore our beautiful campus",
    "Join inspiring classrooms",
    "Discover your passion",
    "Build lasting friendships",
    "Grow with extracurriculars",
    "Achieve academic excellence"
];

const CollegeCarousel = () => {
    const images = [img1, img2, img3, img4, img5, img6];
    const [current, setCurrent] = useState(0);
    const total = images.length;

    // Auto-slide every 3 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(timer);
    }, [total]);

    const nextSlide = () => {
        setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
    };

    return (
        <div className="relative mt-10 overflow-hidden">
            {/* Image with caption overlay */}
            <div className="relative">
                <img
                    src={images[current]}
                    alt={`Slide ${current + 1}`}
                    className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] object-cover rounded-xl shadow-xl transition-all duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center">
                    <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold text-center px-4 transition-opacity duration-500">
                        {captions[current]}
                    </h2>
                </div>
            </div>

            {/* Prev Button */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white hover:bg-blue-600 hover:text-white text-gray-700 text-3xl px-3 py-1 rounded-full shadow transition duration-300"
                aria-label="Previous Slide"
            >
                ‹
            </button>

            {/* Next Button */}
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white hover:bg-blue-600 hover:text-white text-gray-700 text-3xl px-3 py-1 rounded-full shadow transition duration-300"
                aria-label="Next Slide"
            >
                ›
            </button>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-4">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-3 w-3 rounded-full transition-all duration-300 ${i === current ? 'bg-blue-600 scale-110' : 'bg-gray-300'
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CollegeCarousel;