import { createContext, useState, type FC, type ReactNode } from "react";

// ✅ 1. Define and export the context type
export interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

// ✅ 2. Create context with a default value
export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {}, // placeholder
});

// ✅ 3. Define props for provider
interface ThemeProviderProps {
  children: ReactNode;
}

// ✅ 4. ThemeProvider component
export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
