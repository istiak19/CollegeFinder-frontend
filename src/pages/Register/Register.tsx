/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../hook/useAuth";
import Social from "../../components/Social/Social";

type Inputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    photo: FileList;
};

const image_key = import.meta.env.VITE_IMAGE;
const image_api = `https://api.imgbb.com/1/upload?key=${image_key}`;

const Register = () => {
    const { signup, updateProfileUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, reset, watch } = useForm<Inputs>();
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("image", data.photo[0]);

            const imageUploadRes = await axios.post(image_api, formData);
            const imageUrl = imageUploadRes.data.data.url;

            await signup(data.email, data.password);
            await updateProfileUser({
                displayName: data.name,
                photoURL: imageUrl,
            });

            const userData = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password,
                photo: imageUrl,
            };
            const res = await axios.post("http://localhost:5000/api/v1/user", userData);

            if (res.data.success) {
                toast.success("Registration successful!");
                reset();
                navigate("/");
            } else {
                toast.error("Something went wrong saving user data.");
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Registration failed.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-2xl border border-blue-300 mx-auto px-8 my-16 py-10 bg-white shadow-lg rounded-2xl"
        >
            <h2 className="text-3xl font-bold text-center text-blue-600  mb-8">
                Create an Account
            </h2>

            <div className="space-y-5">
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Full Name</label>
                    <input
                        {...register("name")}
                        placeholder="John Doe"
                        required
                        className="w-full px-4 py-2 border rounded-lg   border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700 ">Email</label>
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="email@example.com"
                        required
                        className="w-full px-4 py-2 border rounded-lg   border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 ">Password</label>
                        <input
                            {...register("password")}
                            type="password"
                            placeholder="••••••••"
                            required
                            className="w-full px-4 py-2 border rounded-lg   border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 ">Confirm Password</label>
                        <input
                            {...register("confirmPassword")}
                            type="password"
                            placeholder="••••••••"
                            required
                            className="w-full px-4 py-2 border rounded-lg   border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700 ">Phone Number</label>
                    <input
                        {...register("phone")}
                        placeholder="+8801XXXXXXXXX"
                        required
                        className="w-full px-4 py-2 border rounded-lg   border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700 ">Profile Photo</label>
                    <input
                        {...register("photo")}
                        type="file"
                        accept="image/*"
                        required
                        className="w-full px-4 py-2 border rounded-lg   border-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-500 file:text-white file:rounded-lg file:cursor-pointer hover:file:bg-blue-600"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full cursor-pointer mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                >
                    {loading ? "Registering..." : "Register"}
                </button>
                <Social />

                <p className="mt-3 text-center text-sm">
                    Already part of our mission?{" "}
                    <Link to="/login" className="text-blue-400 font-medium hover:underline">
                        Log in and save lives
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default Register;