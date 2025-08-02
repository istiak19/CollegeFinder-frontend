import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router"; 
import { motion } from "framer-motion";
import useAuth from "../../hook/useAuth";
import Social from "../../components/Social/Social";

interface LoginFormInputs {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const { signin } = useAuth();
    const navigate = useNavigate();

    const { register, handleSubmit, reset } = useForm<LoginFormInputs>();

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        signin(data.email, data.password)
            .then(() => {
                navigate("/");
                reset();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center bg-white"
        >
            <div className="flex flex-col md:flex-row items-center justify-center gap-5 p-5 md:p-10">
                <div className="w-full p-8 rounded-2xl shadow-lg bg-white text-black border border-blue-300">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-blue-700 text-transparent bg-clip-text">
                        Welcome Back!
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium">Email</label>
                            <input
                                type="email"
                                {...register("email")}
                                required
                                className="w-full px-4 py-3 rounded-lg border bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium">Password</label>
                            <input
                                type="password"
                                {...register("password")}
                                required
                                className="w-full px-4 py-3 rounded-lg border bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="flex justify-end text-sm">
                            <Link to="/forgot-password" className="text-blue-300 hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="w-full cursor-pointer py-3 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-600 hover:to-blue-400 text-white font-bold rounded-lg shadow-md transition-transform"
                        >
                            Login
                        </button>
                    </form>

                    <div className="my-3 flex items-center">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <span className="mx-4 text-gray-400">OR</span>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>

                    <Social />

                    <p className="mt-3 text-center text-sm">
                        Don&apos;t have an account yet?{" "}
                        <Link to="/register" className="text-blue-400 font-medium hover:underline">
                            Sign up now
                        </Link>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default Login;