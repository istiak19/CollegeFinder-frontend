import { FaGoogle } from "react-icons/fa6";
import { useNavigate } from "react-router";
import useAuth from "../../hook/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import type { UserCredential } from "firebase/auth";

interface IUserInfo {
    email: string | null;
    name: string | null;
    photo: string | null;
}

const Social = () => {
    const { googleSign } = useAuth();
    const navigate = useNavigate();

    const handleGoogle = async () => {
        try {
            const result: UserCredential = await googleSign();
            const user = result.user;

            const userInfo: IUserInfo = {
                email: user.email,
                name: user.displayName,
                photo: user.photoURL,
            };

            const res = await axios.post("http://localhost:5000/user", userInfo);

            if (res.data?.insertedId || res.data?.acknowledged) {
                toast.success("Registration successful");
            }

            navigate("/");
        } catch (error: unknown) {
            const err = error as { message: string };
            console.error("Google Sign-In Error:", err.message);
            toast.error("Failed to sign in with Google");
        }
    };

    return (
        <div className="flex justify-center items-center">
            <button
                onClick={handleGoogle}
                className="btn border-none py-2 cursor-pointer bg-gradient-to-r from-blue-400 to-blue-600 rounded-full px-10 font-semibold shadow-md hover:from-blue-400 hover:to-blue-500 text-white flex items-center gap-2"
            >
                <FaGoogle />
                Continue with Google
            </button>
        </div>
    );
};

export default Social;