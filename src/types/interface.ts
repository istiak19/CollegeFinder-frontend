import type { User as FirebaseUser } from "firebase/auth";

export interface IExtendedUser extends Partial<FirebaseUser> {
    name?: string;
    photo?: string;
    phone?: string;
    src: string;
    address?: string;
    university?: string;
    role?: "student" | "admin";
    createdAt?: string;
};

export interface IUserResponse {
    success: boolean;
    message: string;
    data: IExtendedUser;
};

export interface ICollege {
    id: string;
    _id?: string;
    name: string;
    image: string;
    rating: number;
    admissionDate: string;
    researchCount: number;
    events: string[];
    sports: string[];
    description: string;
};

export interface IReview {
    rating: number;
    comment: string;
    reviewedAt: string;
}

export interface IColleges {
    _id: string;
    name: string;
}

export interface IAdmission {
    _id: string;
    candidateName: string;
    subject: string;
    email: string;
    phone: string;
    address: string;
    dob: string;
    image: string;
    college: IColleges;
    createdAt: string;
    updatedAt: string;
    reviews?: IReview[];
}