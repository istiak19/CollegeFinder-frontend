import img1 from '../../assets/gallery1.jpg';
import img2 from '../../assets/gallery2.jpg';
import img3 from '../../assets/gallery3.jpg';
import img4 from '../../assets/gallery4.jpg';
import img5 from '../../assets/gallery5.jpg';
import img6 from '../../assets/gallery6.jpg';

const CollegeGallery = () => {
    const images = [img1, img2, img3, img4, img5, img6];

    return (
        <section className="py-10">
            <h2 className="text-3xl font-bold mb-10 text-center text-blue-600">
                🎓 College Graduate Gallery
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className="relative group overflow-hidden rounded-2xl shadow-lg"
                    >
                        <img
                            src={img}
                            alt={`Graduate group ${idx + 1}`}
                            className="w-full h-60 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-white text-lg font-semibold">
                                Graduate Group {idx + 1}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CollegeGallery;