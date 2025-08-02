/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hook/useAuth";
import axios from "axios";
import type { IExtendedUser, IUserResponse } from "../../types/interface";

const Profile = () => {
    const { user: authUser } = useAuth() as { user: IExtendedUser | null };
    const [userData, setUserData] = useState<IExtendedUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<IExtendedUser | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authUser) {
            navigate("/profile");
            return;
        }

        const fetchUserData = async () => {
            try {
                const res = await axios.get<IUserResponse>(
                    `http://localhost:5000/api/v1/user/${authUser.email}`
                );
                setUserData(res.data?.data);
                setFormData(res.data?.data);
            } catch (err: any) {
                // Handle error here if needed
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [authUser, navigate]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData(userData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (formData) {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSave = async () => {
        if (!formData || !authUser) return;

        try {
            const res = await axios.put<IUserResponse>(
                `http://localhost:5000/api/v1/user/${authUser.email}`,
                formData
            );
            setUserData(res.data?.data);
            setIsEditing(false);
        } catch (err) {
            console.error("Failed to save user data", err);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading profile...</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <div className="flex flex-col items-center text-center">
                <img
                    src={userData?.photo || authUser?.photoURL || ""}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                />
                <h2 className="text-2xl font-bold mt-4">
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={formData?.name || ""}
                            onChange={handleChange}
                            className="border-b-2 w-full text-center p-2"
                        />
                    ) : (
                        userData?.name || authUser?.displayName
                    )}
                </h2>

                <p className="text-gray-600">
                    {isEditing ? (
                        <input
                            type="email"
                            name="email"
                            value={formData?.email || ""}
                            onChange={handleChange}
                            className="border-b-2 w-full text-center p-2"
                        />
                    ) : (
                        userData?.email || authUser?.email
                    )}
                </p>

                {isEditing ? (
                    <>
                        <input
                            type="text"
                            name="university"
                            value={formData?.university || ""}
                            onChange={handleChange}
                            placeholder="University"
                            className="border-b-2 mt-2 p-2 w-full"
                        />
                        <input
                            type="text"
                            name="address"
                            value={formData?.address || ""}
                            onChange={handleChange}
                            placeholder="Address"
                            className="border-b-2 mt-2 p-2 w-full"
                        />
                        <input
                            type="text"
                            name="phone"
                            value={formData?.phone || ""}
                            onChange={handleChange}
                            placeholder="Phone"
                            className="border-b-2 mt-2 p-2 w-full"
                        />
                    </>
                ) : (
                    <>
                        <p className="mt-1 font-medium">Phone: {userData?.phone || "N/A"}</p>
                        <p className="mt-1 text-sm text-gray-500">Role: {userData?.role || "student"}</p>
                        <p className="mt-1 text-sm text-gray-400">University: {userData?.university || "N/A"}</p>
                        <p className="mt-1 text-sm text-gray-400">Address: {userData?.address || "N/A"}</p>
                        <p className="mt-1 text-sm text-gray-400">
                            Joined:{" "}
                            {userData?.createdAt
                                ? new Date(userData.createdAt).toLocaleDateString()
                                : "N/A"}
                        </p>
                    </>
                )}

                <div className="mt-4 flex space-x-4">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                className="px-4 cursor-pointer py-2 bg-blue-500 text-white rounded"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-4 cursor-pointer py-2 bg-gray-500 text-white rounded"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleEdit}
                            className="px-4 cursor-pointer py-2 bg-green-500 text-white rounded"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;