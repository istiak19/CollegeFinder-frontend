import { Link } from "react-router";
import { useState } from "react";
import useAuth from "../../hook/useAuth";
import { toast } from "react-toastify";

interface NavbarProps {
    onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const { user, signOutUser } = useAuth();
    const [showName, setShowName] = useState(false);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(query.trim());
    };

    const handleLogOut = () => {
        signOutUser()
            .then(() => {
                toast.success("Successfully logged out!");
            })
            .catch(() => {
                toast.error("Failed to logout. Please try again.");
            });
    };

    return (
        <nav className="bg-white shadow sticky top-0 z-50">
            <div className="w-11/12 mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">

                {/* Left Side: Logo + Nav Links */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-6 gap-2 w-full md:w-auto">
                    <Link to="/" className="text-2xl font-bold text-blue-600 whitespace-nowrap">
                        🎓 CollegeFinder
                    </Link>
                    <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-4 text-sm font-medium text-gray-700">
                        <Link to="/" className="hover:text-blue-500 whitespace-nowrap">Home</Link>
                        <Link to="/colleges" className="hover:text-blue-500 whitespace-nowrap">Colleges</Link>
                        <Link to="/admission" className="hover:text-blue-500 whitespace-nowrap">Admission</Link>
                        <Link to="/my-college" className="hover:text-blue-500 whitespace-nowrap">My College</Link>
                    </div>
                </div>

                {/* Right Side: Search + Login/Profile */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto">
                    <form onSubmit={handleSearch} className="flex w-full md:w-auto">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search colleges..."
                            className="border border-gray-300 px-3 py-1 rounded-md w-full md:w-60"
                        />
                        <button
                            type="submit"
                            className="ml-2 cursor-pointer bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700"
                        >
                            Search
                        </button>
                    </form>

                    {user ? (
                        <div className="flex items-center gap-4">
                            {/* Profile picture container */}
                            <div
                                className="relative"
                                onMouseEnter={() => setShowName(true)}
                                onMouseLeave={() => setShowName(false)}
                            >
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName || "User Avatar"}
                                        className="w-10 h-10 rounded-full object-cover cursor-pointer border border-gray-300"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white cursor-pointer border border-gray-300 select-none">
                                        {user.displayName
                                            ? user.displayName.charAt(0).toUpperCase()
                                            : user.email?.charAt(0).toUpperCase() || "U"}
                                    </div>
                                )}

                                {showName && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max bg-gray-900 text-white text-xs rounded py-1 px-3 whitespace-nowrap z-50 shadow-lg">
                                        {user.displayName || user.email}
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleLogOut}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md whitespace-nowrap"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="text-white bg-gray-800 hover:bg-gray-900 px-4 py-1.5 rounded-md text-center whitespace-nowrap"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;