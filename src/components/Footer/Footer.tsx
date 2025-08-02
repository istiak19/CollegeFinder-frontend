import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

                    {/* About Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2">About Us</h3>
                        <p className="text-sm text-gray-400">
                            We are a platform dedicated to helping students find the right colleges for their academic journey.
                        </p>
                    </div>

                    {/* Links Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
                        <ul className="text-sm text-gray-400">
                            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
                            <li><Link to="/colleges" className="hover:text-blue-400">Colleges</Link></li>
                            <li><Link to="/admission" className="hover:text-blue-400">Admission</Link></li>
                            <li><Link to="/my-college" className="hover:text-blue-400">My College</Link></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
                        <ul className="text-sm text-gray-400">
                            <li>Email: support@collegefinder.com</li>
                            <li>Phone: +1 234 567 890</li>
                            <li>Address: 123 College St, Education City</li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom Section */}
                <div className="mt-8 border-t border-gray-600 pt-4 text-center text-sm text-gray-400">
                    <p>&copy; 2025 CollegeFinder. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;