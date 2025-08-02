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