import { Link } from 'react-router';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
            <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-6">
                Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
                Go to Homepage
            </Link>
        </div>
    );
};

export default NotFound;