/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../firebase/firebase.init";

const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success("Password reset email sent. Please check your inbox.");
            navigate("/login"); // Redirect to login page after sending the email
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error: any) {
            toast.error("Failed to send reset email. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Reset Your Password</h2>
            <form onSubmit={handlePasswordReset}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border border-gray-300 p-2 w-full rounded"
                        placeholder="Enter your email"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send Reset Email"}
                </button>
            </form>
        </div>
    );
};

export default PasswordReset;