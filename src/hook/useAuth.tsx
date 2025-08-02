import { useContext } from "react";
import type { AuthContextType } from "../types/auth";
import AuthContext from "../context/auth-context";

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;