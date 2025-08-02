import type { User, UserCredential } from "firebase/auth";

export interface UpdateProfileRequest {
    displayName?: string | null;
    photoURL?: string | null;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    signup: (email: string, password: string) => Promise<UserCredential>;
    signin: (email: string, password: string) => Promise<UserCredential>;
    googleSign: () => Promise<UserCredential>;
    updateProfileUser: (update: UpdateProfileRequest) => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    signOutUser: () => Promise<void>;
    toggleTheme: () => void;
    isDarkMode: boolean;
}
