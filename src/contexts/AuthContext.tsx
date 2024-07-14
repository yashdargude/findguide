import { createContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  token?: string;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  token: "",
});

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("auth-token")
  );
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("auth-token") || null;
      if (newToken) {
        setToken(newToken);
        setIsAuthenticated(!!newToken);
      }
    };

    
    window.addEventListener("storage", handleStorageChange);

    // Cleanup function to prevent memory leaks
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider, AuthContext };
