import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ICollege } from '../../types/interface';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAuth from '../../hook/useAuth';

const admissionSchema = z.object({
    candidateName: z.string().min(2, "Name is required"),
    subject: z.string().min(2, "Subject is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(10, "Phone number too short"),
    address: z.string().min(5, "Address is required"),
    dob: z.string().refine((date) => new Date(date) < new Date(), {
        message: "DOB must be in the past",
    }),
    image: z
        .custom<FileList>((val) => val instanceof FileList && val.length === 1, {
            message: "Image is required",
        }),
});

type AdmissionFormData = z.infer<typeof admissionSchema>;

const image_key = import.meta.env.VITE_IMAGE;
const image_api = `https://api.imgbb.com/1/upload?key=${image_key}`;

const AdmissionForm = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [college, setCollege] = useState<ICollege | null>(null);
    const { user } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<AdmissionFormData>({
        resolver: zodResolver(admissionSchema),
    });

    useEffect(() => {
        if (!id) return;

        fetch(`https://college-finder-alpha.vercel.app/api/v1/colleges/${id}`)
            .then((res) => res.json())
            .then((data) => setCollege(data?.data))
            .catch((err) => console.error("Failed to fetch college data", err));
    }, [id]);
    useEffect(() => {
        if (user?.email) {
            setValue("email", user.email);
        }
    }, [user, setValue]);

    const onSubmit = async (data: AdmissionFormData) => {
        const file = data.image[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await axios.post(image_api, formData);
            const uploadedImageUrl = res.data.data.url;

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { image, ...rest } = data;
            const submissionData = {
                ...rest,
                image: uploadedImageUrl,
                college: college?._id,
            };

            const response = await axios.post("https://college-finder-alpha.vercel.app/api/v1/admission", submissionData);
            if (response.data.success) {
                toast.success("Admission submitted successfully!");
                reset();
                navigate("/my-college");
            } else {
                toast.error("Something went wrong saving user data.");
            }
        } catch (error) {
            console.error("❌ Submission failed:", error);
            toast.error("Image upload or submission failed.");
        }
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-3xl p-8 bg-white shadow-2xl rounded-xl">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
                    Admission Form for {college?.name || "Loading..."}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-medium mb-1">Candidate Name</label>
                        <input {...register("candidateName")} className="input" />
                        {errors.candidateName && <p className="error">{errors.candidateName.message}</p>}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Subject</label>
                        <input {...register("subject")} className="input" />
                        {errors.subject && <p className="error">{errors.subject.message}</p>}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Email</label>
                        <input
                            type="email"
                            {...register("email")}
                            value={user?.email || ""}
                            readOnly
                            className="input"
                        />
                        {errors.email && <p className="error">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Phone Number</label>
                        <input type="tel" {...register("phone")} className="input" />
                        {errors.phone && <p className="error">{errors.phone.message}</p>}
                    </div>

                    <div className="md:col-span-2">
                        <label className="block font-medium mb-1">Address</label>
                        <textarea {...register("address")} className="input" rows={2} />
                        {errors.address && <p className="error">{errors.address.message}</p>}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Date of Birth</label>
                        <input type="date" {...register("dob")} className="input" />
                        {errors.dob && <p className="error">{errors.dob.message}</p>}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Image Upload</label>
                        <input type="file" accept="image/*" {...register("image")} className="input" />
                        {errors.image && <p className="error">{errors.image.message}</p>}
                    </div>

                    <div className="md:col-span-2 mt-2">
                        <button type="submit" className="w-full py-3 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition cursor-pointer">
                            Submit Admission
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AdmissionForm;