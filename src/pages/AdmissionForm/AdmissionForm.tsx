import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
        .any()
        .refine((file) => file?.length === 1, { message: "Image is required" }),
});

type AdmissionFormData = z.infer<typeof admissionSchema>;

const AdmissionForm = () => {
    const { id } = useParams<{ id: string }>();

    const [collegeName, setCollegeName] = useState<string>("");
    const [submitted, setSubmitted] = useState<AdmissionFormData | null>(null);
    const [imageURL, setImageURL] = useState<string | null>(null);

    useEffect(() => {
        const colleges = [
            { id: "1", name: "University of Dhaka" },
            { id: "2", name: "Bangladesh University of Engineering and Technology (BUET)" },
            { id: "3", name: "North South University (NSU)" },
            { id: "4", name: "BRAC University" },
            { id: "5", name: "Jahangirnagar University" },
            { id: "6", name: "Rajshahi University" }
        ];

        const selectedCollege = colleges.find(college => college.id === id);
        if (selectedCollege) setCollegeName(selectedCollege.name);
    }, [id]);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<AdmissionFormData>({
        resolver: zodResolver(admissionSchema),
    });

    const onSubmit = (data: AdmissionFormData) => {
        const file = data.image[0];
        console.log("Admission Data:", {
            ...data,
            image: {
                name: file.name,
                type: file.type,
                size: `${(file.size / 1024).toFixed(2)} KB`,
            },
        });

        setImageURL(URL.createObjectURL(file));
        setSubmitted(data);
        reset();
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-3xl p-8 bg-white shadow-2xl rounded-xl">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
                    Admission Form for {collegeName}
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
                        <input type="email" {...register("email")} className="input" />
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
                    </div>

                    <div className="md:col-span-2 mt-2">
                        <button type="submit" className="w-full py-3 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition">
                            Submit Admission
                        </button>
                    </div>
                </form>

                {submitted && (
                    <div className="mt-8 bg-gray-100 p-4 rounded-md shadow-inner">
                        <h3 className="text-lg font-semibold mb-3 text-gray-700">Submitted Data</h3>
                        <ul className="text-sm space-y-1 leading-relaxed">
                            <li><strong>Name:</strong> {submitted.candidateName}</li>
                            <li><strong>Subject:</strong> {submitted.subject}</li>
                            <li><strong>Email:</strong> {submitted.email}</li>
                            <li><strong>Phone:</strong> {submitted.phone}</li>
                            <li><strong>Address:</strong> {submitted.address}</li>
                            <li><strong>DOB:</strong> {submitted.dob}</li>
                            <li><strong>Image:</strong> {submitted.image[0]?.name}</li>
                        </ul>
                        {imageURL && (
                            <div className="mt-4">
                                <p className="font-medium">Preview Image:</p>
                                <img src={imageURL} alt="Preview" className="mt-1 w-40 rounded border" />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default AdmissionForm;