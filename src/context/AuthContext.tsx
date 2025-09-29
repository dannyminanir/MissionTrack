import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";

type User = {
  id: string;
  fullName: string;
  email: string;
  role: "manager" | "employee" | string;
  companyId?: string;
  department?: string;
  phone?: string;
  token: string;
};

type AuthContextType = {
  user: User | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ token: string; user: User }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(
      "https://missiontrack-backend.onrender.com/api/users/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Invalid email or password");
    }

    const newUser: User = {
      id: data.data.user.id,
      fullName: data.data.user.fullName,
      email: data.data.user.email,
      role: data.data.user.role,
      companyId: data.data.user.companyId,
      department: data.data.user.department,
      phone: data.data.user.phone,
      token: data.data.token,
    };

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return { token: newUser.token, user: newUser };
  };

  const logout = async () => {
    if (user?.token) {
      try {
        await fetch(
          "https://missiontrack-backend.onrender.com/api/users/logout",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${user.token}`,
              Accept: "application/json",
            },
          }
        );
      } catch (err) {
        console.warn("Logout request failed:", err);
      }
    }

    // Clear local state + storage regardless
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
