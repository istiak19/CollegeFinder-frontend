import {
    useEffect,
    useState,
    type ReactNode,
    type FC,
} from "react";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import type { User } from "firebase/auth";
import auth from "../firebase/firebase.init";
import type { AuthContextType } from "../types/auth";
import AuthContext from "../context/auth-context";

interface UpdateProfileRequest {
    displayName?: string | null;
    photoURL?: string | null;
}

interface AuthProviderProps {
    children: ReactNode;
}

const provider = new GoogleAuthProvider();

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        return localStorage.getItem("theme") === "dark";
    });

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("theme", newMode ? "dark" : "light");
            return newMode;
        });
    };

    const signup = (email: string, password: string) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const googleSign = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };

    const signin = (email: string, password: string) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const updateProfileUser = (update: UpdateProfileRequest) => {
        if (!auth.currentUser) {
            return Promise.reject(new Error("No current user"));
        }
        return updateProfile(auth.currentUser, update);
    };

    const resetPassword = (email: string) => {
        return sendPasswordResetEmail(auth, email);
    };

    const signOutUser = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo: AuthContextType = {
        user,
        loading,
        signup,
        signin,
        googleSign,
        updateProfileUser,
        resetPassword,
        signOutUser,
        toggleTheme,
        isDarkMode,
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;